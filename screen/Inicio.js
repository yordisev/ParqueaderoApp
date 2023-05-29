import React, { useEffect, useState } from 'react'
import { View, Text,StyleSheet,ActivityIndicator,ScrollView,SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation,useIsFocused } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import ListItem from './DatosListar';
import { listarpersonas } from '../api'

const Inicio = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [cargar, Cargando] = useState(false);
    const [filtrardatos, setfiltrardatos] = useState([]);

    useEffect(() => {
      Cargarlista()
  }, [isFocused])
  const Cargarlista = async () => {
      Cargando(true);
      const datosoptenidos = await listarpersonas()
      setfiltrardatos(datosoptenidos)
      Cargando(false);
  }
  return (
    cargar ? (
      <View style={[styles.cargandodatos, styles.containercargando]}>
          <ActivityIndicator size="large" color="3ED5F3" />
      </View>
  ) : (
    <SafeAreaView style={styles.container}>
    <ScrollView>
         <Animatable.View animation="fadeInUp" style={styles.containercolumnas}>
         <LinearGradient
                    colors={['#3393FF', '#fff']}
                    style={[styles.example,{ borderRadius: 20 }]}
                >
          <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
              Total Motos
          </Animatable.Text>
          </LinearGradient>
        <LinearGradient
                    colors={['#3393FF', '#fff']}
                    style={[styles.example,{ borderRadius: 20 }]}
                >
          <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
              Disponibles
          </Animatable.Text>
          </LinearGradient>
          <LinearGradient
                    colors={['#3393FF', '#fff']}
                    style={[styles.example,{ borderRadius: 20 }]}
                >
          <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
              Total Carros
          </Animatable.Text>
          </LinearGradient>
          <LinearGradient
                    colors={['#3393FF', '#fff']}
                    style={[styles.example,{ borderRadius: 20 }]}
                >
          <Animatable.Text animation="flipInY" style={[styles.centeredText]}>
              Disponibles
          </Animatable.Text>
          </LinearGradient>
      </Animatable.View>
      <View style={{ padding: 20 }}>
      {filtrardatos.map(item => (
            <ListItem
              key={item.id_persona}
              photo={item.imagen}
              title={item.nombre}
              subTitle={'pruebas'}
              isFree={'Yes'}
              onPress={() =>
                navigation.navigate('GameDetails', {
                  title: item.nombre,
                  id: item.id_persona,
                })
              }
            />
          ))}
      </View>
      {/* <Button title="navegar" onPress={() => navigation.navigate('Detalle', { idbuscar: 1 })}/>
      <Button title="Atras" onPress={() => navigation.goBack()}/>
      <Button title="Abrir Menu" onPress={() => navigation.openDrawer()}/> */}
    </ScrollView>
    </SafeAreaView>
  ))
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    containercargando: {
      flex: 1,
      justifyContent: "center"
  },
  cargandodatos: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
  },
    containercolumnas: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20,
      alignItems: 'center',
    justifyContent: 'center',
    },
    example: {
      width: 170,
      height: 120,
      marginLeft: 10,
      marginBottom: 10,
      backgroundColor: 'grey',
      // borderWidth: 0.5,
      justifyContent: 'center'
    },
    centeredText: {
      textAlign: 'center',
      margin: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default Inicio