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
  const { setCookie, emissionsTotal, emissionsTrips } = useContext(AppContext);
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
          {`${emissionsTotal.toFixed(2)} CO2e kg`}
        </Text>
      </View>
    </View>

    <Text style={styles.pastTrips}>Past trips</Text>

    <ScrollView style={styles.container}
      contentContainerStyle={{width:'100%'}}
      directionalLockEnabled
    >
      {emissionsTrips.map((o, i, a) => (
        <TripItem
          color={COLORS.darkGray}
          carbon={o.emissions.toFixed(2)}
          date={new Date(o.date).toLocaleDateString('en-US', options={day: 'numeric', month: 'short'})}
          time={new Date(o.date).toLocaleTimeString('en-US', options={hour: 'numeric', minute: 'numeric'})}
          type={o.trip_type}
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
