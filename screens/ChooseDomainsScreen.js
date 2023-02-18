import { useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
    SafeAreaView
} from 'react-native';
import { Checkbox, Button } from 'react-native-paper';

const DOMAINS = ["no-reply@uber.com", "no-reply@lyftmail.com"];

export default function ChooseDomainsScreen({ navigation }) {
  const [domains, setDomains] = useState([]);  // String array of the domains
  const [loading, setLoading] = useState(false);

  function register() {
    // TODO: IMPLEMENT THIS!!!
    setLoading(true);
    console.log("Register user!");
    setLoading(false);
  }

  function handlePress(e) {
    const label = e._dispatchInstances.memoizedProps.accessibilityLabel // string
    if (domains.includes(label)) {
      // domain is selected -> unselect domain
      setDomains((prev) => {
        const newDomains = prev.filter((d) => d !== label);
        console.log(newDomains);
        return newDomains;
      });
    } else {
      setDomains((prev) => {
        const newDomains = [...prev, label];
        console.log(newDomains);
        return newDomains;
      });
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.fullWidth}>
          <Text style={styles.prompt}>
            Please select which email domains to scan for 
            to get your carbon footprint
          </Text>
          {
            DOMAINS.map((d, i) => (
              <Checkbox.Item 
                style={styles.checkboxContainer}
                label={d} key={i}
                status={domains.includes(d) ? 'checked' : 'unchecked'}
                onPress={handlePress}
              />
            ))
          }
        </View>
        <View style={styles.fullWidth}>
          <Button mode='contained' onPress={register} loading={loading}>
            Continue
          </Button>
        </View>
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
    justifyContent: 'space-between'
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
    width: '70%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  checkboxContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  }
});