import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colours} from '../theme/colour';

const OrdersCard = ({order}) => {
  return (
    <View style={styles.listContentView}>
      <Text style={styles.textBasicColor}>check orders</Text>
      <Text style={styles.textBasicColor}>{order}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listContentView: {
    width: '100%',
    height: 110,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colours.white,
    borderRadius: 5,
    padding: 5,
  },
  textBasicColor: {
    color: colours.black,
  },
  textBasicLightColor: {
    color: colours.backgroundDark,
  },
});

export default OrdersCard;

/*
{categories.map(order => (
<OrdersCard order={order} />
))}
*/
