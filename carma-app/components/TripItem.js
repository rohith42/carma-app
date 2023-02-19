import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from '../styles/Colors';


export default function TripItem({ color, carbon, date, time, type, last }) {
  const bottomBorder = {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  }

  return (
    <View style={{width:'100%'}}>
      <View style={[styles.mainContainer, !last && bottomBorder]}>
        <View style={styles.leftContainer}>
          <Svg height="20" width="20" viewBox="0 0 20 20">
            <Circle cx="10" cy="10" r="10" fill={color} />
          </Svg>
          <View style={styles.descriptionContainer}>
            <Text style={styles.time}>
              {`${date} \u2022 ${time}`}
            </Text>
            <Text style={styles.type}>
              {`${type}`}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.carbon, {color:color}]}>
            {`${carbon} kg`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  carbon: {
    fontWeight: 'bold',
    fontSize: 24
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  time: {
    fontWeight: 'bold',
    fontSize: 18
  },
  type: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.darkGray
  },
  descriptionContainer: {
    marginLeft: 10
  }
});