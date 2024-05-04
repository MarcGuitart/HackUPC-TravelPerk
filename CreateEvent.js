import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CreatePlanScreen({ navigation }) {
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleCreatePlan = () => {
    // Aquí puedes implementar la lógica para crear un nuevo plan
    console.log('Nombre del plan:', planName);
    console.log('Descripción:', description);
    console.log('Ubicación:', location);
    console.log('Hora de inicio:', startTime);
    
    // Aquí podrías enviar los datos del plan a tu backend, guardarlos en una base de datos, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear un nuevo plan</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre del plan"
        value={planName}
        onChangeText={text => setPlanName(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={location}
        onChangeText={text => setLocation(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Hora de inicio (ej. 10:00 AM)"
        value={startTime}
        onChangeText={text => setStartTime(text)}
      />
      
      <Button
        title="Crear plan"
        onPress={handleCreatePlan}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: '80%',
  },
});
