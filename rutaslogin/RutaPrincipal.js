import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';

const Stack = createStackNavigator();

const RutaPrincipal = ({navigation}) => {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false, }}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
       
    );
}
export default RutaPrincipal;