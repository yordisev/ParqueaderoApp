import React,{useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Modal,Button } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';

const Ayuda = () => {
  const [modalVisible, setModalVisible] = useState(false);
  showAlert = () => {
    setModalVisible(true)
  };
  hideAlert = () => {
    setModalVisible(false)
  };
  aceptar = () => {
    console.log("aceptarrr")
    setModalVisible(false)
  };
  cancelar = () => {
    console.log("cancelar")
  };


  return (
    <View style={styles.container}>
      {/* <Button title="Ver Modal" onPress={() => setModalVisible(true)} /> */}
      <Button title="Ver Modal" onPress={() => showAlert()} />
      <AwesomeAlert
          show={modalVisible}
          showProgress={true}
          progressSize="large"
          progressColor="blue"
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          cancelButtonColor="#F42A2A"
          confirmText="Yes, delete it"
          confirmButtonColor="#2A4CF4"
          onCancelPressed={() => hideAlert()}
          onConfirmPressed={() => aceptar()}
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