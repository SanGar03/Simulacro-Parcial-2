import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PlanetList from './components/PlanetList';
import PlanetDetails from './components/PlanetDetails';
import Settings from './components/Settings'; 
import { Ionicons } from '@expo/vector-icons'; 
import AddPlanet from './components/AddPlanet';
import { PlanetProvider } from './context/PlanetContext';
import EditPlanet from './components/EditPlanet';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const PlanetStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PlanetList"
      component={PlanetList}
      options={{ title: 'Lista de Planetas' }}
    />
    <Stack.Screen
      name="PlanetDetails"
      component={PlanetDetails}
      options={{ title: 'Detalles del Planeta' }}
    />
    <Stack.Screen
      name="EditPlanet"
      component={EditPlanet}
      options={{ title: 'Editar Planeta' }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <PlanetProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Planetas') {
                iconName = 'planet'; 
              } else if (route.name === 'Configuración') {
                iconName = 'settings'; 
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Planetas" component={PlanetStack} />
          <Tab.Screen name="Configuración" component={Settings} />
          <Tab.Screen
            name="Crear Planeta"
            component={AddPlanet}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PlanetProvider>
  );
}
