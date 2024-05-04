import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, FlatList, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importamos los íconos de Ant Design

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Función para simular la búsqueda
    const handleSearch = () => {
        // Aquí puedes implementar la lógica de búsqueda utilizando la query searchQuery
        // Por ahora, simplemente simulo algunos resultados aleatorios
        const results = Array.from({ length: 5 }, (_, i) => ({
            id: i.toString(),
            name: `Resultado ${i + 1}`,
        }));
        setSearchResults(results);
    };

    // Función para renderizar cada elemento de la lista de resultados
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.resultItem} onPress={() => console.log(item.name)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
      <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <AntDesign name="search1" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.resultsList}
                />
            )}
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    searchButton: {
        backgroundColor: 'blue',
        marginLeft: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultsList: {
        marginTop: 10,
    },
    resultItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default SearchScreen;
