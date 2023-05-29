import 'react-native-gesture-handler';
import Inicio from '../screen/Inicio';
import Ayuda from '../screen/Ayuda';
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
      <Tabbotton.Screen name="Ayuda"
        component={Ayuda}
        options={{
          tabBarLabel: 'Ayuda',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="help-box" color={color} size={30} />
          ),
        }} />
    </Tabbotton.Navigator>
  );
}

export default Rutas;