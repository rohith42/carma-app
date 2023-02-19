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
  const { setCookie } = useContext(AppContext);
// How many kg carbon saved
const [progress, setProgress] = useState(5.0);
// carbon saved goal
const goal = 20.0;



return (
  <View style={styles.inner}>
    <View style={styles.chartCard}>
      <View>
        <Text style={styles.chartTitle}>Uber</Text>
        <ProgressChart 
          data={[1, 1, 1, (progress/goal)]}
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
        <Text style={styles.greenText}>
          {`${progress} kg CO2e`}
        </Text>
        <Text style={styles.grayText}>
          {`${goal-progress} kg remaining`}
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