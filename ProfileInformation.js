import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from './src/supabase';

export default function RegisterScreen({ navigation }) {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let { data: creatorData, error: creatorError } = await supabase
          .from('UserData')
          .select('*');

        setUserData(creatorData);

        if (creatorError) {
          throw new Error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>User Information</Text>

        {/* Matriz de datos del usuario */}
        <View style={styles.userDataContainer}>
          <View style={styles.userDataItem}>
            <Text style={[styles.userDataLabel, styles.boldText]}>DNI:</Text>
            <Text style={styles.userDataText}>{userData[0]?.dni}</Text>
          </View>
          <View style={styles.userDataItem}>
            <Text style={[styles.userDataLabel, styles.boldText]}>Username:</Text>
            <Text style={styles.userDataText}>{userData[0]?.username}</Text>
          </View>
          <View style={styles.userDataItem}>
            <Text style={[styles.userDataLabel, styles.boldText]}>Phone Number:</Text>
            <Text style={styles.userDataText}>{userData[0]?.phone}</Text>
          </View>
          <View style={styles.userDataItem}>
            <Text style={[styles.userDataLabel, styles.boldText]}>Age:</Text>
            <Text style={styles.userDataText}>{userData[0]?.age}</Text>
          </View>
          {/* Agrega más campos de información según tu modelo de datos */}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  userDataContainer: {
    marginTop: 20,
    marginBottom:20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Hace que el contenedor sea más ancho
  },
  userDataItem: {
    marginBottom: 15,
    flexDirection: 'row', // Alinea los elementos en una fila
    alignItems: 'center', // Centra verticalmente los elementos
  },
  userDataLabel: {
    color: 'white',
    fontSize: 18,
  },
  userDataText: {
    color: 'white',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
    marginRight: 5, // Agrega espacio entre el título y la respuesta
  },
});
