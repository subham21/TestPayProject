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
import OrdersCard from './OrdersCard';

const OrderScreen = ({navigation}) => {
  return (
    <View style={styles.safeWindowView}>
      <ScrollView>
        <View style={styles.backButtonView}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="chevron-left" style={styles.backButtonBorder} />
          </TouchableOpacity>
          <Text style={styles.headerTitleView}>My Orders</Text>
          <View></View>
        </View>
        <Text style={styles.cartTitleView}>Past Orders</Text>
        <View style={styles.paddingItemsView}>
          {/* {product ? (
            product.length === 0 ? (
              <Text style={styles.textBasicLightColor}>No items in cart.</Text>
            ) : (
              product.map(renderProducts)
            )
          ) : (
            <Text style={styles.textBasicLightColor}>No items in cart...</Text>
          )}
          //
          {categories.map(order => (
            <OrdersCard order={order} />
          ))}
          */}
          <Text style={styles.textBasicLightColor}>
            No items to show in orders now.
          </Text>
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
  cartTitleView: {
    fontSize: 20,
    color: colours.black,
    fontWeight: '500',
    letterSpacing: 1,
    paddingTop: 20,
    paddingLeft: 16,
    marginBottom: 10,
  },
  paddingItemsView: {
    paddingHorizontal: 16,
  },
  textBasicColor: {
    color: colours.black,
  },
  textBasicLightColor: {
    color: colours.backgroundDark,
  },
});

export default OrderScreen;
