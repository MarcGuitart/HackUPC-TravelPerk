import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importamos los íconos de Ant Design
import { supabase } from './src/supabase';

const FeedScreen = ({ navigation }) => {
    const handleSearchPress = () => {
        navigation.navigate('Search');
    };

    const handleAddEventPress = () => {
        navigation.navigate('Event');
    };

    const handleProfilePress = () => {
        
    };

    const logOut = async () => {
        let { error } = await supabase.auth.signOut();
        if (error) console.log('Error logging out:', error.message);
        else {
            window.location.reload();
        }
    };

    return (
        <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={{ color: 'white', fontSize: 20 }}>Feed Screen</Text>
                {/* Tab con los tres botones */}
            </View>
            <View style={styles.tabBar}>
                    <TouchableOpacity style={styles.tabButton} onPress={handleSearchPress}>
                        <AntDesign name="search1" size={24} color="black" />
                        <Text>Search</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addButton} onPress={handleAddEventPress}>
                        <AntDesign name="plus" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabButton} onPress={handleProfilePress}>
                        <AntDesign name="user" size={24} color="black" />
                        <Text>Profile</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                    <Button title="Log Out" onPress={logOut} />
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
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FeedScreen;