/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colours} from '../theme/colour';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TabBar = ({navigation}) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = false;
  const setColorBag = isDarkMode
    ? colours.lightAppBackGround
    : colours.darkAppBackGround;
  const iconSize = 26;
  const [userPro, setUserPro] = useState();

  function onAuthStateChanged(user) {
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

  useEffect(() => {
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
          onPress={() => showLoginPage()}
          style={styles.IconBehave}
          android_ripple={{borderless: true, radius: 50}}>
          <Icon name="user" size={iconSize} color={colours.green} />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Cart')}
          style={styles.IconBehave}
          android_ripple={{borderless: true, radius: 50}}>
          <Icon name="shopping-cart" size={iconSize} color={colours.green} />
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Settings')} // error settings-sharp
          style={styles.IconBehave}
          android_ripple={{borderless: true, radius: 50}}>
          <Ionicons
            name="settings-sharp"
            size={iconSize}
            color={colours.green}
          />
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
