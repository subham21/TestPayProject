import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colours} from '../theme/colour';
import Icon from 'react-native-vector-icons/Entypo';

const DefaultScreen = ({navigation}) => {
  return (
    <View style={styles.safeWindowView}>
      <ScrollView>
        <View style={styles.backButtonView}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="chevron-left" style={styles.backButtonBorder} />
          </TouchableOpacity>
          <Text style={styles.headerTitleView}>Default Screen</Text>
          <View></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeWindowView: {
    width: '100%',
    height: '100%',
    backgroundColor: colours.lightAppBackGround,
    position: 'relative',
  },
  backButtonView: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButtonBorder: {
    fontSize: 18,
    color: colours.backgroundDark,
    padding: 12,
    backgroundColor: colours.backgroundLight,
    borderRadius: 10,
  },
  headerTitleView: {
    fontSize: 14,
    color: colours.black,
    fontWeight: '400',
  },
});

export default DefaultScreen;
