import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CreatePlanScreen({ navigation }) {
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleCreatePlan = () => {
    // Aquí puedes implementar la lógica para crear un nuevo plan
    console.log('Plan name:', planName);
    console.log('Description:', description);
    console.log('Location:', location);
    console.log('Start time:', startTime);
    
    // Aquí podrías enviar los datos del plan a tu backend, guardarlos en una base de datos, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your plan</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Plan name"
        value={planName}
        onChangeText={text => setPlanName(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={text => setLocation(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Start time"
        value={startTime}
        onChangeText={text => setStartTime(text)}
      />
      
      <Button
        title="Create plan"
        onPress={handleCreatePlan}
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
    },
    input: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    button: {
      marginTop: 20,
      width: '80%',
    },
  });
