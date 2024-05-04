import React from 'react';
import { View, Button } from 'react-native';

const FeedScreen = () => {
    const handleMessagesPress = () => {
        // Lógica para navegar a la pantalla de mensajes
        <Text style={{ color: 'white', fontSize: 20 }}>Create your account</Text>
        
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
            
      <Button
        title="Messages"
        onPress={handleRegister}
        style={{ marginTop: 10 }}
      />
      
      <Button
        title="Create Event"
        onPress={handleRegister}
        style={{ marginTop: 10 }}
      />
      
      <Button
        title="Events Near Me"
        onPress={handleRegister}
        style={{ marginTop: 10 }}
      />
            <View>
                
                <Button title="Mensajes" onPress={handleMessagesPress} />
                <Button title="Mapa" onPress={handleMapPress} />
                <Button title="Crear Evento" onPress={handleCreateEventPress} />
            </View>
        </View>
    );
};

export default FeedScreen;