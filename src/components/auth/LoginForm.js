import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colours} from '../theme/colour';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginForm = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const setColorBag = isDarkMode
    ? colours.darkAppBackGround
    : colours.lightAppBackGround;
  const setColorText = isDarkMode ? colours.white : colours.backgroundDark;
  const setColorgrey = isDarkMode ? colours.backgroundMedium : colours.white;
  // 482323316941-fsn6sh8op89hp7llno0jpm7u6ubpe2ca.apps.googleusercontent.com

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo + ' googleInfo');
      console.log(userInfo + ' googleID');
      console.log(userInfo + ' googleEmail');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error + ' er1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error + ' er2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error + ' er3');
      } else {
        // some other error happened
        console.log(error + ' er4');
      }
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeAreaStyle, {backgroundColor: setColorBag}]}>
      <Text style={{color: setColorText}}>LoginScreen</Text>
      <Pressable
        onPress={googleLogin}
        style={styles.IconBehave}
        android_ripple={{borderless: true, radius: 50}}>
        <Text style={{color: setColorText}}>google login</Text>
      </Pressable>
      <Text>To make some space in between'\n'and more space</Text>
      <Text>To make some space in between'\n'and more space</Text>
      <Text>To make some space in between'\n'and more space</Text>
      <Pressable
        onPress={logout}
        style={styles.IconBehave}
        android_ripple={{borderless: true, radius: 50}}>
        <Text style={{color: setColorText}}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {flex: 1, padding: 20},
});

export default LoginForm;
