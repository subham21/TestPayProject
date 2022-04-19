/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable, useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colours} from '../theme/colour';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TabBar = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const setColorBag = isDarkMode
    ? colours.lightAppBackGround
    : colours.darkAppBackGround;
  const iconSize = 26;
  const [userPro, setUserPro] = useState();

  console.log('user1 check ');

  function onAuthStateChanged(user) {
    //console.log('user1 ' + user.id);
    setUserPro(user);
    saveUserData(user);
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log('go back');
    }
  }

  const saveUserData = async userDatas => {
    const userData = JSON.stringify(userDatas);
    if (userDatas === null) {
      console.log('userNull ' + userData);
    } else {
      await AsyncStorage.setItem('@userLogin', userData);
    }
  };

  const getuser = async () => {
    const userDocument = await firestore()
      .collection('TeryProductsTest')
      .doc('7WcezB5hWuNISzPsTptX')
      .get();

    console.log('firebase firestore ' + userDocument.data().productFor);
  };

  const getUserData = async () => {
    const greetingInfo = await AsyncStorage.getItem('@cartItems');
    console.log('CartCheckFor: ' + greetingInfo);
  };

  useEffect(() => {
    //getuser();
    getUserData();
    GoogleSignin.configure({
      webClientId:
        '482323316941-fsn6sh8op89hp7llno0jpm7u6ubpe2ca.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  //console.log(user.email);

  const showLoginPage = () => {
    isNaN(userPro)
      ? navigation.navigate('Profile')
      : navigation.navigate('Login');
  };

  return (
    <View style={styles.NavContainer}>
      <View style={[styles.NavBarStyle, {backgroundColor: setColorBag}]}>
        <Pressable
          onPress={() => console.log('hello')}
          style={styles.IconBehave}
          android_ripple={{borderless: true, radius: 50}}>
          <Icon name="home" size={iconSize} color={colours.green} />
        </Pressable>

        <Pressable
          onPress={() => showLoginPage()} // error
          style={styles.IconBehave}
          android_ripple={{borderless: true, radius: 50}}>
          <Icon name="heart" size={iconSize} color={colours.green} />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Cart')}
          style={styles.IconBehave}
          android_ripple={{borderless: true, radius: 50}}>
          <Icon name="shopping-cart" size={iconSize} color={colours.green} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  NavContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    paddingLeft: 20,
    bottom: 2,
  },
  NavBarStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    borderRadius: 20,
  },
  IconBehave: {
    padding: 14,
  },
});

export default TabBar;
