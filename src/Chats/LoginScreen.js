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
import React, {useEffect, useState} from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {StackActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Platform} from 'react-native';
const secondEmail =
  Platform.OS === 'android' ? 'Darshak@gmail.com' : 'neel@gmail.com';

const LoginScreen = ({route}) => {
  console.log('Route: ', route);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otherUserId, setOtherUserId] = useState(null);

  const [hidePassword, setHidePassword] = useState(true);

  const navigation = useNavigation();
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const LoginData = async () => {
    firestore()
      .collection('User')
      .where('email', '==', secondEmail)
      .get()
      .then(querysnapShort => {
        console.log(
          querysnapShort.docs[0]._data.email +
            '' +
            querysnapShort.docs[0]._data.pasword,
        );

        if (querysnapShort.docs.length > 0) {
          if (
            querysnapShort.docs[0]._data.email === email &&
            querysnapShort.docs[0]._data.password === password
          ) {
            Alert.alert('Login Success Full');
            navigation.navigate('ChatScreen', {
              uid: auth().currentUser.uid,
              UserId: otherUserId,
            });
          } else {
            Alert.alert('please valid Email & Password');
          }
        }
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: RFValue(1),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={[styles.loginviewStyle]}></Text>
      <TextInput
        style={[styles.TextInputView]}
        value={email}
        keyboardType={'email-address'}
        onChangeText={text => {
          setEmail(text);
        }}
        placeholder="Enter Mail"
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
          LoginData();
        }}
        style={styles.buttonview}>
        <Text style={styles.buttonTextView}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          // flex: 1,
          // justifyContent: 'center',
          marginTop: RFValue(10),
        }}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          style={{marginLeft: RFValue(5)}}
          onPress={() => navigation.navigate('RegistrationScreen')}>
          <Text style={{color: 'blue', textAlign: 'center'}}>
            Registraion here
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  containervire: {
    flex: RFValue(1),
  },
  loginviewStyle: {
    fontSize: RFValue(15),
    color: 'black',
    alignSelf: 'center',
    marginTop: RFValue(40),
    fontWeight: 'bold',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  TextInputView: {
    borderWidth: RFValue(2),
    borderRadius: RFValue(10),
    width: RFPercentage(40),
    alignSelf: 'center',
    height: RFValue(40),
    marginTop: RFValue(15),

    borderColor: 'lightblue',
  },
  buttonview: {
    backgroundColor: 'lightblue',
    width: RFValue(90),
    padding: RFValue(10),
    borderRadius: RFValue(15),
    alignSelf: 'center',
    marginTop: RFValue(20),
  },
  buttonTextView: {
    textAlign: 'center',
    fontSize: RFValue(11),
    color: 'black',
    // fontFamily: font.PoppinsBlack,
    // alignSelf: 'center',
  },
  goolebuttonView: {
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    width: RFValue(150),
    padding: RFValue(10),
    borderRadius: RFValue(15),
    alignSelf: 'center',
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  errorTextView: {
    color: 'red',
    fontSize: RFValue(11),
    marginLeft: RFValue(40),
    marginTop: RFValue(5),
  },
  imageView: {
    height: RFValue(20),
    width: RFValue(20),
    position: 'absolute',
    right: RFValue(10),
  },
});
