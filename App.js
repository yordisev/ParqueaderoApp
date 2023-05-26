import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './navigation/TabNavigation';
import RutaPrincipal from './rutaslogin/RutaPrincipal';
import AuthProvider,{useAuth} from './ValidarLogin';


const Acceso = () => {
  const [user] = useAuth();
  if(!user){
      return(
        // <RutaPrincipal/>
        <TabNavigation />
      );
  }
  return (
        <TabNavigation />
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