import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from './src/supabase';

export default function HomeScreen({ navigation }) {

  const [user, setUser] = useState('');

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const username = user ? user.email : 'Guest';
    setUser(username);
    console.log(`Username: ${username}`);
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  React.useEffect(() => {
    fetchUser();
  });

  return (
    <View style={styles.container}>
      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate('LogIn')}
        style={styles.button}
      />
      <View style={styles.separator}></View>
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('Register')}
        style={styles.button}
      />
      <Text style={{ color: 'white', fontSize: 20, marginTop: 20 }}>
        {user ? `Bienvenido, ${user}` : 'Bienvenido, Invitado'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 150,
    backgroundColor: '#144fcc',
  },
  separator: {
    height: 30, // Espacio entre los botones
  },
});
