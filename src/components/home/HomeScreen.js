import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import TabBar from '../tabBar/TabBar';
import {colours, productItems} from '../theme/colour';
import firestore from '@react-native-firebase/firestore';
import RNBootSplash from 'react-native-bootsplash';
import SplashScreen from '../Splash/SplashScreen';

const windowWidth = Dimensions.get('window').width / 2 - 30;
const cardHeight = 250;

const HomeScreen = ({navigation}) => {
  //const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = false;
  const setColorBag = isDarkMode
    ? colours.darkAppBackGround
    : colours.lightAppBackGround;
  const setColorText = isDarkMode ? colours.white : colours.backgroundDark;
  const setColorgrey = isDarkMode ? colours.backgroundMedium : colours.white;
  //const setWordColor = isDarkMode ? colours.blue : colours.red;

  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = [
    'All',
    'Hard Disk',
    'Mini PC',
    'Motherboard',
    'Processor',
    'RAM',
  ];
  //const catIndex = 0;
  //['All', 'Desktop', 'Laptop', 'Server'];
  //['All', 'Hard Disk', 'Mini PC', 'Motherboard', 'Processor', 'RAM'];
  //["All", "Laptop", "CPU", "Computer Accessories"];

  const [productList, setProductList] = useState([]);
  const [allProductList, setAllProductList] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    getDataFromLocalDB();
    //getDataFromDB();
    RNBootSplash.hide({fade: true});
  }, []);

  const getDataFromLocalDB = () => {
    setProductList(productItems);
    setAllProductList(productItems);
  };

  const getDataFromDB = async () => {
    try {
      const products = await firestore().collection('TeryProducts').get();
      const productsArray = [];
      for (var snap of products.docs) {
        var data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setLoadingActivity(false);
          setProductList(productsArray);
          setAllProductList(productsArray);
        }
      }
    } catch (error) {
      ToastAndroid.show('Error!' + error, ToastAndroid.SHORT);
    }
  };

  const selectProductCategory = index => {
    setCategoryIndex(index);

    const productsSelectArray = [];
    allProductList.forEach(item => {
      if (categories[index] === 'All') {
        productsSelectArray.push(item);
      } else if (item.productType === categories[index]) {
        productsSelectArray.push(item);
      }
    });
    if (productsSelectArray.length > 0) {
      setProductList(productsSelectArray);
    }
  };

  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              onPress={() => {
                selectProductCategory(index);
              }}>
              <Text
                style={[
                  styles.categoryText,
                  {color: setColorText},
                  catergoryIndex === index && styles.categoryTextSelected,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const Card = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('Details', {
            itemID: item.productID,
            itemImg: item.productImageURL,
            itemTitle:
              item.productCompany +
              ' ' +
              item.productModel +
              ' ' +
              item.productType,
            itemDescription: item.productFor + ' ' + item.productDescription,
            itemPrice: item.productPrice,
            itemQuantity: item.productQuantity,
          })
        }>
        <View style={styles.card}>
          <View style={styles.container}>
            <Image
              source={{
                uri: item.productImageURL,
              }}
              style={styles.cardImageContainer}
            />
          </View>
          <View style={[styles.textContainer, {backgroundColor: setColorgrey}]}>
            <Text
              numberOfLines={2}
              style={[styles.cardTitleStyle, {color: setColorText}]}>
              {item.productCompany +
                ' ' +
                item.productModel +
                ' ' +
                item.productType}
            </Text>
            <Text numberOfLines={2} style={{color: colours.green}}>
              {item.productPrice === 0
                ? 'Prices will be available soon'
                : '₹ ' + item.productPrice}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeAreaStyle, {backgroundColor: setColorBag}]}>
      <StatusBar backgroundColor={setColorBag} barStyle="dark-content" />
      <SplashScreen />
      <View style={styles.headerView}>
        <Text style={[styles.headerTitleView, {color: setColorText}]}>
          TeryTech Store
        </Text>
        <Text style={[styles.headerNextTitleView, {color: setColorText}]}>
          Shop for Refurbished Laptops, Computers & Accessories and more.
        </Text>
      </View>

      <CategoryList />

      {loadingActivity && (
        <View style={styles.loadingActivityView}>
          <ActivityIndicator />
        </View>
      )}

      <FlatList
        key={'#'}
        columnWrapperStyle={styles.columnFlatStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatContainerStyle}
        numColumns={2}
        data={productList}
        keyExtractor={item => item.productID}
        renderItem={({item}) => {
          return <Card item={item} />;
        }}
      />

      <TabBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {flex: 1, paddingHorizontal: 10},
  headerView: {
    marginTop: 10,
    marginBottom: 10,
    padding: 16,
  },
  headerTitleView: {
    fontSize: 25,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 10,
  },
  headerNextTitleView: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 24,
  },
  columnFlatStyle: {justifyContent: 'space-between'},
  flatContainerStyle: {
    marginTop: 10,
    marginHorizontal: 10,
    paddingBottom: 50,
    paddingTop: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 25, // to fix space between items
  },
  categoryTextSelected: {
    color: colours.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: colours.green,
  },
  card: {
    height: cardHeight,
    width: windowWidth,
    paddingTop: 10,
    marginBottom: 20,
    marginHorizontal: 2,
    borderRadius: 10,
    backgroundColor: colours.white,
  },
  cardImageContainer: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    //backgroundColor: colours.backgroundLight,
  },
  cardTitleStyle: {fontWeight: 'bold', fontSize: 15},
  container: {
    height: (cardHeight * 2) / 3 - 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    //backgroundColor: colours.backgroundLight,
  },
  textContainer: {
    height: cardHeight / 3 + 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    padding: 10,
    justifyContent: 'center',
    //backgroundColor: colours.backgroundMedium,
  },
  NavContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    paddingLeft: 20,
    bottom: 2,
  },
  NavBarStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    borderRadius: 20,
  },
  IconBehave: {
    padding: 14,
  },
  loadingActivityView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
