import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Validar que todos los campos estén completos
      if (!email || !password || !confirmPassword) {
        throw new Error('Please fill in all fields');
      }

      // Validar que el email sea una dirección de email válida
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validar que la contraseña tenga al menos 6 caracteres
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Validar que las contraseñas coincidan
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Implementar lógica para registrar al usuario
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);

      // Aquí puedes agregar la lógica para registrar al usuario en la base de datos

      // Navegar a la siguiente pantalla después del registro
      navigation.navigate('Preferences');
    } catch (error) {
      alert(error.message);
      console.error('Error registering user:', error.message);
    }
  };

  // Función para validar una dirección de email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        
        <TextInput
        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        
        <TextInput
        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        
        <TextInput
        style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}
          placeholder="Confirm your password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <View style={styles.separator}></View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#042f83' }]}
          onPress={handleRegister}
        >
        <AntDesign name="adduser" size={24} color="white" />
          <Text style={styles.buttonText}>Register</Text>
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
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
  },
  separator: {
    height: 30, // Espacio entre los botones
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '14%',
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
