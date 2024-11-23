import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { PlanetContext } from '../context/PlanetContext';
import { postPlanets } from '../services/api';

const AddPlanet = ({ navigation }) => {
  const [planetName, setPlanetName] = useState('');
  const [planetImage, setPlanetImage] = useState('');
  const [planetDescription, setPlanetDescription] = useState('');
  const [moonAmount, setMoonAmount] = useState('');
  const [moonNames, setMoonNames] = useState('');
  const { addPlanet, loading } = useContext(PlanetContext);

  const handleSubmit = async () => {
    const moonList = moonNames.split(',');
    const newPlanet = {
      name: planetName,
      description: planetDescription,
      moons: parseInt(moonAmount),
      moon_names: moonList,
      image: planetImage,
    };

    try {
      await postPlanets(newPlanet.name, newPlanet.description, newPlanet.moons, newPlanet.moon_names, newPlanet.image);
      await addPlanet(newPlanet); 
      navigation.navigate('Planetas');
    } catch (error) {
      console.error('Error al agregar planeta:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Planeta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Planeta"
        value={planetName}
        onChangeText={setPlanetName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción del Planeta"
        value={planetDescription}
        onChangeText={setPlanetDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad de Lunas (numérico)"
        value={moonAmount}
        onChangeText={setMoonAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombres de las lunas (separados por comas)"
        value={moonNames}
        onChangeText={setMoonNames}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la Imagen"
        value={planetImage}
        onChangeText={setPlanetImage}
      />
      <Button title="Crear Planeta" onPress={handleSubmit} />
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

export default AddPlanet;