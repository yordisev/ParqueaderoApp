import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { windowWidth } from '../navigation/Utilidades';

export default function ListItem({photo, title, subTitle, isFree, price, onPress}) {
  return (
    <View style={{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image
          source={{uri:photo}}
          style={{width: 55, height: 55, borderRadius: 10, marginRight: 8}}
        />
        <View style={{width: windowWidth - 220}}>
          <Text
            style={{
              color: '#333',
              fontSize: 14,
            }}>
            {subTitle}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#333',
              fontSize: 14,
              textTransform: 'uppercase',
            }}>
            {title}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onPress}>
         <LinearGradient
                    colors={['#3393FF', '#fff']}
                    style={{
                      backgroundColor:'#0aada8',
                      padding:10,
                      width: 100,
                      borderRadius: 10,
                    }}
                >
        <Text style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: 14,
        }}>
          {isFree == 'Yes' && 'Salida'}
          {isFree == 'No' && price}
        </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}