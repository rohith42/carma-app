import { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';

import { Checkbox, Button } from 'react-native-paper';
import AppContext from '../store/AppContext';
import { ProgressChart } from 'react-native-chart-kit';
import { COLORS } from '../styles/Colors';
import TripItem from './TripItem';


export default function Savings({ navigation }) {
  const { setCookie, savingTotal } = useContext(AppContext);
  // carbon saved goal
  const goal = 20.0;
  

  
  return (
    <View style={styles.inner}>
      <View style={styles.chartCard}>
        <View>
          <Text style={styles.chartTitle}>Uber</Text>
          <ProgressChart 
            data={[1, 1, 1, (savingTotal/goal)]}
            width={200} height={200} hideLegend
            chartConfig={{
              backgroundGradientFrom: COLORS.lightGray,
              backgroundGradientTo: COLORS.lightGray,
              color: (opacity=1, index) => (
                index === 3 ? `rgba(93, 176, 117, ${opacity})`:
                'rgba(232, 232, 232, 1)'
              )
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.greenText}>
            {`${savingTotal} kg CO2e`}
          </Text>
          <Text style={styles.grayText}>
            {`${goal-savingTotal} kg remaining`}
          </Text>
        </View>
      </View>

      <Text style={styles.pastTrips}>Past trips</Text>

      <ScrollView style={styles.container}
        contentContainerStyle={{width:'100%'}}
        directionalLockEnabled
      >
        {dummyData.map((o, i, a) => (
          <TripItem
            color={COLORS.green}
            carbon={o.carbon}
            date={o.date}
            time={o.time}
            type={o.type}
            last={i === a.length-1}
            key={i}
          />
        ))}
      </ScrollView>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  chartCard: {
    padding: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
    flexDirection: 'row'
  },
  chartTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    color: COLORS.green,
    marginVertical: 5,
  },
  grayText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.gray,
    marginVertical: 5,
  },
  pastTrips: {
    fontWeight: 'bold',
    fontSize: 24,
    width: '100%',
    marginTop: 20,
    marginBottom: 10
  }
});


const dummyData = [
  { carbon: 23.4, date: "Jan 12", time: "3:12 PM", type: "Uber X" },
  { carbon: 15.6, date: "Jan 12", time: "3:12 PM", type: "Uber X" },
  { carbon: 17.3, date: "Jan 14", time: "3:12 PM", type: "Uber X" },
  { carbon: 12.9, date: "Jan 17", time: "3:12 PM", type: "Uber X" },
  { carbon: 9.7, date: "Jan 25", time: "3:12 PM", type: "Uber X" },
  { carbon: 14.2, date: "Feb 1", time: "3:12 PM", type: "Uber X" },
  { carbon: 8.6, date: "Feb 14", time: "3:12 PM", type: "Uber X" },
  { carbon: 5.1, date: "Feb 19", time: "3:12 PM", type: "Uber X" },
]