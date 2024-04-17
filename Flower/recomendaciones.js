import React from 'react';
import { View, Text, Image } from 'react-native';

const Micomponent = () => (
  <View style={styles.imageContainer}>
    {/* Peligro */}
    <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
      <Text style={styles.texto}>No puedes salir hoy</Text>
      <Image source={require('./assets/no_salir.png')} style={styles.imagen} />
    </View>
    
    {/* Mayor */}
    <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
      <Text style={styles.texto}>Demasiado sol</Text>
      <Image source={require('./assets/sudor.png')} style={styles.imagen} />
    </View>
    
    {/* Medio */}
    <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
      <Text style={styles.texto}>Aplica bloqueador solar</Text>
      <Image source={require('./assets/crema_solar.png')} style={styles.imagen} />
    </View>
    <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
      <Text style={styles.texto}>Usa gorra para el sol</Text>
      <Image source={require('./assets/gorrasol.png')} style={styles.imagen} />
    </View>
    <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
      <Text style={styles.texto}>Utiliza sombrilla</Text>
      <Image source={require('./assets/sombrilla.png')} style={styles.imagen} />
    </View>
    
    {/* Nada */}
    <View style={[styles.imageBackground, { backgroundColor: 'white' }]}>
      <Text style={styles.texto}>Despejado, puedes salir hoy</Text>
      <Image source={require('./assets/salir.png')} style={styles.imagen} />
    </View>
  </View>
);

export default Micomponent;
