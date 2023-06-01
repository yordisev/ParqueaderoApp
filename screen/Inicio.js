import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { listarsalidacarros, RegistroSalida } from '../api'

const Inicio = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [cargar, Cargando] = useState(false);
  const [filtrardatos, setfiltrardatos] = useState([]);

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
                    <TouchableOpacity onPress={() => alerta(item, 'P')}>
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
            {/* <Button title="navegar" onPress={() => navigation.navigate('Detalle', { idbuscar: 1 })}/>
      <Button title="Atras" onPress={() => navigation.goBack()}/>
      <Button title="Abrir Menu" onPress={() => navigation.openDrawer()}/> */}
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
});
export default Inicio