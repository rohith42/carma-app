import { useState } from 'react';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable, Image
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { COLORS } from '../styles/Colors';
import { signup } from '../api/users.js';


export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");  
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    // TODO: IMPLEMENT THIS!!!
    setLoading(true);
    console.log("Register user and log them in!");
    let data = await signup(email, pass, name);
    console.log(data);
    let cookie = data['token'];
    setLoading(false);
    navigation.navigate('ChooseDomainsScreen', { cookie: cookie });
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
        	<View style={styles.imageContainer}>
            <Image source={require('../assets/CarmaLogo.png')} />
          </View>
          <TextInput 
            mode='outlined' label='Name'
            placeholder='Full name' 
            value={name} onChangeText={setName}
						outlineColor={COLORS.gray}
          />
          <View style={styles.spacing} />
          <TextInput 
            mode='outlined' label='Email'
            placeholder='example.email@gmail.com' 
            value={email} onChangeText={setEmail}
						outlineColor={COLORS.gray}
            keyboardType='email-address'
          />
          <Text style={styles.reminder}>
            Please enter the email where you get your receipts
          </Text>
          <TextInput 
            mode='outlined' label='Password'
            value={pass} onChangeText={setPass}
            secureTextEntry outlineColor={COLORS.gray}
          />
          <View style={styles.btnContainer} >
            <Button mode='contained' onPress={register}>
              Sign up
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    paddingHorizontal: 15,
    paddingVertical: 10,
		paddingBottom: 150,
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  btnContainer: {
    width: '70%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  signup:{
    fontWeight: "100",
    textDecorationLine: 'underline'
  },
  reminder: {
    fontSize: 14,
    color: COLORS.green,
    marginVertical: 5,
  },
  spacing: {
    width: '100%',
    height: 5
  },
	imageContainer: {
    width: '100%',
		marginTop: 15,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});