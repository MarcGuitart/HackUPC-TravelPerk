import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet, StatusBar } from 'react-native';
import { supabase } from './src/supabase';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {

  const [user, setUser] = useState('');

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const username = user ? user.email : 'Guest';
    setUser(username);
    console.log(`Username: ${username}`);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
    <Image source={require('./assets/HomeScreenPhoto.png')} style={styles.image} />
      <Text style={styles.welcomeText}>
      </Text>
      <StatusBar translucentbackgroundColor = 'transparent' />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28A4D4' }]}
        onPress={() => navigation.navigate('LogIn')}
      >
        <AntDesign name="login" size={24} color="white" />
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#042F83' }]}
        onPress={() => navigation.navigate('Register')}
      >
        <AntDesign name="adduser" size={24} color="white" /> {/* Cambiado el icono a "adduser" */}
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
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
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
},

image: {
  width: 450,
  height: 450,
  marginBottom: -70,
},

  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
},
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
});
