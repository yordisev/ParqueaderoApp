import 'react-native-gesture-handler';
import Inicio from '../screen/Inicio';
import Listado from '../screen/Listado';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tabbotton = createMaterialBottomTabNavigator();

const Rutas = () => {
  return (
    <Tabbotton.Navigator initialRouteName="Inicio"
                    activeColor="white"
                    barStyle={{ backgroundColor: '#3393FF' }}>
      <Tabbotton.Screen name="Inicio"
        component={Inicio}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }} />
      <Tabbotton.Screen name="Listado"
        component={Listado}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera-plus" color={color} size={26} />
          ),
        }} />
    </Tabbotton.Navigator>
  );
}

export default Rutas;