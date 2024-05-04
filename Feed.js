import React from 'react';
import { View, Button } from 'react-native';

const FeedScreen = () => {
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
        <View>
            {/* Contenido de la pantalla principal */}
            {/* ... */}

            {/* Barra de botones */}
            <View>
                <Button title="Mensajes" onPress={handleMessagesPress} />
                <Button title="Mapa" onPress={handleMapPress} />
                <Button title="Crear Evento" onPress={handleCreateEventPress} />
            </View>
        </View>
    );
};

export default FeedScreen;