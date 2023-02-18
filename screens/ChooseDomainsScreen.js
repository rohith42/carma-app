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
import { TextInput, Button } from 'react-native-paper';

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
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.prompt}>
          Please select which email domains to scan for 
          to get your carbon footprint
        </Text>
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
    alignItems: 'center'
  },
  prompt: {
    fontSize: 36,
    marginBottom: 48,
  },
  btnContainer: {
    width: '70%',
    alignSelf: 'center',
    marginVertical: 20,
  },
});