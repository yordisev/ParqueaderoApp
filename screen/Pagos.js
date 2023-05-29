import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ListItem from './DatosListar';
import { listarpersonas } from '../api'

const Pagos = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused();
    const [cargar, Cargando] = useState(false);
    const [filtrardatos, setfiltrardatos] = useState([]);
    const [getSelectionMode, setSelectionMode] = useState(1);
    const [gamesTab, setGamesTab] = useState(1);

    const updateSwitchData = value => {
        setSelectionMode(value);
        setGamesTab(value);
    };

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
                <ScrollView style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', borderColor: 'black', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 }}>
                        <FontAwesome name="search" size={20} color="black" style={{ marginRight: 5 }} />
                        <TextInput placeholder="Buscar" />
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                    style={styles.pagar}
                    onPress={() => {LoginAcceso( data.username, data.password )}}
                >
                <LinearGradient
                    colors={['#3393FF', '#fff']}
                    style={styles.pagar}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Pagar Todo</Text>
                </LinearGradient>
                </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            height: 44,
                            width: '100%',
                            backgroundColor: '#e4e4e4',
                            borderRadius: 10,
                            borderColor: '#3393FF',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginVertical: 20
                        }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => updateSwitchData(1)}
                            style={{
                                flex: 1,
                                backgroundColor: getSelectionMode == 1 ? '#3393FF' : '#e4e4e4',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    color: getSelectionMode == 1 ? 'white' : '#3393FF',
                                    fontSize: 14,
                                }}>
                                Debe
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => updateSwitchData(2)}
                            style={{
                                flex: 1,
                                backgroundColor: getSelectionMode == 2 ? '#3393FF' : '#e4e4e4',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    color: getSelectionMode == 2 ? 'white' : '#3393FF',
                                    fontSize: 14,
                                }}>
                                Pagado
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {gamesTab == 1 && 
            filtrardatos.map(item => (
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
                    {gamesTab == 2 && <Text>dos</Text>}
                </ScrollView>
            </SafeAreaView>
        )
    )
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
    pagar: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
});
export default Pagos