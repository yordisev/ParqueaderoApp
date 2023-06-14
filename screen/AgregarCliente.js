import React,{useState,useRef} from 'react'
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import DropdownAlert from 'react-native-dropdownalert';
import { useNavigation } from "@react-navigation/native";
import { GuardarCliente } from '../api'

const AgregarCliente = () => {
  let dropDownAlertRef = useRef();
  const navigation = useNavigation()
  const [datosingreso, setdatosingresos] = useState({
    nombre:'',
    apellido:'',
    celular:'',
    placa:'',
  });
  const datosinput = (name, value) => setdatosingresos({...datosingreso,[name]:value});
  const RegistrarCliente = async () => {
    if(datosingreso.nombre == '' || datosingreso.nombre == null || datosingreso.nombre == undefined ||
    datosingreso.apellido == '' || datosingreso.apellido == null || datosingreso.apellido == undefined ||
    datosingreso.celular == '' || datosingreso.celular == null || datosingreso.celular == undefined ||
    datosingreso.placa == '' || datosingreso.placa == null || datosingreso.placa == undefined){
      dropDownAlertRef.alertWithType('warn', 'Requeridos', 'Todos Los Datos Son requeridos');
    }else{
    try {
      const registro = await GuardarCliente(datosingreso)
      const respuesta = JSON.parse(registro[0].id);
      if (respuesta.CODIGO == 0) {
        dropDownAlertRef.alertWithType('success', 'Exitoso', respuesta.MENSAJE);
        navigation.navigate('Clientes')
      } else {
        dropDownAlertRef.alertWithType('error', 'Error', respuesta.MENSAJE);
      }
    } catch (error) {
      console.error(error)
    }
  }
  }
  return (
    <View style={styles.container}>
          <View style={{alignItems: "center",paddingBottom: 30}}>
              <Text style={{
                  color: '#5092FE',
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
          <TextInput style={styles.input}
          placeholder="Nombre"  
          placeholderTextColor='#BDC3C7'
          onChangeText={(text) => datosinput('nombre',text)}
          value={datosingreso.nombre}/>
      </View>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="user-friends" size={20}/>
          </View>
          <TextInput style={styles.input}
          placeholder="Apellido"  
          placeholderTextColor='#BDC3C7'
          onChangeText={(text) => datosinput('apellido',text)}
          value={datosingreso.apellido}/>
      </View>
      <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="phone-alt" size={20}/>
          </View>
          <TextInput style={styles.input}
          placeholder="Telefono"
          keyboardType="numeric"  
          placeholderTextColor='#BDC3C7'
          onChangeText={(text) => datosinput('celular',text)}
          value={datosingreso.celular}/>
      </View>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="car-alt" size={20}/>
          </View>
          <TextInput style={styles.input}
          placeholder="Placa"  
          placeholderTextColor='#BDC3C7'
          onChangeText={(text) => datosinput('placa',text)}
          value={datosingreso.placa}/>
      </View>
      <View style={styles.containercolumnas}>
        <TouchableOpacity onPress={() => RegistrarCliente()} style={{ paddingRight: 5 }}>
  <LinearGradient
        colors={['#090979', '#00d4ff']}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={styles.button}
      >
        <Ionicons name="save" size={24} color="white" />
        <Text style={styles.buttonText}>Registrar</Text>
      </LinearGradient>
</TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{ paddingRight: 5 }}>
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
<DropdownAlert  ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
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
      width: '80%',
      flexDirection: 'row',
    backgroundColor: '#949c92',
    fontWeight: '700',
    marginBottom: 15,
    marginHorizontal: 28,
    alignItems: 'center',
    elevation: 20,
    borderRadius: 15,
    },
    input: {
      backgroundColor:'#fff',
      width: '60%',
      height: 50,
      borderRadius:12,
      padding:14,
      marginBottom:7,
      marginTop:10,
      fontSize:14,
      borderWidth:1,
      borderColor:'#3ED5F3',
      textAlign: 'center',
    },
    inputContainer: {
      position: 'relative',
      width: '90%',
      marginBottom: 10,
    },
    input: {
      backgroundColor: '#949c92',
      width: '70%',
      height: 50,
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 50,
      color: 'black',
      fontSize: 18,
    },
    text:{
      marginLeft: 20,
      paddingRight: 20,
      fontSize: 17,
      fontWeight: '700',
      color: 'white',
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
    containercolumnas: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
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
    buttonText: {
      color: 'white',
      fontSize: 18,
      marginLeft: 8,
    },
  });
export default AgregarCliente