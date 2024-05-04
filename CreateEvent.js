import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { supabase } from './src/supabase';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreatePlanScreen({ navigation }) {
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());


  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const handleCreatePlan = async () => {  
    console.log('Plan name:', planName);
    console.log('Description:', description);
    console.log('Location:', location);
    console.log('Date:', date);
    console.log('Participant:', participant);

    const creatorUserId = await supabase.auth.getUser();
    console.log(creatorData)
    let { data: creatorData, error: creatorError } = await supabase
      .from('UserData')
      .select('username')
      .eq('id', creatorUserId)

    
     const participant = [];
     participant.push(creatorData.username); 
    
    
    try {
      const { data, error } = await supabase
        .from('PlanTable')
        .insert([
          { planName: planName, description: description, location: location, date: date, participant: participant},
        ]);

      if (error) {
        console.error('Error al guardar las preferencias:', error.message);
        return;
      }

      console.log('Datos guardados correctamente:', data);

      navigation.navigate('Feed');
    } catch (error) {
      console.error('Error al guardar las preferencias:', error.message);
    }
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
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

      {Platform.OS === 'ios' ? (
        /*<>
          <DatePickerIOS
            style={styles.input}
            date={date}
            onDateChange={newDate => setDate(newDate)}
            mode="date"
          />
          <DatePickerIOS
            style={styles.input}
            date={date}
            onDateChange={newDate => setTime(newDate.toLocaleTimeString())}
            mode="time"
          />
        </>*/
        <>
          <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          onChange={onChange}
        />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='time'
          is24Hour={true}
          onChange={onChange}
        />
        </>
      ) : Platform.OS === 'android' ? (
        <>
          <Button
            title="Select Date"
            onPress={showDatepicker}
            style={styles.input}
          />
          <Button
            title="Select Time"
            onPress={showTimepicker}
            style={styles.input}
          />
        </>
      ) : (/*
        <>
          <input
            type="date"
            style={styles.input}
            value={date.toISOString().split('T')[0]}
            onChange={e => setDate(new Date(e.target.value))}
          />
          <input
            type="time"
            style={styles.input}
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </>
      */
      <>
      <input
  type="datetime-local"
  style={styles.input}
  value={date}
  onChange={e => setDate(e.target.value)}
/>
</>
    )}

      <Button
        title="Create plan"
        onPress={handleCreatePlan}
        style={styles.button}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
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
    width: '70%',
  },
  button: {
    marginTop: 20,
    width: '80%',
  },
});
