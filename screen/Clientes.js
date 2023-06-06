import React,{useState,useRef} from 'react'
import { StyleSheet, Text, View,Button, TextInput, Modal, SafeAreaView, ScrollView,TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import AwesomeAlert from 'react-native-awesome-alerts';
import DropdownAlert from 'react-native-dropdownalert';
import { ListadoClientes,ActualizarCliente } from '../api'

const Clientes = () => {
  const navigation = useNavigation()
  const [datosbuscar, Enviarloginacceso] =  useState({
    nombrecliente:'',
  })
  const datosenviar = (name, value) => Enviarloginacceso({...datosbuscar,[name]:value});
  const [filtrardatos, setfiltrardatos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [datosingreso, setdatosingresos] = useState({
    id_cliente:'',
    nombre:'',
    placa:'',
    celular:'',
    estado:'',
  });
  const datosinput = (name, value) => setdatosingresos({...datosingreso,[name]:value});
  const [cursos, serCursos] = useState([{valor:'A',dato:'Activo'}, {valor:'I',dato:'Inactivo'}])
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  let dropDownAlertRef = useRef();
  const Buscar = async () => {
    if(datosbuscar.nombrecliente == '' || datosbuscar.nombrecliente == undefined || datosbuscar.nombrecliente == null){
      dropDownAlertRef.alertWithType('warning', 'Entendido', 'Por favor escriba un nombre o placa valido');
    } else{
   try {
     const listadonegocios = await ListadoClientes(datosbuscar)
     setfiltrardatos(listadonegocios)
   } catch (error) {
    console.error(error)
   }
  }
  }
  const vermodal = (datos) =>{
    setdatosingresos({
      id_cliente:datos.id_cliente,
    nombre:datos.nombre+' '+datos.apellido,
    placa:datos.placa,
    celular:datos.celular,
    estado:datos.estado,
    })
    setModalVisible(true);
  }
  showAlert = () => {
    setConfirmarVisible(true)
  };
  const EditarCliente = async () => {
    setModalVisible(false)
    setConfirmarVisible(false);
    try {
      const salidavehiculos = await ActualizarCliente(datosingreso)
      const respuesta = JSON.parse(salidavehiculos[0].salida);
      setfiltrardatos([])
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
            <Text style={{
                                color: 'black',
                                fontSize: 20,
                                fontWeight: 'bold',
                                textTransform: 'uppercase', justifyContent: 'center',
                            }}>
                                Buscar Cliente
                            </Text>
            <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Placa a Buscar"
    placeholderTextColor="#BDC3C7"
    onChangeText={(text) => datosenviar('nombrecliente',text)}
    onSubmitEditing={Buscar}
  />
  <TouchableOpacity
    onPress={Buscar}
    style={styles.icon}
  >
    <Ionicons name='search' size={25} color="black" />
  </TouchableOpacity>
</View>
<View style={{ padding: 10 }}>
              {filtrardatos.map(item => (
                <Animatable.View animation="fadeInLeft"  style={[styles.contenido,{backgroundColor: item.estado === 'A' ? '#A0C4F9' : '#FF5555'}]} key={item.cedula}>
                  <View style={{ paddingRight: 5, }}>
                    <Text style={styles.clasetitulo}>{item.nombre} {item.apellido}</Text>
                    <Text style={styles.clasetitulo}>{item.placa}</Text>
                  </View>
                  <View style={{ paddingRight: 15,paddingLeft: 9, }}>
                    <Text style={styles.clasetitulo}>Celular:</Text>
                    <Text style={styles.clasetitulo}>{item.celular}</Text>
                  </View>
                    <TouchableOpacity onPress={() => vermodal(item)} style={{ paddingRight: 5, }}>
                      <LinearGradient
                        colors={item.estado === 'A' ? ['#FF4C33', '#fff'] : ['#35A6F4', '#fff']}
                        style={{
                          backgroundColor: '#0aada8',
                          padding: 10,
                          width: 50,
                          borderRadius: 10,
                        }}
                      >
                        <FontAwesome5 style={[styles.centeredIcono]} name="user-edit" size={15} color="#fff" />
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
          <Text style={styles.text}>{datosingreso.nombre}</Text>
      </View>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="phone-alt" size={20}/>
          </View>
          <TextInput style={styles.text}  
          placeholderTextColor='#BDC3C7'
          onChangeText={(text) => datosinput('celular',text)}
          value={datosingreso.celular}/>
      </View>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="car-alt" size={20}/>
          </View>
          <Text style={styles.text}>{datosingreso.placa}</Text>
      </View>
          <View style={styles.dropdown}>
          
          <Picker selectedValue={datosingreso.estado} onValueChange={(itemValue) => datosinput('estado',itemValue)}>
                {
                  cursos.map((cr, index) => {
                    return <Picker.Item key={index} label={cr.dato} value={cr.valor} />
                  })
                }
                {/* <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" /> */}
              </Picker>
      </View>
        <TouchableOpacity onPress={() => showAlert()} style={{ paddingRight: 5 }}>
  <LinearGradient
        colors={['#090979', '#00d4ff']}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={styles.button}
      >
        <Ionicons name="send" size={24} color="white" />
        <Text style={styles.buttonText}>Actualizar</Text>
      </LinearGradient>
</TouchableOpacity>

            <Button title="Cancelar" onPress={() => setModalVisible(false)}/>
          </View>
      </Modal>
      <AwesomeAlert
          show={confirmarVisible}
          showProgress={false}
          progressSize="large"
          progressColor="blue"
          title="Si Actualizar"
          message="Desea Actualizar Cliente"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancelar"
          cancelButtonColor="#F42A2A"
          confirmText="Si, Actualizar"
          confirmButtonColor="#2A4CF4"
          onCancelPressed={() => setConfirmarVisible(false)}
          onConfirmPressed={() => EditarCliente()}
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
  inputContainer: {
    position: 'relative',
    width: '90%',
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
    fontSize: 17,
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

export default Clientes