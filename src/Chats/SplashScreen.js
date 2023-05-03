import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';

const secondEmail =
  Platform.OS === 'android' ? 'Darshak@gmail.com' : 'neel@gmail.com';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [otherUserId, setOtherUserId] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    firestore()
      .collection('User')
      .where('email', '==', secondEmail)
      .get()
      .then(snap => {
        console.log('Other User +-+-+-+', snap.docs[0]._data.id);
        setOtherUserId(snap.docs[0]._data.id);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      auth().onAuthStateChanged(user => {
        const routename = user !== null ? 'ChatScreen' : 'LoginScreen';
        navigation.navigate(routename, {
          uid: auth().currentUser.uid,
          UserId: otherUserId,
        });
        // const isUserLogin =
        //   user !== null
        //     ? navigation.navigate('ChatScreen')
        //     : navigation.navigate('LoginScreen', {
        //         uid: auth().currentUser.uid,
        //         UserId: auth().currentUser.uid,
        //       });
        // console.log(isUserLogin);
      });
    }, 3000);
  }, [getUser]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{width: RFValue(200), height: RFValue(100)}}
        source={require('../assets/images/logo.png')}></Image>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: RFValue(12),
          marginTop: RFValue(10),
        }}>
        SplashScreen
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
