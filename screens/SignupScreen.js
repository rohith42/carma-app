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
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';


export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");  
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  function register() {
    // TODO: IMPLEMENT THIS!!!
    console.log("Register user!");
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <TextInput 
            mode='outlined' label='Name'
            placeholder='Full name' 
            value={name} onChangeText={setName}
          />
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
  }
});