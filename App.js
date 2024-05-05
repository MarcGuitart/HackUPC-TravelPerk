import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import AboutYou from './AboutYou';
import Feed from './Feed';
import CreateEvent from './CreateEvent';
import Search from './Search';
import Profile from './Profile';
import ProfileInformation from './ProfileInformation';
import CreatedEvents from './CreatedEvents';
import JoinedEvents from './JoinedEvents';
import { supabase } from './src/supabase';


const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState('Guest');

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const username = user ? user.email : 'Guest';
    setUser(username);
    console.log(`Username: ${username}`);
  };

  useEffect(() => {
    fetchUser();
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      fetchUser();
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {user!='Guest' ? (
        <>
        <Stack.Screen name="Feed" component={Feed} options={{headerShown:false}}/>
        <Stack.Screen name="Preferences" component={AboutYou} options={{headerShown:false}}/>
        <Stack.Screen name="Event" component={CreateEvent} options={{headerShown:false}}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="ProfileInformation" component={ProfileInformation} options={{headerShown:false}}/>
        <Stack.Screen name="CreatedEvents" component={CreatedEvents} options={{headerShown:false}}/>
        <Stack.Screen name="JoinedEvents" component={JoinedEvents} options={{headerShown:false}}/>


        </>
      ) : (
        <>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="LogIn" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Preferences" component={AboutYou} options={{headerShown:false}}/>
        <Stack.Screen name="Feed" component={Feed} options={{headerShown:false}}/>
        <Stack.Screen name="Event" component={CreateEvent} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/>

        </> )}
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
