import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from './src/supabase';

export default function RegisterScreen({ navigation }) {
  const [userPlans, setUserPlans] = useState([]);

  useEffect(() => {
    const fetchUserPlans = async () => {
      try {
        const { data: plans, error: plansError } = await supabase
          .from('UserPlans')
          .select('planName')
          .eq('userId', userData.id);

        if (plansError) {
          throw new Error('Error fetching user plans');
        }

        setUserPlans(plans || []);
      } catch (error) {
        console.error('Error fetching user plans:', error.message);
      }
    };

    fetchUserPlans();
  }, []);

  return (
    <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Events you're attending</Text>
        <View style={styles.plansContainer}>
          {userPlans.length > 0 ? (
            userPlans.map((plan, index) => (
              <Text key={index} style={styles.planText}>{plan.planName}</Text>
            ))
          ) : (
            <View>
              <Text style={[styles.noPlansText, styles.boldText]}>
                You haven't joined any event yet...
              </Text>
              <TouchableOpacity
                style={styles.createEventButton}
                onPress={() => navigation.navigate('Feed')}>
                <Text style={styles.createEventButtonText}>Explore Events</Text>
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
  plansContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  planText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  noPlansText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  createEventButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    marginBottom: 20,
    marginLeft: 55,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#0D275A',
  },
  createEventButtonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 30,
  },
});
