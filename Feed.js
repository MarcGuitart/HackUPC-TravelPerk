import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';

const FeedScreen = ({ navigation }) => {
    const handleMessagesPress = () => {
        // Lógica para navegar a la pantalla de mensajes
    };

    const handleMapPress = () => {
        // Lógica para navegar a la pantalla de mapa
    };

    const handleCreateEventPress = () => {
        // Lógica para navegar a la pantalla de creación de evento
    };

    return (
        <ImageBackground source={require('./assets/background.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={{ color: 'white', fontSize: 20 }}>Feed Screen</Text>
                
                {/* Botones */}
                <View style={styles.buttonContainer}>
                    <Button title="Messages" onPress={handleMessagesPress} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Map" onPress={handleMapPress} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Create Event" onPress={handleCreateEventPress} />
                </View>
            </View>
        </ImageBackground>
    );
    
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default FeedScreen;