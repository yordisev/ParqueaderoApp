import React,{useState,useRef,useEffect} from 'react'
import { StyleSheet, Text, View,Button, TextInput, Modal, SafeAreaView, ScrollView,TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';
import DropdownAlert from 'react-native-dropdownalert';
import { useIsFocused } from "@react-navigation/native";
import { ListadoTarifas,ActualizarTarifa } from '../api'

const Tarifas = () => {
  const isFocused = useIsFocused();
  const [filtrardatos, setfiltrardatos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [datosingreso, setdatosingresos] = useState({
    id_tarifa:'',
    precio:'',
  });
  const datosinput = (name, value) => setdatosingresos({...datosingreso,[name]:value});
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  let dropDownAlertRef = useRef();
  useEffect(() => {
    Cargarlista()
  }, [isFocused])
  const Cargarlista = async () => {
    const datosoptenidos = await ListadoTarifas()
    setfiltrardatos(datosoptenidos)
  }
  const vermodal = (datos) =>{
    setdatosingresos({
      id_tarifa:datos.id_tarifa,
      precio:datos.precio,
    })
    setModalVisible(true);
  }
  showAlert = () => {
    setConfirmarVisible(true)
  };
  const EditarTarifa = async () => {
    setModalVisible(false)
    setConfirmarVisible(false);
    try {
      const salidavehiculos = await ActualizarTarifa(datosingreso)
      const respuesta = JSON.parse(salidavehiculos[0].salida);
      Cargarlista()
      if (respuesta.CODIGO == 0) {
        dropDownAlertRef.alertWithType('success', 'Exitoso', respuesta.MENSAJE);
      } else {
        dropDownAlertRef.alertWithType('error', 'Error', respuesta.MENSAJE);
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
          >
<View style={{ padding: 10 }}>
              {filtrardatos.map(item => (
                <Animatable.View animation="fadeInLeft"  style={[styles.contenido,{backgroundColor: '#A0C4F9'}]} key={item.id_tarifa}>
                  <View style={{ paddingRight: 5, }}>
                    <Text style={styles.clasetitulo}>Precio:</Text>
                    <Text style={styles.clasetitulo}>$ {item.precio} </Text>
                  </View>
                  <View style={{ paddingRight: 15,paddingLeft: 9, }}>
                    <Text style={styles.clasetitulo}>Tipo:</Text>
                    <Text style={styles.clasetitulo}>{item.tipo_vehiculo}</Text>
                  </View>
                    <TouchableOpacity onPress={() => vermodal(item)} style={{ paddingRight: 5, }}>
                      <LinearGradient
                        colors={['#FF4C33', '#fff']}
                        style={{
                          backgroundColor: '#0aada8',
                          padding: 10,
                          width: 50,
                          borderRadius: 10,
                        }}
                      >
                        <FontAwesome5 style={[styles.centeredIcono]} name="edit" size={15} color="#fff" />
                      </LinearGradient>
                    </TouchableOpacity>
                </Animatable.View>
              ))}
            </View>
            <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
          <View style={styles.containermodal}>
          <View style={{alignItems: "center",paddingBottom: 30}}>
              <Text style={{
                  color: '#5092FE',
                  fontSize: 25,
                  fontWeight: 'bold',
                  textTransform: 'uppercase', justifyContent: 'center',
                }}>
                  Datos de la Tarifa por Hora
                </Text>
                </View>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="dollar-sign" size={20}/>
          </View>
          <TextInput style={styles.text}
          keyboardType="numeric"
          placeholderTextColor='#BDC3C7'
          onChangeText={(text) => datosinput('precio',text)}
          value={datosingreso.precio}/>
      </View>
      <View style={styles.containercolumnas}>
        <TouchableOpacity onPress={() => showAlert()} style={{ paddingRight: 5 }}>
  <LinearGradient
        colors={['#090979', '#00d4ff']}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={styles.button}
      >
        <Ionicons name="save" size={24} color="white" />
        <Text style={styles.buttonText}>Actualizar</Text>
      </LinearGradient>
</TouchableOpacity>
<TouchableOpacity onPress={()=> setModalVisible(false)} style={{ paddingRight: 5 }}>
  <LinearGradient
        colors={['#FF9800', '#F44336']}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={styles.button}
      >
        <Ionicons name="arrow-back-circle" size={24} color="white" />
        <Text style={styles.buttonText}>Cancelar</Text>
      </LinearGradient>
</TouchableOpacity>
</View>
          </View>
      </Modal>
      <AwesomeAlert
          show={confirmarVisible}
          showProgress={false}
          progressSize="large"
          progressColor="blue"
          title="Si Actualizar"
          message="Desea Actualizar Tarifa"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancelar"
          cancelButtonColor="#F42A2A"
          confirmText="Si, Actualizar"
          confirmButtonColor="#2A4CF4"
          onCancelPressed={() => setConfirmarVisible(false)}
          onConfirmPressed={() => EditarTarifa()}
        />
      <DropdownAlert  ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}/>
          </ScrollView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 129,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  containercolumnas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
  containermodal: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 1,
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60
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
  contenido: {
    // backgroundColor: '#A0C4F9',
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
    marginLeft: 70,
    paddingRight: 20,
    fontSize: 35,
    fontWeight: '700',
    color: 'white',
},
dropdown: {
  width: '85%',
  height: 50,
  borderColor: 'gray',
  borderWidth: 0.5,
  borderRadius: 8,
  paddingHorizontal: 10,
  marginLeft:30,
  marginBottom: 10,
},
placeholderStyle: {
  fontSize: 16,
},
selectedTextStyle: {
  fontSize: 16,
},
iconStyle: {
  width: 20,
  height: 20,
},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
},
dropdown: {
  width: '85%',
  height: 50,
  borderColor: 'gray',
  borderWidth: 0.5,
  borderRadius: 8,
  paddingHorizontal: 10,
  marginLeft:30,
  marginBottom: 10,
},
});

export default Tarifas