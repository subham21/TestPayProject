import React from 'react';
import {View, Text, StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import SocialButton from './loginComponents/SocialButton';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  const googleLoginFirebase = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(googleCredential)
        .catch(error => {
          ToastAndroid.show(
            'Something went wrong with sign up: ' + error,
            ToastAndroid.SHORT,
          );
        });
    } catch (error) {
      ToastAndroid.show(
        'Something went wrong with sign up: ' + error,
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image
        source={require('../assets/rn-social-logo.png')}
        style={styles.logo}
      /> */}
      <Text style={styles.text}>TeryTech App</Text>

      <View>
        {/* <SocialButton
          buttonTitle="Sign In with Facebook"
          btnType="facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => console.log('fb login')}
        /> */}

        <SocialButton
          buttonTitle="Sign In with Google"
          btnType="google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => googleLoginFirebase()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
});

export default LoginScreen;
