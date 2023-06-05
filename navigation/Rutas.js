import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Inicio from '../screen/Inicio';
import Registro from '../screen/Registro';
import Pagos from '../screen/Pagos';
import Clientes from '../screen/Clientes';
import Ayuda from '../screen/Ayuda';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabbotton = createBottomTabNavigator();

const Rutas = () => {
  return (
    <Tabbotton.Navigator 
  screenOptions={{
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      borderTopRightRadius: 20, // Agrega un borde superior
      borderTopLeftRadius: 20, // Agrega un borde superior
      backgroundColor: '#3393FF', // Cambia el color de fondo de la barra
      height: 60, // Aumenta la altura de la barra
    },
    tabBarLabelStyle: {
      fontSize: 16, // Cambia el tamaño de la etiqueta del ícono
    },
    tabBarActiveTintColor: 'white', // Cambia el color del ícono activo y el texto
    tabBarInactiveTintColor: '#D3D3D3', // Cambia el color del ícono inactivo y el texto
  }}
   style={styles.container}>
      {/* <Tabbotton.Screen name="Inicio"
        component={Inicio}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }} /> */}
          <Tabbotton.Screen name="Inicio" component={Inicio} 
          options={{
            headerTitle: 'Inicio',
            headerShown: true,
             headerTitleAlign: 'center', // Centra el título
                title: "",
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                headerTintColor:'#fff',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="home" size={30} color={color} style={{ marginBottom: -15 }}/>
                )
            }}
             />
            <Tabbotton.Screen name="Registro" component={Registro} 
            options={{
              headerTitle: 'Registro',
            headerShown: true,
             headerTitleAlign: 'center', // Centra el título
            title: "",
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                headerTintColor:'#fff',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="registered-trademark" size={30} color={color} style={{ marginBottom: -15 }} />
                )
            }} />
            <Tabbotton.Screen name="Pagos" component={Pagos} 
            options={{
              headerTitle: 'Pagos',
            headerShown: true,
             headerTitleAlign: 'center', // Centra el título
            title: "",
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                headerTintColor:'#fff',
                tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="dollar-sign" size={30} color={color} style={{ marginBottom: -15 }} />
                )
            }} />
            <Tabbotton.Screen name="Clientes" component={Clientes} 
            options={{
              headerTitle: 'Clientes',
            headerShown: true,
             headerTitleAlign: 'center', // Centra el título
            title: "",
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                headerTintColor:'#fff',
                tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="users" size={30} color={color} style={{ marginBottom: -15 }} />
                )
            }} />
      <Tabbotton.Screen name="Ayuda"
        component={Ayuda}
        options={{
          headerTitle: 'Ayuda',
            headerShown: true,
             headerTitleAlign: 'center', // Centra el título
            title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="help-box" size={30} color={color} style={{ marginBottom: -15 }} />
          ),
        }} />
    </Tabbotton.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:20
  },
});
export default Rutas;