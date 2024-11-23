import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: 'Opción 1', value: 'option1' },
    { label: 'Opción 2', value: 'option2' },
    { label: 'Opción 3', value: 'option3' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>
      <Text style={styles.label}>Selecciona una opción:</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedOption(value)}
        items={options}
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecciona una opción...', value: null }}
        value={selectedOption}
      />
      {selectedOption && (
        <Text style={styles.selectedText}>
          Has seleccionado: {selectedOption}
        </Text>
      )}
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
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

export default Settings;