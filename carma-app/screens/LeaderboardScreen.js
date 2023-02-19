import { useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView
} from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import AppContext from '../store/AppContext';

export default function LeaderboardScreen({ navigation }) {
  const { cookie } = useContext(AppContext);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text>This is the leaderboard screen</Text>
      </View>
    </SafeAreaView>
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
});