import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const PaymentScreen = () => {
  const payHandler = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_ZXKvfH48PobplE', // Your api key
      amount: '5000',
      name: 'foo',
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View style={styles.appStyle}>
      <Text>Add server side code to work! 🎉</Text>
      <Button onPress={payHandler} title="Hello" />
    </View>
  );
};

const styles = StyleSheet.create({
  appStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentScreen;

/*
key_id: "rzp_test_ZXKvfH48PobplE",
key_secret: "nMr4Dv9SUMGe0DdHV5TARrMy",
*/
