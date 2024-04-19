import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Micomponent = ({ sensorData, minRadiacion }) => {
  // Calcula los umbrales de radiación basados en la radiación mínima
  const min = minRadiacion / 4;
  const datAlt = minRadiacion - min;
  const datMed = minRadiacion - (2 * min);

  // Realiza las validaciones basadas en los datos del sensor y la radiación mínima
  if (sensorData >= minRadiacion) {
    return (
      <View style={styles.imageContainer}>
        <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
          <Text style={styles.texto}>No puedes salir hoy</Text>
          <Image source={require('./assets/no_salir.png')} style={styles.imagen} />
        </View>
      </View>
    );
  } else if (sensorData <= datAlt) {
    return (
      <View style={styles.imageContainer}>
        <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
          <Text style={styles.texto}>Aplica bloqueador solar</Text>
          <Image source={require('./assets/crema_solar.png')} style={styles.imagen} />
        </View>
        <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
          <Text style={styles.texto}>Utiliza sombrilla</Text>
          <Image source={require('./assets/sombrilla.png')} style={styles.imagen} />
        </View>
        <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
          <Text style={styles.texto}>Demasiado sol</Text>
          <Image source={require('./assets/sudor.png')} style={styles.imagen} />
        </View>
        <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
          <Text style={styles.texto}>Usa manga larga</Text>
          <Image source={require('./assets/mangalarga.jpeg')} style={styles.imagen} />
        </View>
      </View>
    );
  } else if (sensorData <= datMed) {
    return (
      <View style={styles.imageContainer}>
        <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
          <Text style={styles.texto}>Aplica bloqueador solar</Text>
          <Image source={require('./assets/crema_solar.png')} style={styles.imagen} />
        </View>
        <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
          <Text style={styles.texto}>Usa gorra para el sol</Text>
          <Image source={require('./assets/gorrasol.png')} style={styles.imagen} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.imageContainer}>
        <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
          <Text style={styles.texto}>Despejado, puedes salir hoy</Text>
          <Image source={require('./assets/salir.png')} style={styles.imagen} />
        </View>
        <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
          <Text style={styles.texto}>Usa gorra para el sol</Text>
          <Image source={require('./assets/gorrasol.png')} style={styles.imagen} />
        </View>
      </View>
    );
  }
};



export default Micomponent;
