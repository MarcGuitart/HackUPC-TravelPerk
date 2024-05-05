import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Tarjeta = ({ nombre, descripcion, ciudad, fechaHora, participantes }) => {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.titulo}>{nombre}</Text>
      <Text style={styles.texto}>{descripcion}</Text>
      <View style={styles.infoContainer}>
        <Feather name="map-pin" size={16} color="#888" style={styles.icono} />
        <Text style={styles.texto}>Ciudad: {ciudad}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Feather name="calendar" size={16} color="#888" style={styles.icono} />
        <Text style={styles.texto}>Fecha y Hora: {fechaHora.replace('T', ' ').slice(0, -3) + 'h'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Feather name="users" size={16} color="#888" style={styles.icono} />
        <Text style={styles.texto}>
          Participantes: {Array.isArray(participantes) ? participantes.join(', ') : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icono: {
    marginRight: 5,
  },
  
});

export default Tarjeta;
