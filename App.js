import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; // Importa tus componentes de pantalla aquí
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import AboutYou from './AboutYou';
import Feed from './Feed';
import CreateEvent from './CreateEvent';
import { supabase } from './src/supabase';


const Stack = createStackNavigator();

export default function App() {
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
    <NavigationContainer>
      <Stack.Navigator>
      {user!='Guest' ? (
        <>
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Preferences" component={AboutYou} />
        <Stack.Screen name="Event" component={CreateEvent} />
        </>
      ) : (
        <>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LogIn" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Preferences" component={AboutYou} />
        <Stack.Screen name="Feed" component={Feed} />
        </> )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
