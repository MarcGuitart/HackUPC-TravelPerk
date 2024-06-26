    import React, { useState, useEffect } from 'react';
    import { View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
    import { AntDesign } from '@expo/vector-icons';
    import { supabase } from './src/supabase';
    import Tarjeta from './Tarjeta';

    const FeedScreen = ({ navigation, route  }) => {
        const [plans, setPlans] = useState([]);

        async function fetchPlans() {
            let { data, error } = await supabase.from('PlanTable').select('*');

            if (error) {
                console.error('Error fetching plans:', error.message);
            } else {
                setPlans(data);
            }
        }

        useEffect(() => {
            fetchPlans();
        }, []);

        //Actualitzar les dades quan es torni a la pantalla
        useEffect(() => {
        if (route.params?.refresh) {
            fetchPlans();
          }
        }, [route.params?.refresh]);

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
                alert('The user has already joined this plan.');
                console.log('El usuario ya se ha unido a este plan.');
                return;
            }
            

            const updatedParticipants = [...planData.participant, creatorData[0].username];


            const {data : updatePlanData, error:updateError} = await supabase
            .from ('PlanTable')
            .update({participant: updatedParticipants})
            .eq('planName', planData.planName);

            fetchPlans();            
        
        };

        const handleLeaveEvent = async (planId) => {
            try {
                //Obtener los datos del plan al que el usuario se quiere unir
                const { data: planData, error: planError } = await supabase
                    .from('PlanTable')
                    .select('*')
                    .eq('planName', planId)
                    .single();
        
                if (planError) {
                    throw new Error(planError.message);
                }
        
                //Obtener los datos del usuario actual
                const { data: { user } } = await supabase.auth.getUser();
                const { data: userData, error: userError } = await supabase
                    .from('UserData')
                    .select('*')
                    .eq('id', user.id)
                    .single();
        
                if (userError) {
                    throw new Error(userError.message);
                }
        
                const userAlreadyJoined = planData.participant.includes(userData.username);
        
                if (!userAlreadyJoined) {
                    alert('The user has not joined this plan.');
                    return;
                }
        
                //Filtrar la lista de participantes para excluir al usuario actual
                const updatedParticipants = planData.participant.filter(participant => participant !== userData.username);
        
                //Actualizar los participantes en la base de datos
                const { data: updatedPlanData, error: updateError } = await supabase
                    .from('PlanTable')
                    .update({ participant: updatedParticipants })
                    .eq('planName', planData.planName);
        
                if (updateError) {
                    throw new Error(updateError.message);
                }
        
                
            } catch (error) {
                console.error('Error leaving the event:', error.message);
                alert('Unexpected error while exiting the plan. Please try again later.');
            }
            fetchPlans();   
        };
        return (
            <ImageBackground source={require('./assets/background_pattern.png')} style={styles.backgroundImage}>
                <ScrollView contentContainerStyle={[styles.scrollView, Platform.OS === 'web' && styles.webScrollView]}>
                    <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'white', marginTop: 25, marginBottom:25 }}>Discover and meet people joining unique plans in your area:</Text>
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
                                <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.leaveButton} onPress={() => handleLeaveEvent(plan.planName)}>
                                <Text style={styles.joinButtonText}>Leave</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinEvent(plan.planName)}>
                                    <Text style={styles.joinButtonText}>Join</Text>
                                </TouchableOpacity>
                              
                            </View>                    
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
            alignItems: 'center',
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
            alignItems: 'center',
        },
        webScrollView: {
            height: 400,
            alignItems: 'center',
        },
        cardContainer: {
            
            marginTop: 20,
            width: '100%',
            marginBottom: 10,
            padding: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 10,
        },
        

        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 0,
        },
        joinButton: {
            paddingVertical: 0,
            paddingHorizontal: 10,
            backgroundColor: 'green',
            borderRadius: 5,
        },
        leaveButton: {
            paddingVertical: 0,
            paddingHorizontal: 10,
            backgroundColor: 'red',
            borderRadius: 5,
        },
        joinButtonText: {
            color: 'white',
        },
        
        leaveButton: {
            marginTop: -5,
            paddingVertical: 3.5,
            marginHorizontal:5,
            paddingHorizontal: 5,
            backgroundColor: 'red',
            borderRadius: 5,
            alignSelf: 'flex-end',
        },

        joinButton: {
            marginTop: -5,
            marginHorizontal:5,
            paddingVertical: 3.5,
            paddingHorizontal: 5,
            backgroundColor: 'green',
            borderRadius: 5,
            alignSelf: 'flex-end',
        },
        joinButtonText: {
            color: 'white',
            fontSize: 16,
        },
    });

    export default FeedScreen;
