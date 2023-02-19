import { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import RewardItem from '../components/RewardItem';
import AppContext from '../store/AppContext';
import { COLORS } from '../styles/Colors';

export default function RewardsScreen({ navigation }) {
  const { cookie } = useContext(AppContext);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topContainer}>
          <Text style={styles.heading}>Summary</Text>
          <View style={styles.squaresContainer}>
            {
              summary.map((o, i) => (
                <View style={styles.square} key={i}>
                  <Text style={styles.price}>{`$${o.savings}`}</Text>
                  <Text style={styles.timeframe}>{o.timeframe}</Text>
                </View>
              ))
            }
          </View>
        </View>

        <Text style={styles.heading}>Redeem history</Text>

        <ScrollView style={styles.container}
          contentContainerStyle={styles.topContainer}
        >
          <RewardItem type='Uber' time='Just now' />
          <RewardItem type='Lyft' time='14d ago' />
          <RewardItem type='Lyft' disabled time='2mo ago' />
          <RewardItem type='Uber' disabled time='3mo ago' />
          <RewardItem type='Uber' disabled time='3mo ago' />
          <RewardItem type='Lyft' disabled time='4mo ago' />
        </ScrollView>
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
  topContainer: {
    paddingVertical: 10,
    width: '100%',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'flex-start' 
  },
  squaresContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 20
  },
  square: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 10, 
  },
  price: {
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.white,
    marginVertical: 20,
  },
  timeframe: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.white,
  }
});

const summary = [
  { savings:"8.10", timeframe:"Feb 11-19" },
  { savings:"49.70", timeframe:"Feb 2023" },
  { savings:"122.80", timeframe:"2023" }
]