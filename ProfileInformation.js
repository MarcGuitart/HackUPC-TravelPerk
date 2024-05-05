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
      .select('*')
      
      setUserData(creatorData);
        
        if (error || !user) {
          throw new Error('User not authenticated');
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
          <Text style={styles.userDataText}>DNI: {userData[0]?.dni}</Text>
          <Text style={styles.userDataText}>Username: {userData[0]?.username}</Text>
          <Text style={styles.userDataText}>PhoneNumber: {userData[0]?.phone}</Text>
          <Text style={styles.userDataText}>Age: {userData[0]?.age}</Text>
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
    fontFamily: 'nombre-de-la-fuente', // Reemplaza 'nombre-de-la-fuente' con el nombre de la fuente deseada
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
    marginBottom: 50,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 1, // Para que el botón esté por encima de los otros elementos
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  userDataContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  userDataText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
});
