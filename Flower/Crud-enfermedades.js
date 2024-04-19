import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Picker } from '@react-native-picker/picker';

const EnfermedadesView = ({ route, navigation }) => {
    const { userId } = useContext(UserContext);
    const [enfermedadesUsuario, setEnfermedadesUsuario] = useState([]);
    const [enfermedadesDisponibles, setEnfermedadesDisponibles] = useState([]);
    const [selectedEnfermedad, setSelectedEnfermedad] = useState('');

    useEffect(() => {
        obtenerEnfermedadesUsuario();
        obtenerEnfermedadesDisponibles();
    }, []);

    const obtenerEnfermedadesUsuario = async () => {
        try {
            const response = await axios.get(`http://192.168.0.9:8080/usuarios/${userId}/enfermedades`);
            setEnfermedadesUsuario(response.data);
        } catch (error) {
            console.error('Error al obtener las enfermedades del usuario:', error);
        }
    };

    const obtenerEnfermedadesDisponibles = async () => {
        try {
            const response = await axios.get('http://192.168.0.9:8080/enfermedades');
            // Filtrar las enfermedades disponibles para excluir aquellas que ya ha asignado el usuario
            const enfermedadesDisponiblesFiltradas = response.data.filter(enfermedad => !enfermedadesUsuario.some(enfUsuario => enfUsuario.id === enfermedad.id));
            setEnfermedadesDisponibles(enfermedadesDisponiblesFiltradas);
        } catch (error) {
            console.error('Error al obtener las enfermedades disponibles:', error);
        }
    };

    const handleAgregarEnfermedad = async () => {
        try {
            // Verificar si se ha seleccionado una enfermedad
            if (!selectedEnfermedad) {
                Alert.alert('Error', 'Por favor seleccione una enfermedad.');
                return;
            }

            // Enviar la solicitud para agregar la enfermedad seleccionada al usuario
            const response = await axios.post('http://192.168.0.9:8080/usuarios/enfermedad', {
                id_usuario: userId,
                id_enfermedad: selectedEnfermedad,
            });

            // Actualizar la lista de enfermedades del usuario
            obtenerEnfermedadesUsuario();

            // Actualizar la lista de enfermedades disponibles
            obtenerEnfermedadesDisponibles();

            // Mostrar un mensaje de éxito
            Alert.alert('Éxito', 'La enfermedad se ha agregado correctamente.');
        } catch (error) {
            console.error('Error al agregar la enfermedad:', error.message);
            // Mostrar un mensaje de error si ocurre algún problema
            Alert.alert('Error', 'No se ha podido agregar la enfermedad. Por favor, inténtelo de nuevo.');
        }
    };


    const handleEliminarEnfermedad = async (id_enfermedad) => {
        try {
            // Realizar la solicitud para eliminar la enfermedad del usuario
            const response = await axios.delete(`http://192.168.0.9:8080/usuarios/${userId}/enfermedades/${id_enfermedad}`);
    
            // Actualizar la lista de enfermedades del usuario
            obtenerEnfermedadesUsuario();
            
            // Actualizar la lista de enfermedades disponibles
            obtenerEnfermedadesDisponibles();
    
            // Mostrar un mensaje de éxito
            Alert.alert('Éxito', 'La enfermedad se ha eliminado correctamente.');
        } catch (error) {
            console.error('Error al eliminar la enfermedad:', error.message);
            // Mostrar un mensaje de error si ocurre algún problema
            Alert.alert('Error', 'No se ha podido eliminar la enfermedad. Por favor, inténtelo de nuevo.');
        }
    };

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enfermedades del Usuario</Text>
            <Image source={require('./assets/enfermera.jpeg')} style={styles.imagen} />
            <FlatList
                data={enfermedadesUsuario}
                renderItem={({ item }) => (
                    <View style={styles.enfermedadItem}>
                        <Text>{item.nombre}</Text>
                        <TouchableOpacity
                            style={styles.eliminarButton}
                            onPress={() => handleEliminarEnfermedad(item.id)}
                        >
                            <Text style={styles.eliminar}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <Text style={styles.subTitle}>Agregar nueva enfermedad</Text>
            <Picker
                selectedValue={selectedEnfermedad}
                onValueChange={(itemValue, itemIndex) => setSelectedEnfermedad(itemValue)}
            >
                <Picker.Item label="Seleccione una enfermedad..." value="" />
                {enfermedadesDisponibles.map(enfermedad => (
                    <Picker.Item key={enfermedad.id} label={enfermedad.nombre} value={enfermedad.id} />
                ))}
            </Picker>
            <View style={styles.buttonContainer}>
                <Button title="Agregar Enfermedad" onPress={handleAgregarEnfermedad} color="#f0c26d" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: 'black',
    },
    enfermedadItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    eliminarButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
    },
    eliminar: {
        color: 'white',
        fontWeight: 'bold',
    },
    imagen: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 6,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default EnfermedadesView;
