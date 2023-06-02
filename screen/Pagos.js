import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Button, Modal, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { buscarporplaca,buscarpagosrealizados } from '../api'

const Pagos = () => {
    const [datosbuscar, EnviarparaBuscar] =  useState({
        placabuscar:'',
      })
      const datosenviar = (name, value) => EnviarparaBuscar({...datosbuscar,[name]:value});
    
      const [filtrardatos, setfiltrardatos] = useState([]);
      const [datosdelmodal, setdatosmodal] = useState([]);
      const [datospagados, setdatospagados] = useState([]);
      const [cargar, Cargando] = useState(false);
      const [verdatos, setverdatos] = useState(false);
      const [getSelectionMode, setSelectionMode] = useState(1);
      const [gamesTab, setGamesTab] = useState(1);
      const [modalVisible, setModalVisible] = useState(false);
      const [resultado, setResultado] = useState(0);

    const updateSwitchData = value => {
        setSelectionMode(value);
        setGamesTab(value);
    };
    const Buscar = async () => {
        if(datosbuscar.placabuscar == '' || datosbuscar.placabuscar == undefined || datosbuscar.placabuscar == null){
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Entendido',
            textBody: 'Por favor escriba un nombre o placa valido',
            button: 'close',
        })
    } else{
            Cargando(true);
       try {
         const listadoPendiente = await buscarporplaca(datosbuscar)
         setfiltrardatos(listadoPendiente)
         setdatosmodal(listadoPendiente[0]);
         const listadoPagados = await buscarpagosrealizados(datosbuscar)
         setdatospagados(listadoPagados)
         Cargando(false);
         setverdatos(true);
       } catch (error) {
        console.error(error)
        Cargando(false);
       }
      }
      }
      const vermodal = () =>{
        setModalVisible(true);
      };
      const totalapagar = (campo, valor) => {
        const multiplicado = parseFloat(valor) * datosdelmodal.monto_a_cancelar;
        setResultado(multiplicado.toString());
      };
    return (
        cargar ? (
            <View style={[styles.cargandodatos, styles.containercargando]}>
                <ActivityIndicator size="large" color="3ED5F3" />
            </View>
        ) : (
            <AlertNotificationRoot>
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ padding: 20 }}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Placa a Buscar"
                        placeholderTextColor="#BDC3C7"
                        onChangeText={(text) => datosenviar('placabuscar',text)}
                        onSubmitEditing={Buscar}
                    />
                    <TouchableOpacity
                        onPress={Buscar}
                        style={styles.icon}
                    >
                        <Ionicons name='search' size={25} color="black" />
                    </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: 'space-between' }}>
                    </View>
                    {verdatos ? (
                        <>
                        <LinearGradient colors={['#83baf2', '#ffffff']} style={[styles.box, {
                        width: '60%',
                        height: 110,
                        margin:10,
                        marginLeft:85,
                        }]}>
                        <FontAwesome5 name="comment-dollar" size={50} color="white" />
                        <Text style={styles.textlogo}>
                                Total Debe
                            </Text>
                        <Text style={styles.textlogo}>
                                $ 500.000
                            </Text>
                        </LinearGradient>
                    <View
                        style={{
                            height: 44,
                            width: '100%',
                            backgroundColor: '#e4e4e4',
                            borderRadius: 10,
                            borderColor: '#3393FF',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginVertical: 20
                        }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => updateSwitchData(1)}
                            style={{
                                flex: 1,
                                backgroundColor: getSelectionMode == 1 ? '#3393FF' : '#e4e4e4',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    color: getSelectionMode == 1 ? 'white' : '#3393FF',
                                    fontSize: 14,
                                }}>
                                Debe
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => updateSwitchData(2)}
                            style={{
                                flex: 1,
                                backgroundColor: getSelectionMode == 2 ? '#3393FF' : '#e4e4e4',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    color: getSelectionMode == 2 ? 'white' : '#3393FF',
                                    fontSize: 14,
                                }}>
                                Pagado
                            </Text>
                        </TouchableOpacity>
                    </View>
                   
                    {gamesTab == 1 &&  
                <View>
                    <TouchableOpacity style={styles.pagar}
                    onPress={() => {vermodal()}}>
                <LinearGradient colors={['#3393FF', '#fff']} style={styles.pagar}>
                    <Text style={[styles.textSign, {color:'#fff'}]}>Pagar Todo</Text>
                </LinearGradient>
                </TouchableOpacity>
                {filtrardatos.map(item => (
                  <View style={[styles.contenido]} key={item.id_en_sa}>
                    <View>
                      <Text style={styles.clasetitulo}>{item.nombre}</Text>
                      <Text style={styles.clasetitulo}>{item.placa_vehiculo}</Text>
                    </View>
                    <View>
                      <Text style={styles.clasetitulo}>Valor</Text>
                      <Text style={styles.clasetitulo}>$ {item.monto_a_cancelar}</Text>
                    </View>
                    <View style={{ alignItems:'center' }}>
                      <Text style={styles.clasetitulo}>{item.fecha}</Text>
                      <Text style={styles.clasetitulo}>{item.hora}</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
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
                
                }
                    {gamesTab == 2 && 
                     <View>
                 {datospagados.map(item => (
                   <View style={[styles.contenido]} key={item.id_en_sa}>
                     <View>
                       <Text style={styles.clasetitulo}>{item.nombre}</Text>
                       <Text style={styles.clasetitulo}>{item.placa_vehiculo}</Text>
                     </View>
                     <View style={{ alignItems:'center' }}>
                       <Text style={styles.clasetitulo}>{item.fecha}</Text>
                       <Text style={styles.clasetitulo}>{item.hora}</Text>
                     </View>
                   </View>
                 ))}
               </View>
                    }
                    </>
                    ): null}
                    <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
          <View style={styles.containermodal}>
          <View style={{alignItems: "center",paddingBottom: 30}}>
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
              <FontAwesome5 name="user-alt" size={20}/>
          </View>
          <Text style={styles.text}>{datosdelmodal.nombre} {datosdelmodal.apellido}</Text>
      </View>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="car-alt" size={20}/>
          </View>
          <Text style={styles.text}>{datosdelmodal.placa_vehiculo}</Text>
      </View>
          <View style={styles.containerotro}>
                    <TextInput
                        style={styles.input}
                        placeholder="Cantidad de dias a Pagar"
                        placeholderTextColor="#BDC3C7"
                        keyboardType="numeric"
                        onChangeText={(text) => totalapagar('pagaraqui',text)}
                    />
                    <View style={styles.icon}>
                        <FontAwesome5 name='hashtag' size={25} color="black" />
                        </View>
                    </View>
                    <LinearGradient colors={['#83baf2', '#ffffff']} style={[styles.box, {
          width: '60%',
          height: 110,
          margin:10,
          marginLeft:85,
        }]}>
        <Text style={styles.textlogo}>
                Pagar: ${resultado}
            </Text>
        </LinearGradient>
        <TouchableOpacity onPress={() => Entrada()} style={{ paddingRight: 5, }}>
          <LinearGradient colors={['#83baf2', '#ffffff']} style={[styles.box, {
          width: '60%',
          height: 110,
          margin:10,
          marginLeft:85,
        }]}>
        <Ionicons name="save" size={50} color="white" />
        <Text style={styles.textlogo}>
                Pagar
            </Text>
        </LinearGradient>
        </TouchableOpacity>
            <Button title="Cancelar" onPress={() => setModalVisible(false)}/>
          </View>
      </Modal>
                </ScrollView>
            </SafeAreaView>
            </AlertNotificationRoot>
        )
    )
}
const styles = StyleSheet.create({
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
    pagar: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
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
  box: {
    height: 200,
    width: 100,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "#61dafb",
    alignItems: "center",
    justifyContent: "center"
  },
  textlogo: {
    color: '#ffffff',
    fontSize:17,
    fontWeight: 'bold',
  },
  contenido: {
    backgroundColor: '#3393FF',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
});
export default Pagos