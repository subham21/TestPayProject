import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../user/loginComponents/FormButton';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const getUserData = async () => {
    const greetingInfo = await AsyncStorage.getItem('@userLogin');
    console.log('userDAS: ' + greetingInfo);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>hello user..</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
});

export default ProfileScreen;
