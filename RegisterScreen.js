import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from './src/supabase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

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

      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (!error) {
        navigation.navigate('Preferences');
      } else {
        throw new Error(error.message);
      }
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
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      
      <Button
        title="Register"
        onPress={handleRegister}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#144fcc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold', // Agregando negrita al título
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
  },
  button: {
    lexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
