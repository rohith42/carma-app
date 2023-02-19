import { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';

import AppContext from '../store/AppContext';
import { ProgressChart } from 'react-native-chart-kit';
import { COLORS } from '../styles/Colors';
import TripItem from './TripItem';

export default function Emissions({ navigation }) {
  const { setCookie, emissionsTotal } = useContext(AppContext);
// carbon saved goal
const limit = 20;



return (
  <View style={styles.inner}>
    <View style={styles.chartCard}>
      <View>
        <Text style={styles.chartTitle}>Uber</Text>
        <ProgressChart 
          data={[1, 1, 1, (emissionsTotal/limit)]}
          width={200} height={200} hideLegend
          chartConfig={{
            backgroundGradientFrom: COLORS.lightGray,
            backgroundGradientTo: COLORS.lightGray,
            color: (opacity=1, index) => (
              index === 3 ? `rgba(102, 102, 102, ${opacity})`:
              'rgba(232, 232, 232, 1)'
            )
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.grayText}>
          {`${emissionsTotal} CO2e kg`}
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
          color={COLORS.darkGray}
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
    color: COLORS.darkGray,
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