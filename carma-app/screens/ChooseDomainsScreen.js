import { useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView
} from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import AppContext from '../store/AppContext';
import { post_authorization } from '../api/domain_authorization.js';

const DOMAINS = ["noreply@uber.com", "noreply@lyftmail.com"];

export default function ChooseDomainsScreen({ navigation, route }) {
  const [domains, setDomains] = useState([]);  // String array of the domains
  const [loading, setLoading] = useState(false);

  const { setCookie, promptAsync } = useContext(AppContext);
  async function register() {
    // TODO: IMPLEMENT THIS!!!
    setLoading(true);
    console.log("Set the domains for this user on backend");
    const cookie =   route.params.cookie;
    let data = await post_authorization(cookie, domains);
    setLoading(false);
    setCookie(cookie);

    // Gmail stuff.
    await promptAsync();  // This will automatically populate the googleOauthResponse stuff.
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
          <Button 
            mode='contained' onPress={register} loading={loading}
            labelStyle={{ fontSize: 18 }} contentStyle={styles.btn}
          >
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
    paddingVertical: 7,
  },
  checkboxContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
  }
});