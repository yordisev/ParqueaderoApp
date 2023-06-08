import React,{useState} from 'react'
import { View, Text,StyleSheet,Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';
import {useAuth} from '../ValidarLogin'

const Ayuda = () => {
  const [_, setUser] = useAuth();
  const navigation = useNavigation();
  const [confirmarVisible, setConfirmarVisible] = useState(false);
  cerrarSession = async () => {
    setConfirmarVisible(true);
    try {
      await AsyncStorage.removeItem('valores');
      setConfirmarVisible(false);
      const datovacio = null;
      setUser(datovacio)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }] // Reemplaza 'NuevaVista' con el nombre de tu vista de destino
      });
  }catch(exception) {

  }
  };
  return (
    <View style={styles.container}>
      <Button title="Cerrar Session" onPress={() => cerrarSession()} />
      <AwesomeAlert
          show={confirmarVisible}
          showProgress={true}
          progressSize="large"
          progressColor="blue"
          title="Por Favor Espere"
          message="Cerrando session"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          cancelText="No, cancelar"
          cancelButtonColor="#F42A2A"
          confirmText="Si, Actualizar"
          confirmButtonColor="#2A4CF4"
          onCancelPressed={() => setConfirmarVisible(false)}
          onConfirmPressed={() => EditarCliente()}
        />
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
  });
export default Ayuda