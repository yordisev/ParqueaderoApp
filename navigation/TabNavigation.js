import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Profile from './Profile';
import Rutas from './Rutas';
import Registro from '../screen/Registro';
import Pagos from '../screen/Pagos';
import Clientes from '../screen/Clientes';
import Islas from '../screen/Islas';
import Tarifas from '../screen/Tarifas';
import Reportes from '../screen/Reportes';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const TabNavigation = () => {
    return (
        <Drawer.Navigator drawerContent={props => <Profile{...props} />}
            screenOptions={{ headerShown: true,
                            drawerActiveBackgroundColor:'#3393FF',
                            drawerActiveTintColor:'#fff',
                            drawerInactiveTintColor:'#333',
                             drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
                             drawerStyle: {
                                width: 300,
                                // marginTop:30
                              }, }}
            style={styles.container}>
            <Drawer.Screen name="Rutas" component={Rutas} options={{
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                headerTintColor:'#fff',
                drawerIcon: ({ color }) => (
                    <AntDesign name="home" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Registro" component={Registro} options={{
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                drawerIcon: ({ color }) => (
                    <MaterialCommunityIcons name="registered-trademark" size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Pagos" component={Pagos} options={{
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                drawerIcon: ({ color }) => (
                    <FontAwesome5 name="dollar-sign" size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Clientes" component={Clientes} options={{
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                drawerIcon: ({ color }) => (
                    <FontAwesome5 name="users" size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Islas" component={Islas} options={{
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                drawerIcon: ({ color }) => (
                    <FontAwesome5 name="parking" size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Tarifas" component={Tarifas} options={{
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                drawerIcon: ({ color }) => (
                    <FontAwesome5 name="bullseye" size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Reportes" component={Reportes} options={{
                headerStyle:{
                    backgroundColor:'#3393FF'
                },
                drawerIcon: ({ color }) => (
                    <FontAwesome5 name="chart-bar" size={22} color={color} />
                )
            }} />
        </Drawer.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
export default TabNavigation;