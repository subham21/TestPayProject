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
import {windowWidth} from '../../assets/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const setColorBag = isDarkMode
    ? colours.darkAppBackGround
    : colours.lightAppBackGround;
  const setColorText = isDarkMode ? colours.white : colours.backgroundDark;
  const setColorgrey = isDarkMode ? colours.backgroundMedium : colours.white;
  const setWordColor = isDarkMode ? colours.blue : colours.red;
  const {itemID} = route.params;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    for (let index = 0; index < productItems.length; index++) {
      if (productItems[index].productID === itemID) {
        await setProduct(productItems[index]);
        return;
      }
    }
  };

  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('@cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('@cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Item Added Successfully to cart',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('@cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Item Added Successfully to cart',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  return (
    <View style={styles.safeView}>
      <ScrollView>
        <View style={styles.imgMainView}>
          <View style={styles.backButtonView}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo name="chevron-left" style={styles.backButtonBorder} />
            </TouchableOpacity>
          </View>
          <View style={styles.imgViewBorder}>
            <Image
              source={{uri: product.productImageURL}}
              style={styles.imgViewContainer}
            />
          </View>
        </View>
        <View style={styles.productDetailsMargin}>
          <View style={styles.productTitleView}>
            <Text style={styles.titleTextView}>
              {product.productCompany +
                ' ' +
                product.productModel +
                ' ' +
                product.productType}
            </Text>
          </View>
          <Text style={styles.detailsTextView}>
            {product.productFor + ' ' + product.productDescription}
          </Text>
          <View style={styles.pricePaddingView}>
            <Text style={styles.priceTextView}>
              {product.productPrice === 0
                ? 'Prices will be available soon'
                : '₹ ' + product.productPrice}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addCartButtonView}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            product.productQuantity > 0 ? addToCart(product.productID) : null
          }
          style={styles.addCartButtonBorder}>
          <Text style={styles.addCartTitleView}>
            {product.productQuantity > 0 ? 'Add to cart' : 'Not Avialable'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeView: {
    width: '100%',
    height: '100%',
    backgroundColor: colours.lightAppBackGround,
    position: 'relative',
  },
  imgMainView: {
    width: '100%',
    backgroundColor: colours.white,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  backButtonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingLeft: 16,
  },
  backButtonBorder: {
    fontSize: 18,
    color: colours.backgroundDark,
    padding: 12,
    backgroundColor: colours.backgroundLight,
    borderRadius: 10,
  },
  imgViewBorder: {
    width: windowWidth,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgViewContainer: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productDetailsMargin: {
    paddingHorizontal: 16,
    marginTop: 6,
  },
  productTitleView: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTextView: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginVertical: 4,
    color: colours.black,
    maxWidth: '84%',
  },
  detailsTextView: {
    fontSize: 14,
    color: colours.black,
    fontWeight: '400',
    letterSpacing: 1,
    opacity: 0.6,
    lineHeight: 20,
    maxWidth: '85%',
    maxHeight: 44,
    marginBottom: 18,
  },
  paddingBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 14,
    borderBottomColor: colours.black,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  pricePaddingView: {
    paddingHorizontal: 10,
  },
  priceTextView: {
    fontSize: 18,
    fontWeight: '500',
    maxWidth: '85%',
    color: colours.green,
    marginBottom: 4,
  },
  addCartButtonView: {
    position: 'absolute',
    bottom: 10,
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCartButtonBorder: {
    width: '86%',
    height: '90%',
    backgroundColor: colours.green,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCartTitleView: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
    color: colours.white,
    textTransform: 'uppercase',
  },
});

export default DetailsScreen;
