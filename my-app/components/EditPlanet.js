import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { PlanetContext } from '../context/PlanetContext';
import { updatePlanet } from '../services/api';

const EditPlanet = ({ route, navigation }) => {
  const { planet } = route.params;
  const { updatePlanet: updatePlanetContext } = useContext(PlanetContext);

  const [name, setName] = useState(planet.name || '');
  const [description, setDescription] = useState(planet.description || '');
  const [moons, setMoons] = useState(planet.moons !== undefined ? planet.moons.toString() : '0');
  const [moonNames, setMoonNames] = useState(Array.isArray(planet.moon_names) ? planet.moon_names.join(',') : '');
  const [image, setImage] = useState(planet.image || '');

  const handleSave = async () => {
    const updatedData = {
      name,
      description,
      moons: parseInt(moons),
      moon_names: moonNames.split(','),
      image,
    };

    try {
      await updatePlanet(planet.id, updatedData); 
      updatePlanetContext(planet.id, updatedData); 
      navigation.navigate('PlanetDetails', { planet: updatedData });
    } catch (error) {
      console.error('Error al actualizar el planeta:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Planeta"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad de lunas"
        value={moons}
        onChangeText={setMoons}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombres de las lunas"
        value={moonNames}
        onChangeText={setMoonNames}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={image}
        onChangeText={setImage}
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

export default EditPlanet;
