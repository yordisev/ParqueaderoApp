import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text,StyleSheet,TouchableOpacity,Modal,Button } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const Ayuda = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity>
      <View style={styles.containerotro}>
          <View style={styles.iconContainer}>
              <FontAwesome5 name="motorcycle" size={20}/>
          </View>
          <Text style={styles.text}>Log Out</Text>
      </View>
    </TouchableOpacity>

    <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
          <View style={styles.container}>
            <Text>Hi this is my modal.</Text>
            <Button title="Ocultar Modal" onPress={() => setModalVisible(false)}/>
          </View>
      </Modal>
      <Button title="Ver Modal" onPress={() => setModalVisible(true)} />
      <StatusBar style="auto" />
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
    text:{
      marginLeft: 70,
      fontSize: 17,
      fontWeight: '700',
      color: 'white',
  },
  iconContainer:{
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      width: 50,
      height: 50,
    },
    containerotro:{
      flexDirection: 'row',
      backgroundColor: 'green',
      fontWeight: '700',
      marginBottom: 23,
      marginHorizontal: 28,
      alignItems: 'center',
      elevation: 20,
      borderRadius: 30,
    },
    bottomNavigationView: {
      backgroundColor: '#fff',
      width: '100%',
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
export default Ayuda