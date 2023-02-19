import { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import AppContext from '../store/AppContext';

export default function Emissions({ navigation }) {
  const { setCookie } = useContext(AppContext);

  
  return (
    <View style={styles.inner}>
      <Text>This is the Emissions component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%'
  },  
  prompt: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  btn: {
    paddingVertical: 7,
  },
  checkboxContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  }
});