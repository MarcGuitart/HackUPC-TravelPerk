import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from './src/supabase';

const ProfileScreen = ({ navigation }) => {

    const handleLogout = async () => {
        let { error } = await supabase.auth.signOut();
        if (error) console.log('Error logging out:', error.message);
        else {
            // Aquí puedes navegar a la pantalla de inicio de sesión o cualquier otra pantalla que desees
            navigation.navigate('Login');
        }
    };

    return (
        <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={{ color: 'white', fontSize: 20 }}>Profile</Text>

                {/* Información del perfil */}
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={{ color: 'white' }}>Información del Perfil</Text>
                </TouchableOpacity>

                {/* Eventos creados */}
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={{ color: 'white' }}>Eventos Creados</Text>
                </TouchableOpacity>

                {/* Participaciones */}
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={{ color: 'white' }}>Participaciones</Text>
                </TouchableOpacity>

                {/* Log out */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={{ color: 'white', fontSize: 14 }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

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
    menuItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    logoutButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
    },
});

export default ProfileScreen;
