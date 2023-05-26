import React from 'react'
import { DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import {View, Text,StyleSheet, ImageBackground,Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import {useAuth} from '../ValidarLogin'

const Profile = (props) => {
  const [_, setUser] = useAuth();
  const CerrarSession = () => {
    const datovacio = null;
    setUser(datovacio)
}
  return (
    <View style={{flex:1}}>
    <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#3393FF'}}>
        <ImageBackground source={require('../assets/imagenmenu.jpg')} style={{padding:20}}>
            <Image source={require('../assets/profile-user.png')} style={{height:80,width:80,borderRadius:40,marginBottom:10}}/>
            <Text style={{color: '#fff',fontSize:18}}>Yordis Escorcia</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={{color: '#fff',fontSize:15,marginRight:5}}>Coins 9565</Text>
            <FontAwesome5 name="coins" size={14} color="white" />
            </View>
            
        </ImageBackground>
        <View style={{flex:1,backgroundColor:'#fff', paddingTop:10}}>
        <DrawerItemList {...props} />
        </View>
    </DrawerContentScrollView>
    <View style={{padding:20,borderTopWidth:1,borderTopColor:'#ccc'}}>
        <TouchableOpacity onPress={()=>{CerrarSession()}} style={{paddingVertical:15}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <FontAwesome5 name="window-close" size={24} color="black" />
        <Text style={{fontSize:15,marginLeft:5}}>Cerrar Sesion</Text>
            </View>
        </TouchableOpacity>
    </View>
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
export default Profile