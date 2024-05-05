import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { supabase } from './src/supabase';
import { AntDesign } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Aquí puedes implementar la lógica para registrar al usuario
    console.log('Email:', email);
    console.log('Password:', password);
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      alert(error.message);
    } else {
        navigation.reset({
        index: 0,
        routes: [{ name: 'Feed' }],
      });
    }

  };

  return (
    <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Welcome Back!</Text>
            
            <TextInput
                style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10, width: '45%' }}
                placeholder="Enter your email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            
            <TextInput
                style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10, width: '45%' }}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <View style={styles.separator}></View>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#28A4D4' }]}
                onPress={handleLogin}
            >
                <AntDesign name="login" size={24} color="white" />
                <Text style={styles.buttonText}>Log In</Text>
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
  title: {
    fontFamily: 'nombre-de-la-fuente', // Reemplaza 'nombre-de-la-fuente' con el nombre de la fuente deseada
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
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
  separator: {
    height: 30, // Espacio entre los botones
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 1, // Para que el botón esté por encima de los otros elementos
},

});
