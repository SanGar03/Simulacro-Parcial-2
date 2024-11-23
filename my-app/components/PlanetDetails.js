import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image,Dimensions,FlatList } from 'react-native';
import DeletePlanet from './DeletePlanet';
const { width } = Dimensions.get('window');

const PlanetDetails = ({ route, navigation }) => {
  const { planet:initialPlanet } = route.params; 
  const [planet, setPlanet] = useState(initialPlanet); 

  useEffect(() => {
    setPlanet(initialPlanet);
  }, [initialPlanet]);

  if (!planet) {
    return <Text>Planeta no encontrado.</Text>;
  }
  const handleDeleteSuccess = () => {
    navigation.goBack();
  };

  const handleDeleteError = (error) => {
    Alert.alert('Error', 'No se pudo eliminar el planeta. Intenta nuevamente.');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: planet.image }} style={styles.planetImage} />
      <Text style={styles.name}>{planet.planetName}</Text>
      <Text style={styles.description}>{planet.planetDescription}</Text>
      <Text style={styles.moonCount}>Cantidad de lunas: {planet.moons}</Text>
      {planet.moon_names && planet.moon_names.length > 0 ? (
        <>
          <Text style={styles.moonTitle}>Nombres de las lunas:</Text>
          <FlatList
            data={planet.moon_names}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.moonName}>• {item}</Text>
            )}
            style={styles.moonList}
          />
        </>
      ) : (
        <Text style={styles.noMoons}>Este planeta no tiene lunas.</Text>
      )}
      <Button
        title="Editar"
        onPress={() => navigation.navigate('EditPlanet', { planet })}
      />
      <DeletePlanet
        planetId={planet.id}
        planetName={planet.name}
        onDeleteSuccess={handleDeleteSuccess}
        onDeleteError={handleDeleteError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  planetImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    marginBottom: 20,
  },
  planetName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  planetDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  moonCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  moonList: {
    width: '100%',
  },
  moonName: {
    fontSize: 16,
    marginBottom: 5,
  },
  noMoons: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
    marginTop: 10,
  },
});

export default PlanetDetails;