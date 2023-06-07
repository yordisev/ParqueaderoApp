import React,{useState,useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
// import TabNavigation from './navigation/TabNavigation';
import Rutas from './navigation/Rutas';
import RutaPrincipal from './rutaslogin/RutaPrincipal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import AuthProvider,{useAuth} from './ValidarLogin';


const Acceso = () => {
  const isFocused = useIsFocused();
  const [_, setUser] = useAuth();
  useEffect(() => {
    getData()
}, [isFocused])
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('valores')
    if(jsonValue != null){
      setUser(jsonValue)
    }else{

    }
    } catch(e) {
    }
  }
  const [user] = useAuth();
  if(!user){
      return(
        <RutaPrincipal/>
      );
  }
  return (
        <Rutas/>
  )
}
const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
      <AuthProvider>
        <Acceso/>
        </AuthProvider>
        </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;