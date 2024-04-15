import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
    }, 5000); // 5000 milisegundos = 5 segundos

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []);

  return (
    <View style={styles.container}>
     <Image
        source={require('./sunflower.gif')} 
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.title}>Flower Shield</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 30,
    color: '#333',
  },
});

export default HomeScreen;
