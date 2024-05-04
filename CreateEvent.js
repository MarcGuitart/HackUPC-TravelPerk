import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, DatePickerIOS, DatePickerAndroid, TimePickerAndroid } from 'react-native';
import { supabase } from './src/supabase';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreatePlanScreen({ navigation }) {
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const handleCreatePlan = async () => {
    console.log('Plan name:', planName);
    console.log('Description:', description);
    console.log('Location:', location);
    console.log('Date:', date);
    console.log('Time:', time);

    try {
      const { data, error } = await supabase
        .from('PlanTable')
        .insert([
          { planName: planName, description: description, location: location, date: date, time: time },
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

  const showDatePickerAndroid = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: date,
        mode: 'default',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);
        setDate(selectedDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const showTimePickerAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 0,
        minute: 0,
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const selectedTime = `${hour}:${minute}`;
        setTime(selectedTime);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
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
        <>
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
      ) : (
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
      )}

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
    width: '70%',
  },
  button: {
    marginTop: 20,
    width: '80%',
  },
});
