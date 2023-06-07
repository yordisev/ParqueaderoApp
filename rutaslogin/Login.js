import React,{useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, StyleSheet, StatusBar, Dimensions,NativeModules} from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import { accederalsistema } from '../api'
// import {useAuth} from '../ValidarLogin'

const Login = ({navigation}) => {
    const [confirmarVisible, setConfirmarVisible] = useState(false);
    // const [_, setUser] = useAuth();
    const [data, setData] = useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();
    const validartextousuario = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const longitudpassword = (val) => {
        if( val.trim().length >= 6 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const verpassword = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const LoginAcceso = async (userName, password) => {
        try {
            const datousuario = await accederalsistema(userName,password)
           if(datousuario.status == true){
            setConfirmarVisible(true);
            const jsonValue = JSON.stringify(datousuario)
            await AsyncStorage.setItem('valores', jsonValue)
            NativeModules.DevSettings.reload();
           } else {
            Dialog.show({
                type: ALERT_TYPE.DANGER, //DANGER,WARNING
                title: 'Error',
                textBody: 'Usuario o Contraseña Incorrectas',
                button: 'close',
              })
           }
          } catch (error) {
           console.error(error)
          }

        if ( data.username.length == 0 || data.password.length == 0 ) {
                    Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Verificar',
                    textBody: 'Los Campos no Pueden estar vacios',
                    })
            return;
        }
    }

    return (
        <AlertNotificationRoot>
      <View style={styles.container}>
          <StatusBar backgroundColor='#3393FF' barStyle="light-content"/>
          <View style={styles.header}>
      <Animatable.Image 
          animation="bounceIn"
          duraton="1500"
      source={require('../assets/parking.png')}
      style={styles.logo}
      resizeMode="stretch"
      />
  </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Usuario"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => validartextousuario(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Contraseña"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => longitudpassword(val)}
                />
                <TouchableOpacity
                    onPress={verpassword}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: '#3393FF', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {LoginAcceso( data.username, data.password )}}
                >
                <LinearGradient
                    colors={['#3393FF', '#fff']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Iniciar Session</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
        <AwesomeAlert
          show={confirmarVisible}
          showProgress={true}
          progressSize="large"
          progressColor="blue"
          title="Por Favor Espere"
          message="Iniciando Session"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          cancelText="No, cancelar"
          cancelButtonColor="#F42A2A"
          confirmText="Si, Actualizar"
          confirmButtonColor="#2A4CF4"
          onCancelPressed={() => setConfirmarVisible(false)}
          onConfirmPressed={() => EditarCliente()}
        />
      </View>
      </AlertNotificationRoot>
    );
};

export default Login;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#3393FF'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });