import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { COLORS } from '../styles/Colors';

const windowWidth = Dimensions.get('window').width;
const uberLogo = <Image source={require('../assets/UberLogo.png')} />
const lyftLogo = <Image source={require('../assets/LyftLogo.png')} />


export default function RewardItem({ type, disabled, time }) {
  const disabledStyle = { 
    backgroundColor: COLORS.lightGray,
  }

  return (
    <View style={[styles.mainContainer, disabled && disabledStyle]}>
      <View style={styles.imageContainer}>
        {type === 'Lyft' ? lyftLogo : uberLogo}
      </View>
      <View style={styles.right}>
        <View style={styles.header}>
          <Text style={styles.title}>5% Discount on next ride</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={{ fontSize: 16 }}>
          {
            disabled ? 
            `Your discount for ${type} has already been redeemed.` :
            `Click here to go to the ${type} app to redeem your discount.`
          }
        </Text>
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
    paddingVertical: 15,
  },
  imageContainer: {
    marginRight: 10
  },
  right: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  time: {
    fontSize: 16,
    color: COLORS.gray
  }
});