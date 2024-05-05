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

        const handleJoinEvent = async (planId) => {

            // a planId tinc el planName del plan que t unes
            const { data: planData, error: planError } = await supabase
            .from('PlanTable')
            .select('*')
            .eq('planName', planId)
            .single();

            //planData.participant té els participants d'aquell plan
            
            const { data: { user } } = await supabase.auth.getUser();
            let { data: creatorData, error: creatorError } = await supabase
            .from('UserData')
            .select('*')
            .eq('id', user.id)

            const userAlreadyJoined = planData.participant.includes(creatorData[0].username);

            if (userAlreadyJoined) {
                alert('El usuario ya se ha unido a este plan.');
                console.log('El usuario ya se ha unido a este plan.');
                return;
            }
            
            //console.log(creatorData[0].username);

            //console.log(planData.participant);
            const updatedParticipants = [...planData.participant, creatorData[0].username];

            //console.log(updatedParticipants);

            const {data : updatePlanData, error:updateError} = await supabase
            .from ('PlanTable')
            .update({participant: updatedParticipants})
            .eq('planName', planData.planName);
            
        
        };

        return (
            <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', marginTop: 25, marginBottom:25 }}>Discover and meet people joining unique plans in your area:</Text>
                    <View style={styles.container}>
                        {plans.map((plan, index) => (
                            <View style={styles.cardContainer} key={index}>
                                <Tarjeta
                                    nombre={plan.planName}
                                    descripcion={plan.description}
                                    ciudad={plan.location}
                                    fechaHora={plan.date}
                                    participantes={plan.participant}
                                />
                                <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinEvent(plan.planName)}>
                                <Text style={styles.joinButtonText}>Join</Text>
                            </TouchableOpacity>
                    
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
            paddingVertical: 5,
            paddingHorizontal: 20,
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
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
        },
        scrollView: {
            height: 400, // Establecer una altura fija
            alignItems: 'center', // Centrar los elementos horizontalmente
        },
        cardContainer: {
            
            marginTop: 20,
            width: '100%',
            marginBottom: 10,
            padding: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 10,
        },
        
        joinButton: {
            marginTop: -7,
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: 'green',
            borderRadius: 5,
            alignSelf: 'flex-end',
        },
        joinButtonText: {
            color: 'white',
        },
    });

    export default FeedScreen;
