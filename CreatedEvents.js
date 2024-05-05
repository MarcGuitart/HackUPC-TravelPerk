import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from './src/supabase';

export default function RegisterScreen({ navigation }) {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {

    const fetchUserEvents = async () => {
      try {
        const { data: events, error: eventsError } = await supabase
          .from('PlanTable')
          .select('planName')
          .eq('creatorId', userData.id);

        if (eventsError) {
          throw new Error('Error fetching user events');
        }

        setUserEvents(events || []);
      } catch (error) {
        console.error('Error fetching user events:', error.message);
      }
    };
    fetchUserEvents();
  }, []);

  return (
    <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <AntDesign name="arrowleft" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.title}>Events created by you</Text>
    <View style={styles.eventsContainer}>
      {userEvents.length > 0 ? (
        userEvents.map((event, index) => (
          <Text key={index} style={styles.userDataText}>{event.planName}</Text>
        ))
      ) : (
        <View>
          <Text style={[styles.userDataText, styles.boldText]}>
            At the moment, You haven't created any event...
          </Text>
          <TouchableOpacity
            style={styles.createEventButton}
            onPress={() => navigation.navigate('Events')}
            <Text style={styles.createEventButtonText}>Create Event</Text>
          </TouchableOpacity>
        </View>
      )}
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
    width: '80%',
  },
  userDataItem: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 5,
  },
  eventsContainer: {
    marginTop: 20,
  },
});
