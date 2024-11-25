import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { DestinoContext } from '../context/DestinoContext';
import { updateDestinos } from '../services/api';
import RNPickerSelect from 'react-native-picker-select';

const EditDestino = ({ route, navigation }) => {
  const { destino } = route.params;
  const { updateDestino: updateDestinoContext } = useContext(DestinoContext);

  const [name, setName] = useState(destino.name || '');
  const [description, setDescription] = useState(destino.description || '');
  const [difficulty,setDifficulty] = useState(destino.difficulty || 'easy');
  const [favourite, setFavourite] = useState(destino.Favourite || false);

  const optionsDificultad = [
    { label: 'Facil', value: 'easy' },
    { label: 'Medio', value: 'medium' },
    { label: 'Dificil', value: 'hard' },
  ];

  const optionsFavorito = [
    { label: 'Agregar a Favoritos', value: true },
    { label: 'Quitar de Favoritos', value: false },
  ];

  const handleSave = async () => {
    const updatedData = {
      name,
      description,
      difficulty,
      favourite
    };

    try {
      await updateDestinos(destino.id, updatedData); 
      updateDestinoContext(destino.id, updatedData); 
      navigation.navigate('DestinoDetails', { destino: updatedData });
    } catch (error) {
      console.error('Error al actualizar el destino:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del destino"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <RNPickerSelect
        onValueChange={(value) => setDifficulty(value)}
        items={optionsDificultad}
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecciona una opción...', value: null }}
        value={difficulty}
      />
      <RNPickerSelect
        onValueChange={(value) => setFavourite(value)}
        items={optionsFavorito}
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecciona una opción...', value: null }}
        value={favourite}
      />
      <Button title="Guardar cambios" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
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

export default EditDestino;
