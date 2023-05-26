import React,{useState} from 'react'
import { StyleSheet, Text, View,Image, TextInput, ImageBackground, SafeAreaView, ScrollView,TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { buscarpornombre } from '../api'

const Registro = () => {
  const navigation = useNavigation()
  const [datosbuscar, Enviarloginacceso] =  useState({
    negocionombre:'',
  })
  const [filtrardatos, setfiltrardatos] = useState([]);
  const datosenviar = (name, value) => Enviarloginacceso({...datosbuscar,[name]:value});
  const Buscar = async () => {
    if(datosbuscar.negocionombre == '' || datosbuscar.negocionombre == undefined || datosbuscar.negocionombre == null){
      
    } else{
   try {
     const listadonegocios = await buscarpornombre(datosbuscar)
     setfiltrardatos(listadonegocios)
    if(listadonegocios.status == true){
    } else {
       
    }
   } catch (error) {
    console.error(error)
   }
  }
  }
  return (
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
          >
            <Text style={{
                                color: 'black',
                                fontSize: 20,
                                fontWeight: 'bold',
                                textTransform: 'uppercase', justifyContent: 'center',
                            }}>
                                Buscar Placa
                            </Text>
            <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    placeholder="Placa a Buscar"
    placeholderTextColor="#BDC3C7"
    onChangeText={(text) => datosenviar('negocionombre',text)}
    onSubmitEditing={Buscar}
  />
  <TouchableOpacity
    onPress={Buscar}
    style={styles.icon}
  >
    <Ionicons name='search' size={25} color="black" />
  </TouchableOpacity>
</View>
<View style={styles.contenercolumnas}>
                                {
                                    filtrardatos.map((item, index) => {
                                        return (
                                            <LinearGradient key={index}
                                                colors={['#8ded76', '#ffffff']}
                                                style={[styles.box, styles.item]}>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('DetalleNegocio', { negocio: item.id_negocio })}>
                                                    <View style={styles.imageTitleContainer}>
                                                        <Image source={{ uri: item.imagen }} style={styles.imagenestilo} />
                                                        <Text style={styles.textlogo}>{item.nombre_negocio}</Text>
                                                    </View>

                                                </TouchableOpacity>
                                            </LinearGradient>

                                        );
                                    })
                                }
                            </View>
          </ScrollView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 40,
  },
  scrollContentContainer: {
    alignItems: "center",
    paddingBottom: 60
  },
  inputContainer: {
    position: 'relative',
    width: '90%',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#949c92',
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 50,
    color: 'black',
    fontSize: 18,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenercolumnas: {
    justifyContent: "center",
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
},
  imageTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
},
imagenestilo: {
  width: 170,
  height: 150,
  borderRadius: 5,
    marginBottom: 10,
},
item: {
  width: '45%',
  height: 190,
  margin: 5
},
box: {
  height: 100,
  width: 100,
  borderRadius: 5,
  marginVertical: 5,
  backgroundColor: "#61dafb",
  alignItems: "center",
  justifyContent: "center"
},
textlogo: {
  color: 'black',
  fontSize: 15,
  fontWeight: 'bold',
},
});

export default Registro