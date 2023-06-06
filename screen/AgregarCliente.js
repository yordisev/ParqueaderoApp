import React,{useState} from 'react'
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

const AgregarCliente = () => {
  const [datosingreso, setdatosingresos] = useState({
    id_cliente:'',
    nombre:'',
    placa:'',
    celular:'',
    estado:'',
  });
  const datosinput = (name, value) => setdatosingresos({...datosingreso,[name]:value});
  const RegistrarCliente = async () => {
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
          <Text style={styles.text}>aaaaaaaaaaaaaaaaa</Text>
      </View>
      <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="phone-alt" size={20}/>
          </View>
          <TextInput style={styles.input}  
          placeholderTextColor='#BDC3C7'
          onChangeText={(text) => datosinput('celular',text)}
          value={datosingreso.celular}/>
      </View>
          <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="car-alt" size={20}/>
          </View>
          <Text style={styles.text}>aaaaaaaaaaaaaaa</Text>
      </View>
        <TouchableOpacity onPress={() => RegistrarCliente()} style={{ paddingRight: 5 }}>
  <LinearGradient
        colors={['#090979', '#00d4ff']}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={styles.button}
      >
        <Ionicons name="send" size={24} color="white" />
        <Text style={styles.buttonText}>Registrar</Text>
      </LinearGradient>
</TouchableOpacity>
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
    button: {
      width: '50%',
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