/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {colours, productItems} from '../theme/colour';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const setColorBag = isDarkMode
    ? colours.darkAppBackGround
    : colours.lightAppBackGround;
  const setColorText = isDarkMode ? colours.white : colours.backgroundDark;
  const setColorgrey = isDarkMode ? colours.backgroundMedium : colours.white;
  const setWordColor = isDarkMode ? colours.blue : colours.red;

  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('@cartItems');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      productItems.forEach(data => {
        if (items.includes(data.productID)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };

  const getTotal = productData => {
    let totalAmount = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      totalAmount = totalAmount + productPrice;
    }
    setTotal(totalAmount);
  };

  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('@cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] === id) {
          array.splice(index, 1);
        }

        console.log('arrayItems: ' + array);
        //await AsyncStorage.setItem('@cartItems', JSON.stringify(array));
        //getDataFromDB();
      }
    }
  };

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('@cartItems');
    } catch (error) {
      return error;
    }

    ToastAndroid.show('Items will be Deliverd SOON!', ToastAndroid.SHORT);

    navigation.navigate('Home');
  };

  const renderProducts = data => {
    return (
      <View
        key={data.productID}
        onPress={() => console.log('ProductInfo, productID: ' + data.productID)}
        style={styles.listContentView}>
        <View style={styles.listContentImgView}>
          <Image
            source={{uri: data.productImageURL}}
            style={styles.listImgRenderView}
          />
        </View>
        <View style={styles.listTitleContentView}>
          <View>
            <Text style={styles.listProductTitleText}>{data.productModel}</Text>
            <View style={styles.listProductPriceView}>
              <Text style={styles.listProductPriceText}>
                &#8377;{data.productPrice}
              </Text>
              <Text>
                {/* (~&#8377;
                {data.productPrice + data.productPrice / 20}) */}
              </Text>
            </View>
          </View>
          <View style={styles.listCartButtonView}>
            <View style={styles.listCartQuantityButtonView}>
              <View style={styles.listDecreaseCartButtonView}>
                <Icon name="minus" style={styles.listDecreaseCartIconView} />
              </View>
              <Text>1</Text>
              <View style={styles.listIncreaseCartButtonView}>
                <Icon name="plus" style={styles.listIncreaseCartIconView} />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => removeItemFromCart(data.productID)}>
              <Icon
                name="delete-outline"
                style={styles.listDeleteCartIconView}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.safeWindowView}>
      <ScrollView>
        <View style={styles.backButtonView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" style={styles.backButtonBorder} />
          </TouchableOpacity>
          <Text style={styles.headerTitleView}>Order Details</Text>
          <View></View>
        </View>
        <Text style={styles.cartTitleView}>My Cart</Text>
        <View style={styles.paddingItemsView}>
          {product ? product.map(renderProducts) : null}
        </View>
        <View>
          <View style={styles.locationHeaderView}>
            <Text style={styles.locationTitleView}>Delivery Location</Text>
            <View style={styles.locationContentView}>
              <View style={styles.locationIconContentView}>
                <View style={styles.locationIconBorderView}>
                  <Icon
                    name="truck-delivery-outline"
                    style={styles.locationIconColorView}
                  />
                </View>
                <View>
                  <Text style={styles.locationTextContent1}>50, K.M.Lane</Text>
                  <Text style={styles.locationTextContent2}>
                    Salkia, Howrah
                  </Text>
                </View>
              </View>
              <Icon name="chevron-right" style={styles.locationViewButton} />
            </View>
          </View>
          <View style={styles.orderMainView}>
            <Text style={styles.orderTitleHeader}>Order Info..</Text>
            <View style={styles.orderTitleSubHeader}>
              <Text style={styles.orderTextSub}>Subtotal</Text>
              <Text style={styles.orderTextSubTotal}>&#8377;{total}.00</Text>
            </View>
            <View style={styles.orderTitleShip}>
              <Text style={styles.orderTextShip}>Shipping Tax</Text>
              <Text style={styles.orderTextShipTotal}>&#8377;{total / 20}</Text>
            </View>
            <View style={styles.orderTotalTitleView}>
              <Text style={styles.orderTextTotalView}>Total</Text>
              <Text style={styles.orderTextTotalAmount}>
                &#8377;{total + total / 20}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.payoutContentView}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => (total !== 0 ? console.log('CheckOut') : null)} //checkOut()
          style={styles.payoutButtonView}>
          <Text style={styles.payoutButtonTitleText}>
            CHECKOUT (&#8377;{total + total / 20} )
          </Text>
        </TouchableOpacity>
      </View>
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
  locationHeaderView: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  locationTitleView: {
    fontSize: 16,
    color: colours.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  locationContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationIconContentView: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  locationIconBorderView: {
    color: colours.green,
    backgroundColor: colours.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 10,
    marginRight: 18,
  },
  locationIconColorView: {fontSize: 18, color: colours.green},
  locationTextContent1: {fontSize: 14, color: colours.black, fontWeight: '500'},
  locationTextContent2: {
    fontSize: 12,
    color: colours.black,
    fontWeight: '400',
    lineHeight: 20,
    opacity: 0.5,
  },
  locationViewButton: {fontSize: 22, color: colours.black},
  orderMainView: {
    paddingHorizontal: 16,
    marginTop: 40,
    marginBottom: 80,
  },
  orderTitleHeader: {
    fontSize: 16,
    color: colours.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 20,
  },
  orderTitleSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderTextSub: {
    fontSize: 12,
    fontWeight: '400',
    maxWidth: '80%',
    color: colours.black,
    opacity: 0.5,
  },
  orderTextSubTotal: {
    fontSize: 12,
    fontWeight: '400',
    color: colours.black,
    opacity: 0.8,
  },
  orderTitleShip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  orderTextShip: {
    fontSize: 12,
    fontWeight: '400',
    maxWidth: '80%',
    color: colours.black,
    opacity: 0.5,
  },
  orderTextShipTotal: {
    fontSize: 12,
    fontWeight: '400',
    color: colours.black,
    opacity: 0.8,
  },
  orderTotalTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderTextTotalView: {
    fontSize: 12,
    fontWeight: '400',
    maxWidth: '80%',
    color: colours.black,
    opacity: 0.5,
  },
  orderTextTotalAmount: {
    fontSize: 18,
    fontWeight: '500',
    color: colours.green,
  },
  payoutContentView: {
    position: 'absolute',
    bottom: 10,
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payoutButtonView: {
    width: '86%',
    height: '90%',
    backgroundColor: colours.green,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payoutButtonTitleText: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
    color: colours.white,
    textTransform: 'uppercase',
  },
  listContentView: {
    width: '100%',
    height: 100,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colours.white,
    borderRadius: 5,
  },
  listContentImgView: {
    width: '30%',
    height: 100,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.white,
    borderRadius: 10,
    marginRight: 22,
  },
  listImgRenderView: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  listTitleContentView: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
  },
  listProductTitleText: {
    fontSize: 14,
    maxWidth: '100%',
    color: colours.black,
    fontWeight: '600',
    letterSpacing: 1,
  },
  listProductPriceView: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
  },
  listProductPriceText: {
    fontSize: 14,
    fontWeight: '400',
    maxWidth: '85%',
    marginRight: 4,
  },
  listCartButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 3,
  },
  listCartQuantityButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listDecreaseCartButtonView: {
    borderRadius: 100,
    marginRight: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: colours.backgroundMedium,
    opacity: 0.5,
  },
  listDecreaseCartIconView: {
    fontSize: 16,
    color: colours.backgroundDark,
  },
  listIncreaseCartButtonView: {
    borderRadius: 100,
    marginLeft: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: colours.backgroundMedium,
    opacity: 0.5,
  },
  listIncreaseCartIconView: {
    fontSize: 16,
    color: colours.backgroundDark,
  },
  listDeleteCartIconView: {
    fontSize: 16,
    color: colours.backgroundDark,
    backgroundColor: colours.backgroundLight,
    padding: 8,
    borderRadius: 100,
  },
});

export default CartScreen;

/*
//get total price of all items in the cart

profile screen grab email set to null
add products to contextAPI for global use
https://reactnavigation.org/docs/modal for delivery address
*/
