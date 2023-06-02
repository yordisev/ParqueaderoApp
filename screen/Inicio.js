import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView,Button, SafeAreaView, TouchableOpacity, Alert,Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { listarsalidacarros, RegistroSalida,RealizarCalculo } from '../api'

const Inicio = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [cargar, Cargando] = useState(false);
  const [filtrardatos, setfiltrardatos] = useState([]);
  const [datospagar, setdatospagar] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Cargarlista()
  }, [isFocused])
  const Cargarlista = async () => {
    Cargando(true);
    const datosoptenidos = await listarsalidacarros()
    setfiltrardatos(datosoptenidos)
    Cargando(false);
  }
  const alerta = (datos, accion) => {
    Alert.alert(
      '',
      'Desea darle Salida',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => Salida(datos, accion) },
      ],
      { cancelable: false }
    )
  }
  const vermodal = (codigo) =>{
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
  const Salida = async (datos, accion) => {
    try {
      const salidavehiculos = await RegistroSalida(datos, accion)
      const respuesta = JSON.parse(salidavehiculos[0].salida);
      if (respuesta.CODIGO == 0) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: respuesta.MENSAJE,
          button: 'close',
        })
        setTimeout(() => {
          Cargarlista()
        }, 1000);
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: respuesta.MENSAJE,
          button: 'close',
        })
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
              <LinearGradient
                colors={['#3393FF', '#fff']}
                style={[styles.example, { borderRadius: 20 }]}
              >
                <FontAwesome5 style={[styles.centeredIcono]} name="motorcycle" size={30} color="#fff" />
                <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                  Total Motos
                </Animatable.Text>
              </LinearGradient>
              <LinearGradient
                colors={['#3393FF', '#fff']}
                style={[styles.example, { borderRadius: 20 }]}
              >
                <FontAwesome5 style={[styles.centeredIcono]} name="motorcycle" size={30} color="#fff" />
                <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                  Disponibles
                </Animatable.Text>
              </LinearGradient>
              <LinearGradient
                colors={['#3393FF', '#fff']}
                style={[styles.example, { borderRadius: 20 }]}
              >
                <FontAwesome5 style={[styles.centeredIcono]} name="car" size={30} color="#fff" />
                <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                  Total Carros
                </Animatable.Text>
              </LinearGradient>
              <LinearGradient
                colors={['#3393FF', '#fff']}
                style={[styles.example, { borderRadius: 20 }]}
              >
                <FontAwesome5 style={[styles.centeredIcono]} name="car" size={30} color="#fff" />
                <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
                  Disponibles
                </Animatable.Text>
              </LinearGradient>
            </Animatable.View>
            <View style={{ padding: 30 }}>
              {filtrardatos.map(item => (
                <View style={[styles.contenido]} key={item.id_en_sa}>
                  <View>
                    <Text style={styles.clasetitulo}>{item.nombre}</Text>
                    <Text style={styles.clasetitulo}>{item.placa_vehiculo}</Text>
                  </View>
                  <View style={{ alignItems:'center' }}>
                    <Text style={styles.clasetitulo}>{item.fecha}</Text>
                    <Text style={styles.clasetitulo}>{item.hora}</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <TouchableOpacity onPress={() => alerta(item, 'S')} style={{ paddingRight: 5, }}>
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
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => vermodal(item.id_en_sa)}>
                      <LinearGradient
                        colors={['#3393FF', '#fff']}
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
                </View>
              ))}
            </View>
            <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
          <View style={styles.containermodal}>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="user-alt" size={20}/>
          </View>
          <Text style={styles.text}>{datospagar.Nombre}</Text>
      </View>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="car-alt" size={20}/>
          </View>
          <Text style={styles.text}>{datospagar.Placa}</Text>
      </View>
                    <LinearGradient colors={['#83baf2', '#ffffff']} style={[styles.box, {
          width: '60%',
          height: 110,
          margin:10,
          marginLeft:85,
        }]}>
        <Text style={styles.textlogo}>
        Pagar : $ {datospagar.Pagar}
            </Text>
        </LinearGradient>
        <TouchableOpacity onPress={() => Salida()} style={{ paddingRight: 5, }}>
          <LinearGradient colors={['#83baf2', '#ffffff']} style={[styles.box, {
          width: '60%',
          height: 110,
          margin:10,
          marginLeft:85,
        }]}>
        <FontAwesome5 name="dollar-sign" size={50} color="white" />
        <Text style={styles.textlogo}>
              Realizar Pago
            </Text>
        </LinearGradient>
        </TouchableOpacity>
            <Button title="Cancelar" onPress={() => setModalVisible(false)}/>
          </View>
      </Modal>
          </ScrollView>
        </SafeAreaView>
      </AlertNotificationRoot>
    ))
}
const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#3393FF',
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
  },
  iconContainer:{
    backgroundColor: '#83baf2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 50,
    height: 50,
  },
  containerotro:{
    flexDirection: 'row',
    backgroundColor: '#949c92',
    fontWeight: '700',
    marginBottom: 23,
    marginHorizontal: 28,
    alignItems: 'center',
    elevation: 20,
    borderRadius: 15,
  },
  text:{
    marginLeft: 10,
    paddingRight: 20,
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
},
textlogo: {
  color: '#ffffff',
  fontSize:25,
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