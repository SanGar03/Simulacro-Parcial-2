import React, { useContext, useEffect } from 'react';
import {View,Text,StyleSheet,FlatList,Image,TouchableOpacity,ActivityIndicator,Dimensions,} from 'react-native';
import { PlanetContext } from '../context/PlanetContext';


const { width } = Dimensions.get('window');

const PlanetList = ({ navigation }) => {
  const { planets, loadPlanets, loading } = useContext(PlanetContext);

  useEffect(() => {
    loadPlanets();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (!planets.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No hay planetas disponibles</Text>
      </View>
    );
  }

  const renderPlanet = ({ item }) => (
    <TouchableOpacity
      style={styles.planetContainer}
      onPress={() => navigation.navigate('PlanetDetails', { planet: item })}
    >
      <Image source={{ uri: item.image }} style={styles.planetImage} />
      <Text style={styles.planetName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={planets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderPlanet}
      contentContainerStyle={styles.container}
    />
  );
};

export default PlanetList;
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  planetContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
    padding: width * 0.075,
  },
  planetImage: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 25,
  },
  planetName: {
    fontSize: 20,
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
