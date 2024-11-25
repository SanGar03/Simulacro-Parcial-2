import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { DestinoContext } from '../context/DestinoContext';
import { postDestinos } from '../services/api';
import RNPickerSelect from 'react-native-picker-select';

const AddDestino = ({ navigation }) => {
  const [destinoName, setDestinoName] = useState('');
  const [destinoDescription, setDestinoDescription] = useState('');
  const [destinoDifficulty, setDestinoDifficculty] = useState('');
  const [destinoFavourite, setDestinoFavourite] = useState(false)
  const { addDestino, loading } = useContext(DestinoContext);

  const handleSubmit = async () => {
    const newDestino = {
      name: destinoName,
      description: destinoDescription,
      difficulty: destinoDifficulty,
      favourite: destinoFavourite
    };

    try {
      await postDestinos(newDestino.name, newDestino.description,newDestino.difficulty,newDestino.favourite);
      await addDestino(newDestino); 
      navigation.navigate('Destinos');
    } catch (error) {
      console.error('Error al agregar destino:', error);
    }
  };

  const optionsDificultad = [
    { label: 'Facil', value: 'easy' },
    { label: 'Medio', value: 'medium' },
    { label: 'Dificil', value: 'hard' },
  ];

  const optionsFavorito = [
    { label: 'Agregar a Favoritos', value: true },
    { label: 'Quitar de Favoritos', value: false },
  ];

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Destino</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Destino"
        value={destinoName}
        onChangeText={setDestinoName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción del Destino"
        value={destinoDescription}
        onChangeText={setDestinoDescription}
      />
      <RNPickerSelect
        onValueChange={(value) => setDestinoDifficculty(value)}
        items={optionsDificultad}
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecciona una opción...', value: null }}
        value={destinoDifficulty}
      />
      <RNPickerSelect
        onValueChange={(value) => setDestinoFavourite(value)}
        items={optionsFavorito}
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecciona una opción...', value: null }}
        value={destinoFavourite}
      />
      <Button title="Crear Destino" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
};


export default AddDestino;