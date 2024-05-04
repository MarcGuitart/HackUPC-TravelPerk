import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importamos los íconos de Ant Design
import { supabase } from './src/supabase';
import Tarjeta from './Tarjeta';

const FeedScreen = ({ navigation }) => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        async function fetchPlans() {
            let { data, error } = await supabase.from('PlanTable').select('*');

            if (error) {
                console.error('Error fetching plans:', error.message);
            } else {
                setPlans(data);
            }
        }

        fetchPlans();
    }, []);

    const handleSearchPress = () => {
        navigation.navigate('Search');
    };

    const handleAddEventPress = () => {
        navigation.navigate('Event');
    };

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    return (
        <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    {plans.map((plan, index) => (
                        <View style={styles.cardContainer} key={index}>
                            <Tarjeta
                                nombre={plan.planName}
                                descripcion={plan.description}
                                ciudad={plan.location}
                                fechaHora={plan.date}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
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
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', // Centrar los elementos horizontalmente
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
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
    scrollView: {
        height: 400, // Establecer una altura fija
        alignItems: 'center', // Centrar los elementos horizontalmente
    },
    cardContainer: {
        width: '100%',
        marginBottom: 20,
    },
});

export default FeedScreen;
