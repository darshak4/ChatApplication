import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const RegistrationScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const onRegister = async () => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const userdata = {
        id: response.user.uid,
        name: name,
        email: email,
        password: password,
      };
      firestore().collection('User').doc(response.user.uid).set(userdata);
      navigation.navigate('LoginScreen');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={[styles.containervire]}>
      <Text style={[styles.loginviewStyle]}></Text>

      <TextInput
        style={[styles.TextInputView]}
        value={name}
        onChangeText={text => {
          setName(text);
        }}
        placeholder="Enter Name"
      />
      <TextInput
        style={styles.TextInputView}
        value={email}
        keyboardType={'email-address'}
        onChangeText={text => {
          setEmail(text);
          //   setEmailError('');
        }}
        placeholder="Enter EMail"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          style={[styles.TextInputView]}
          value={password}
          secureTextEntry={hidePassword}
          onChangeText={text => {
            setPassword(text);
          }}
          placeholder="Enter Password"
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            style={styles.imageView}
            source={
              hidePassword
                ? require('../assets/images/hide.png')
                : require('../assets/images/view.png')
            }
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          console.log('....');
          onRegister();
        }}
        style={styles.buttonview}>
        <Text style={styles.buttonTextView}>Register</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          //   flex: 1,
          justifyContent: 'center',
          marginTop: RFValue(10),
        }}>
        <Text>Alrady have an account?</Text>
        <TouchableOpacity
          style={{marginLeft: RFValue(5)}}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{color: 'blue'}}>Login here</Text>
        </TouchableOpacity>
      </View>

      {/* <Text></Text> */}
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  containervire: {
    flex: RFValue(1),
  },
  loginviewStyle: {
    fontSize: RFValue(15),
    color: 'black',
    alignSelf: 'center',
    marginTop: RFValue(40),
  },
  TextInputView: {
    borderWidth: RFValue(2),
    borderRadius: RFValue(10),
    width: RFPercentage(40),
    alignSelf: 'center',
    height: RFValue(40),
    marginTop: RFValue(20),
    // flex: 1,
    padding: 10,
    borderColor: 'lightblue',
  },
  buttonview: {
    backgroundColor: 'lightblue',
    width: RFValue(80),
    padding: RFValue(10),
    borderRadius: RFValue(15),
    alignSelf: 'center',
    marginTop: RFValue(20),
  },
  buttonTextView: {
    textAlign: 'center',
    fontSize: RFValue(10),
    color: 'black',
  },
  errorTextView: {
    color: 'red',
    fontSize: RFValue(11),
    marginLeft: RFValue(40),
    marginTop: RFValue(5),
  },
  imageView: {
    position: 'absolute',
    height: RFValue(20),
    width: RFValue(20),
    right: RFValue(10),
  },
});
