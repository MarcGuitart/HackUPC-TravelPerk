import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { supabase } from './src/supabase';
import { AntDesign } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {

    const handleLogout = async () => {
        let { error } = await supabase.auth.signOut();
        if (error) console.log('Error logging out:', error.message);
        else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }
    };

    return (
        <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Profile</Text>
    
                {/* Información del perfil */}
                <TouchableOpacity
                    style={[styles.menuItem, styles.largeText]}
                    onPress={() => navigation.navigate('ProfileInformation')}
                    >
                    <Text style={[styles.menuItemText, styles.largeText]}>Profile Information</Text>
                </TouchableOpacity>
    
                {/* Eventos creados */}
                <TouchableOpacity
                    style={[styles.menuItem, styles.largeText]}
                    onPress={() => navigation.navigate('CreatedEvents')}
                >
                    <Text style={[styles.menuItemText, styles.largeText]}>Created Events</Text>
                </TouchableOpacity>
    
                {/* Participaciones */}
                <TouchableOpacity
                    style={[styles.menuItem, styles.largeText]}
                    onPress={() => navigation.navigate('JoinedEvents')}
                >
                    <Text style={[styles.menuItemText, styles.largeText]}>Joined Events</Text>
                </TouchableOpacity>
    
                {/* Log out */}
                <TouchableOpacity
                    style={[styles.menuItem, styles.logoutButton]}
                    onPress={handleLogout}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
    
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'nombre-de-la-fuente',
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: 'white',
    marginBottom: 50,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 50,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: '#0D275A',
    },
    menuItemText: {
        color: 'white',
        fontSize: 16,
    },
    largeText: {
        fontSize: 20,
    },
    logoutButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginTop: 20,
        width: '30%',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 30,
        zIndex: 1,
    },
});

export default ProfileScreen;
