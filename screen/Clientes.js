import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const Clientes = () => {
  return (
    <View style={styles.container}>
      
      <Text>Clientes</Text>
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
export default Clientes