import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Aquí puedes implementar la lógica para realizar la búsqueda
    console.log('Realizando búsqueda con query:', searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <Button
        title="Search"
        onPress={handleSearch}
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
    backgroundColor: '#144fcc',
  },
  input: {
    backgroundColor: 'white', 
    padding: 10, 
    borderRadius: 5, 
    marginTop: 10 ,
    width: '80%',
  },
  button: {
    width: '80%',
  },
});
