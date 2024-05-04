import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
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
        <View style={styles.container}>
            {/* Información del perfil */}
            <TouchableOpacity style={styles.menuItem}>
                <Text>Perfil</Text>
            </TouchableOpacity>

            {/* Eventos creados */}
            <TouchableOpacity style={styles.menuItem}>
                <Text>Eventos Creados</Text>
            </TouchableOpacity>

            {/* Participaciones */}
            <TouchableOpacity style={styles.menuItem}>
                <Text>Participaciones</Text>
            </TouchableOpacity>

            {/* Log out */}
            <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
                <Text style={{ color: 'white' }}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
        alignItems: 'flex-start',
    },
    logoutButton: {
        backgroundColor: 'red',
    },
});

export default ProfileScreen;
