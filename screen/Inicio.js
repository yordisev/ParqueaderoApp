import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TextInput, Button, SafeAreaView, TouchableOpacity, Alert, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import AwesomeAlert from 'react-native-awesome-alerts';
import DropdownAlert from 'react-native-dropdownalert';
import { listardisponibles, listarsalidacarros, RegistroSalida, RealizarCalculo } from '../api'

const Inicio = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [cargar, Cargando] = useState(false);
  const [totaldisponible, settotaldisponible] = useState([]);
  const [filtrardatos, setfiltrardatos] = useState([]);
  const [datos, setdatos] = useState([]);
  const [datospagar, setdatospagar] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  let dropDownAlertRef = useRef();

  const filtrarcliente = (text) => {
    if (text) {
      const nuevosdatos = datos.filter(item => {
        const datosfiltrados = item.nombre ? item.nombre.toUpperCase() : ''.toUpperCase();
        const datosdeimput = text.toUpperCase();
        return datosfiltrados.indexOf(datosdeimput) > -1;
      })
      setfiltrardatos(nuevosdatos)
    } else {
      setfiltrardatos(datos)
    }
  }
  useEffect(() => {
    Cargarlista()
  }, [isFocused])
  const Cargarlista = async () => {
    // Cargando(true);
    const disponibilidad = await listardisponibles()
    settotaldisponible(disponibilidad)
    const datosoptenidos = await listarsalidacarros()
    setfiltrardatos(datosoptenidos)
    setdatos(datosoptenidos)
    // Cargando(false);
  }
  // const alerta = (datos, accion) => {
  //   Alert.alert(
  //     '',
  //     'Desea darle Salida',
  //     [
  //       { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
  //       { text: 'OK', onPress: () => Salida(datos, accion) },
  //     ],
  //     { cancelable: false }
  //   )
  // }
  const vermodal = (codigo) => {
    setModalVisible(true);
    Calcularpago(codigo);
  };
  const Calcularpago = async (codigo) => {
    try {
      const DatoCalculado = await RealizarCalculo(codigo)
      const respuesta = JSON.parse(DatoCalculado[0].salida);
      setdatospagar(respuesta);
    } catch (error) {
      console.error(error)
    }
  }
  showAlert = () => {
    setConfirmarVisible(true)
  };
  const Salida = async (datos, accion) => {
    try {
      const salidavehiculos = await RegistroSalida(datos, accion)
      const respuesta = JSON.parse(salidavehiculos[0].salida);
      setModalVisible(false);
      setConfirmarVisible(false);
      if (respuesta.CODIGO == 0) {
        dropDownAlertRef.alertWithType('success', 'Exitoso', respuesta.MENSAJE);
        setTimeout(() => {
          Cargarlista()
        }, 1000);
      } else {
        dropDownAlertRef.alertWithType('error', 'Error', respuesta.MENSAJE);
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    cargar ? (
      <View style={[styles.cargandodatos, styles.containercargando]}>
        <ActivityIndicator size="large" color="3ED5F3" />
      </View>
    ) : (
      <AlertNotificationRoot>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Animatable.View animation="fadeInUp" style={styles.containercolumnas}>
              {totaldisponible.map(data => (
                <LinearGradient key={data.tipo_isla}
                  colors={data.tipo_isla === 'M' ? ['#d53369', '#daae51'] : ['#00d2ff', '#3a47d5']}
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                  style={[styles.example, { borderRadius: 20 }]}
                >
                  <FontAwesome5 style={[styles.centeredIcono]} name={data.tipo_isla === 'M' ? 'motorcycle' : 'car'} size={30} color="#fff" />
                  <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                  {data.ocupados} /  {data.cantidad}
                  </Animatable.Text>
                  <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                 Disponibles: {data.cantidad - data.ocupados}
                  </Animatable.Text>
                </LinearGradient>
              ))}
              {/* <LinearGradient
                colors={['#d53369', '#daae51']}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={[styles.example, { borderRadius: 20 }]}
              >
                <FontAwesome5 style={[styles.centeredIcono]} name="motorcycle" size={30} color="#fff" />
                <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                  Disponibles - {totaldisponible[0].cantidad - totaldisponible[0].ocupados}
                </Animatable.Text>
              </LinearGradient>
              <LinearGradient
                colors={['#00d2ff', '#3a47d5']}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={[styles.example, { borderRadius: 20 }]}
              >
                <FontAwesome5 style={[styles.centeredIcono]} name="car" size={30} color="#fff" />
                <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                  Total Carros - {totaldisponible[1].ocupados}
                </Animatable.Text>
              </LinearGradient>
              <LinearGradient
                colors={['#00d2ff', '#3a47d5']}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={[styles.example, { borderRadius: 20 }]}
              >
                <FontAwesome5 style={[styles.centeredIcono]} name="car" size={30} color="#fff" />
                <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                  Disponibles - {totaldisponible[1].cantidad - totaldisponible[1].ocupados}
                </Animatable.Text>
              </LinearGradient> */}
            </Animatable.View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Buscar"
                placeholderTextColor="#BDC3C7"
                onChange={(event) => filtrarcliente(event.nativeEvent.text)}
              />
              <TouchableOpacity
                style={styles.icon}
              >
                <Ionicons name='search' size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 20 }}>
              {filtrardatos.map(item => (
                <Animatable.View animation="fadeInLeft" style={[styles.contenido]} key={item.id_en_sa}>
                  <View>
                    <Text style={styles.clasetitulo}>{item.nombre}</Text>
                    <Text style={styles.clasetitulo}>{item.placa_vehiculo}</Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.clasetitulo}>{item.fecha}</Text>
                    <Text style={styles.clasetitulo}>{item.hora}</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    {/* <TouchableOpacity onPress={() => alerta(item, 'S')} style={{ paddingRight: 5, }}>
                      <LinearGradient
                        colors={['#FF4C33', '#fff']}
                        style={{
                          backgroundColor: '#0aada8',
                          padding: 10,
                          width: 50,
                          borderRadius: 10,
                        }}
                      >
                        <FontAwesome5 style={[styles.centeredIcono]} name="door-open" size={15} color="#fff" />
                      </LinearGradient>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => vermodal(item.id_en_sa)}>
                      <LinearGradient
                        colors={['#FF4C33', '#fff']}
                        style={{
                          backgroundColor: '#0aada8',
                          padding: 10,
                          width: 50,
                          borderRadius: 10,
                        }}
                      >
                        <FontAwesome5 style={[styles.centeredIcono]} name="dollar-sign" size={15} color="#fff" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </Animatable.View>
              ))}
            </View>
            <Modal
              animationType='slide'
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.containermodal}>
                <View style={{ alignItems: "center", paddingBottom: 30 }}>
                  <Text style={{
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: 'bold',
                    textTransform: 'uppercase', justifyContent: 'center',
                  }}>
                    Datos del Cliente
                  </Text>
                </View>
                <View style={styles.containerotro}>
                  <View style={styles.iconContainer}>
                    <FontAwesome5 name="user-alt" size={20} />
                  </View>
                  <Text style={styles.text}>{datospagar.Nombre}</Text>
                </View>
                <View style={styles.containerotro}>
                  <View style={styles.iconContainer}>
                    <FontAwesome5 name="car-alt" size={20} />
                  </View>
                  <Text style={styles.text}>{datospagar.Placa}</Text>
                </View>
                <Animatable.View animation="fadeInUp" style={styles.containercolumnas}>
                  <LinearGradient
                    colors={['#3393FF', '#00d4ff']}
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    style={[styles.example, { borderRadius: 20 }]}
                  >
                    <MaterialCommunityIcons style={[styles.centeredIcono]} name="login" size={30} color="#fff" />
                    <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                      Hora Ingreso
                    </Animatable.Text>
                    <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                      {datospagar.Hora_entrada}
                    </Animatable.Text>
                  </LinearGradient>
                  <LinearGradient
                    colors={['#d53369', '#daae51']}
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    style={[styles.example, { borderRadius: 20 }]}
                  >
                    <MaterialCommunityIcons style={[styles.centeredIcono]} name="logout" size={30} color="#fff" />
                    <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                      Hora Salida
                    </Animatable.Text>
                    <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                      {datospagar.Hora_salida}
                    </Animatable.Text>
                  </LinearGradient>
                  <LinearGradient
                    // colors={['#b29f94', '#603813']}
                    // colors={['#2193b0', '#6dd5ed']}
                    colors={['#1488CC', '#6FB1FC']}
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    style={[styles.box, {
                      width: '60%',
                      height: 110,
                      margin: 10,
                    }]}>
                    <Text style={styles.textlogo}>
                      Pagar : $ {datospagar.Pagar}
                    </Text>
                  </LinearGradient>
                </Animatable.View>
                <Animatable.View animation="fadeInUp">

                  <TouchableOpacity onPress={() => showAlert()} style={{ paddingRight: 5 }}>
                    <LinearGradient
                      colors={['#FF9800', '#F44336']}
                      start={[0, 0.5]}
                      end={[1, 0.5]}
                      style={styles.button}
                    >
                      <Ionicons name="send" size={24} color="white" />
                      <Text style={styles.buttonText}>Realizar Pago</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animatable.View>
                <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              </View>
            </Modal>
            <AwesomeAlert
              show={confirmarVisible}
              showProgress={false}
              progressSize="large"
              progressColor="blue"
              title="Confirmar"
              message="Desea Registrar pago"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="No, cancelar"
              cancelButtonColor="#F42A2A"
              confirmText="Si, Registrar"
              confirmButtonColor="#2A4CF4"
              onCancelPressed={() => setConfirmarVisible(false)}
              onConfirmPressed={() => Salida(datospagar, 'P')}
            />
            <DropdownAlert ref={(ref) => {
              if (ref) {
                dropDownAlertRef = ref;
              }
            }} />
          </ScrollView>
        </SafeAreaView>
      </AlertNotificationRoot>
    ))
}
const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    width: '90%',
    margin: 5,
    paddingLeft: 40,
  },
  input: {
    backgroundColor: '#949c92',
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 50,
    color: 'black',
    fontSize: 18,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    margin: 10,
    marginLeft: 95,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  contenido: {
    backgroundColor: '#A0C4F9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containercargando: {
    flex: 1,
    justifyContent: "center"
  },
  cargandodatos: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  containercolumnas: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  example: {
    width: 170,
    height: 120,
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: 'grey',
    // borderWidth: 0.5,
    justifyContent: 'center'
  },
  centeredText: {
    textAlign: 'center',
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  centeredIcono: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  clasetitulo: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16
  },
  containermodal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 30
  },
  iconContainer: {
    backgroundColor: '#83baf2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 50,
    height: 50,
  },
  containerotro: {
    flexDirection: 'row',
    backgroundColor: '#949c92',
    fontWeight: '700',
    marginBottom: 23,
    marginHorizontal: 28,
    alignItems: 'center',
    elevation: 20,
    borderRadius: 15,
  },
  text: {
    marginLeft: 10,
    paddingRight: 20,
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
  textlogo: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  box: {
    height: 200,
    width: 100,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#61dafb",
    alignItems: "center",
    justifyContent: "center"
  },
});
export default Inicio