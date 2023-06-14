import React,{useState} from 'react'
import { StyleSheet, Text, View,Button, TextInput, Modal, SafeAreaView, ScrollView,TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import { Picker } from "@react-native-picker/picker";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { buscarpornombre,listartodaslastarifas,RegistroEntrada,Registraryguardar } from '../api'

const Registro = () => {
  const navigation = useNavigation()
  const [datosbuscar, Enviarloginacceso] =  useState({
    nombrecliente:'',
  })
  const datosenviar = (name, value) => Enviarloginacceso({...datosbuscar,[name]:value});
  // ---------------------------------------------------registro-------------------------------------
  const [datosdelregistro, setdatosregistro] = useState({
    placa:'',
    tipovehiculo:'',
    precio_pagar:'',
  });
  const datosinput = (name, value) => setdatosregistro({...datosdelregistro,[name]:value});
  const RegistrarClientediarios = async () => {
    if(datosdelregistro.placa == '' || datosdelregistro.placa == null || datosdelregistro.placa == undefined ||
     datosdelregistro.tipovehiculo == '' || datosdelregistro.tipovehiculo == null || datosdelregistro.tipovehiculo == undefined){
      dropDownAlertRef.alertWithType('warn', 'Requeridos', 'Todos Los Datos Son requeridos');
    }else{
    try {
      const registro = await Registraryguardar(datosdelregistro)
      const respuesta = JSON.parse(registro[0].id);
      setverregistro(false)
      if (respuesta.CODIGO == 0) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Entendido',
          textBody: respuesta.MENSAJE,
          button: 'close',
        })
        
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Entendido',
          textBody: respuesta.MENSAJE,
          button: 'close',
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
  }
  // ------------------------------------------------------fin registro --------------------------------
  const [filtrardatos, setfiltrardatos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [datosingreso, setdatosingresos] = useState([]);
  const [valorDatos, setdatosvalor] = useState([]);
  const [valorprecio, setvalor] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [verregistro, setverregistro] = useState(false);
  const Buscar = async () => {
    ListarTarifa()
    if(datosbuscar.nombrecliente == '' || datosbuscar.nombrecliente == undefined || datosbuscar.nombrecliente == null){
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Entendido',
        textBody: 'Por favor escriba un nombre o placa valido',
        button: 'close',
      })
    } else{
   try {
     const listadonegocios = await buscarpornombre(datosbuscar)
     if(listadonegocios.length == 0){
      setverregistro(true)
     }else{
       setverregistro(false)
       setfiltrardatos(listadonegocios)
     }
   } catch (error) {
    console.error(error)
   }
  }
  }
  const vermodal = (datos) =>{
    setdatosingresos(datos);
    setModalVisible(true);
    ListarTarifa()
  }
  const ListarTarifa = async () => {
    const datosoptenidos = await listartodaslastarifas()
    var count = Object.keys(datosoptenidos).length;
    let valores = [];
    for (var i = 0; i < count; i++) {
      valores.push({
        value: datosoptenidos[i].precio,
        label: datosoptenidos[i].precio+' ('+datosoptenidos[i].tipo_vehiculo+')',
      });
    }
    setdatosvalor(valores);
  }
  const Entrada = async () => {
    setModalVisible(false)
    try {
      const salidavehiculos = await RegistroEntrada(datosingreso,valorprecio)
      const respuesta = JSON.parse(salidavehiculos[0].salida);
      if (respuesta.CODIGO == 0) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: respuesta.MENSAJE,
          button: 'close',
        })
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
    <AlertNotificationRoot>
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
          >
            <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Buscar Por Nombre o Placa"
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
{verregistro ? (
  <View style={{ padding: 10,margin:20 }}>
      <View style={styles.containerotro}>
      <View style={styles.iconContainer}>
          <FontAwesome5 name="car-alt" size={20}/>
      </View>
      <TextInput style={{backgroundColor: '#949c92',
    width: '80%',
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    color: 'black',
    fontSize: 18,}}
      placeholder="Placa"  
      placeholderTextColor='#BDC3C7'
      onChangeText={(text) => datosinput('placa',text)}
      value={datosdelregistro.placa}/>
  </View>
  <View style={styles.dropdown1}>
      <Picker selectedValue={datosdelregistro.tipovehiculo} onValueChange={(itemValue) => datosinput('tipovehiculo',itemValue)}>
      <Picker.Item label="Moto" value="M" />
      <Picker.Item label="Carro" value="C" />
          </Picker>
  </View>
  <View style={styles.dropdown1}>
      <Picker selectedValue={datosdelregistro.precio_pagar} onValueChange={(itemValue) => datosinput('precio_pagar',itemValue)}>
                { valorDatos.map((cr, index) => {
                    return <Picker.Item key={index} label={cr.label} value={cr.value} />
                  })
                }
          </Picker>
  </View>
    <TouchableOpacity onPress={() => RegistrarClientediarios()} style={{ paddingRight: 5 }}>
<LinearGradient
    colors={['#090979', '#00d4ff']}
    start={[0, 0.5]}
    end={[1, 0.5]}
    style={styles.button}
  >
    <Ionicons name="save" size={30} color="white" />
    <Text style={styles.buttonText}>Registrar Entrada</Text>
  </LinearGradient>
</TouchableOpacity>
</View>
    ) : (
<View style={{ padding: 10 }}>
              {filtrardatos.map(item => (
                <Animatable.View animation="fadeInLeft"  style={[styles.contenido]} key={item.placa}>
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
                </Animatable.View>
              ))}
            </View>
    )}
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
          <Text style={styles.text}>{datosingreso.celular}</Text>
      </View>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="hashtag" size={20}/>
          </View>
          <Text style={styles.text}>{datosingreso.placa}</Text>
      </View>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="car-alt" size={20}/>
          </View>
          <Text style={styles.text}>{datosingreso.tipo_vehiculo === 'M' ? 'Moto' : 'Carro'}</Text>
      </View>
      <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={valorDatos}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Seleccionar Precio' : '...'}
          searchPlaceholder="Buscar..."
          value={valorprecio}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setvalor(item.value);
            setIsFocus(false);
          }}
        />
        <TouchableOpacity onPress={() => Entrada()} style={{ paddingRight: 5 }}>
  <LinearGradient
        colors={['#090979', '#00d4ff']}
        // colors={['#FF9800', '#F44336']}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={styles.button}
      >
        <Ionicons name="send" size={24} color="white" />
        <Text style={styles.buttonText}>Registrar Entrada</Text>
      </LinearGradient>
</TouchableOpacity>

            <Button title="Cancelar" onPress={() => setModalVisible(false)}/>
          </View>
      </Modal>
          </ScrollView>
        </SafeAreaView>
        </AlertNotificationRoot>
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
    paddingTop: 40,
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
    backgroundColor: '#A0C4F9',
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
dropdown1: {
  // width: '80%',
  height: 50,
  borderColor: 'gray',
  borderWidth: 0.5,
  borderRadius: 8,
  paddingHorizontal: 10,
  marginLeft:5,
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
});

export default Registro