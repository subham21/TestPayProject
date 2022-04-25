import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  const [animationLoading, setAnimationLoading] = useState(true);
  const animation = useRef(null);

  useEffect(() => {
    animation.current.play();
    animation.current.play(0, 100);
  }, []);

  // We only want to hide the Splash Screen after it has played at least once
  const handleAnimationFinish = () => {
    setAnimationLoading(false);
  };

  return (
    <Modal visible={animationLoading} animationType="fade">
      <LottieView
        ref={animation}
        source={require('../../assets/splash3.json')}
        loop={false}
        autoPlay
        onAnimationFinish={handleAnimationFinish}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default SplashScreen;

/*
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} />
        </View>
      </View>
    </Modal>
  );
  //
  <LottieView
        source={require('../../assets/splash3.json')}
        loop={false}
        autoPlay
        onAnimationFinish={handleAnimationFinish}
      />
*/
