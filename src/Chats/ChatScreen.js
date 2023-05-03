import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {Bubble, GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

import {CommonStyles} from '../CommonStyle';

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  console.log('Route: ', route.params);
  const myid = route.params.uid;
  const UserId = route.params.UserId;
  console.log('myid+-+-+-+', myid);
  console.log('UserId+-+-+-', UserId);

  useEffect(() => {
    const querySnapshot = firestore()
      .collection('chats')
      .doc('123456789')
      .collection('Message')
      .orderBy('createdAt', 'desc');
    querySnapshot.onSnapshot(snapshot => {
      const allMessage = snapshot.docs.map(snap => {
        // console.log('Date+-+-+-', new Date(snap.data().createdAt.toDate()));
        return {
          ...snap.data(),
          createdAt: snap.data().createdAt.toDate(),
        };
      });
      console.log('Allmesages+-+-+-', allMessage.length);
      setMessages(allMessage);
    });
  }, []);

  const onSend = messages => {
    console.log('MessageArray+-+-+-+-+--', messages);
    const msg = messages[0];
    const mymsg = {
      ...msg,
      senderId: myid,
      receiverId: UserId,
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    firestore()
      .collection('chats')
      .doc('123456789')
      .collection('Message')
      .add({
        ...mymsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
        // createdAt: firestore.FieldValue.serverTimestamp(),
      });
  };
  return (
    <SafeAreaView
      style={[
        {flex: 1, backgroundColor: 'white'},
        CommonStyles.verticalPadding,
      ]}>
      <GiftedChat
        // backgroundColor="black"
        // timeTextStyle={{backgroundColor: 'black'}}
        messages={messages}
        // showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: myid,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'skyblue',
                  padding: RFValue(2),
                  // width: RFValue(100),
                },
                left: {
                  backgroundColor: 'orange',
                  padding: RFValue(2),
                  // right: RFValue(20),

                  // margin: 10,
                },
              }}
              textStyle={{
                right: {
                  color: 'black',
                },
                left: {
                  color: 'white',
                },
              }}
              timeTextStyle={{
                right: {
                  color: 'black',
                },
                left: {
                  color: 'white',
                },
              }}
            />
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                backgroundColor: '#f0f0f0',
                borderTopColor: '#e0e0e0',
                borderTopWidth: 1,
                borderRadius: RFValue(10),
                // width: RFValue(290),
                alignItems: 'center',
              }}
              primaryStyle={{
                alignSelf: 'center',
                backgroundColor: '#f0f0f0',
                // height: 30,
                // center the input toolbar items
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
