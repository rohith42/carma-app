import { useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView
} from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import AppContext from '../store/AppContext';
import SwitchSelector from "react-native-switch-selector";
import Emissions from '../components/Emissions';
import Savings from '../components/Savings';
import { COLORS } from '../styles/Colors';

const SWITCH_OPTIONS = [
    { label: "Savings", value: "savings" },
    { label: "Emissions", value: "emissions" }
];

export default function InsightsScreen({ navigation }) {
  const { cookie } = useContext(AppContext);
  const [state, setState] = useState("");
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.switchcontainer}>
          <SwitchSelector 
            options={SWITCH_OPTIONS}
            initial={0}
            onPress={setState}
            textColor={COLORS.gray}
            selectedColor={COLORS.green}
            buttonColor={COLORS.white}
            borderColor={COLORS.gray}
            backgroundColor={COLORS.lightGray}
            height={50} fontSize={17}
            hasPadding bold
          />
        </View>
        {state === 'emissions' && <Emissions />}
        {state !== 'emissions' && <Savings />}
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
  switchcontainer: {
    width: '100%',
    marginVertical: 20,
  }
});