import { useContext, useState } from 'react';
import AppContext from '../store/AppContext';
import { login } from '../api/users.js';
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
import Spinner from 'react-native-loading-spinner-overlay';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");  
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCookie } = useContext(AppContext);

  async function login_button() {
    setLoading(true);
    console.log("Login user!");
    console.log(email);
    console.log(pass);
    let data = await login(email, pass);
    let token = data['token'];
    console.log("TESTTTTTTT");
    console.log(token);
    setCookie(token);
    setLoading(false);
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
            mode='outlined' label='Email'
            placeholder='example.email@gmail.com' 
            value={email} onChangeText={setEmail}
            keyboardType='email-address'
          />
          <TextInput 
            mode='outlined' label='Password'
            value={pass} onChangeText={setPass}
            secureTextEntry
          />
          <View style={styles.btnContainer} >
            <Button mode='contained' onPress={login_button} loading={loading}>
              Log in
            </Button>
          </View>
          <Pressable onPress={() => {navigation.navigate("SignupScreen")}} >
            <Text style={styles.signup}>
              Don't have an account?
            </Text>
          </Pressable>
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
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});