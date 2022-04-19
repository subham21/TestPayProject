/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable, useColorScheme} from 'react-native';
import auth from '@react-native-firebase/auth';

const CheckLogin = ({navigation}) => {
  const [userPro, setUserPro] = useState();
  //const [initializing, setInitializing] = useState(true);
  console.log('user1 check ');

  function onAuthStateChanged(user) {
    //console.log('user1 ' + user.id);
    setUserPro(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return isNaN(userPro)
    ? navigation.navigate('Profile')
    : navigation.navigate('Login');
};

export default CheckLogin;
