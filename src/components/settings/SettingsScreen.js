import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {colours} from '../theme/colour';
import Icon from 'react-native-vector-icons/Entypo';
import CardComponent from './CardComponent';
import RenderHtml from 'react-native-render-html';
import {
  aboutTextHtml,
  contactTextHtml,
  privacyTextHtml,
  termsTextHtml,
  refundTextHtml,
  tagsStyles,
} from './SettingsTextSource';
import {windowWidth} from '../../assets/Dimensions';

const SettingsScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTextContent, setModalTextContent] = useState(false);

  const ShowModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={styles.fullView}>
              <RenderHtml
                contentWidth={windowWidth}
                source={modalTextContent}
                tagsStyles={tagsStyles}
              />
            </ScrollView>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close Window</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const myOrders = () => {
    navigation.navigate('Order');
  };

  const aboutText = () => {
    setModalTextContent(aboutTextHtml);
    setModalVisible(true);
  };

  const contactText = () => {
    setModalTextContent(contactTextHtml);
    setModalVisible(true);
  };

  const privacyText = () => {
    setModalTextContent(privacyTextHtml);
    setModalVisible(true);
  };

  const termsText = () => {
    setModalTextContent(termsTextHtml);
    setModalVisible(true);
  };

  const refundText = () => {
    setModalTextContent(refundTextHtml);
    setModalVisible(true);
  };

  return (
    <View style={styles.safeWindowView}>
      <ScrollView>
        <View style={styles.backButtonView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" style={styles.backButtonBorder} />
          </TouchableOpacity>
          <Text style={styles.headerTitleView}>Settings Screen</Text>
          <View></View>
        </View>
        <View style={styles.paddingCard}>
          <ShowModal />
          <CardComponent>
            <Text onPress={() => myOrders()} style={styles.headerTitleView}>
              My orders
            </Text>
          </CardComponent>
          <CardComponent>
            <Text onPress={() => aboutText()} style={styles.headerTitleView}>
              About Us
            </Text>
          </CardComponent>
          <CardComponent>
            <Text onPress={() => contactText()} style={styles.headerTitleView}>
              Contact Us
            </Text>
          </CardComponent>
          <CardComponent>
            <Text onPress={() => privacyText()} style={styles.headerTitleView}>
              Privacy Policy
            </Text>
          </CardComponent>
          <CardComponent>
            <Text onPress={() => termsText()} style={styles.headerTitleView}>
              Terms & Conditions
            </Text>
          </CardComponent>
          <CardComponent>
            <Text onPress={() => refundText()} style={styles.headerTitleView}>
              Cancellation/ Refund Policy
            </Text>
          </CardComponent>
          <CardComponent>
            <Text style={styles.headerTitleView}>App Version: 1.0</Text>
          </CardComponent>
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
  paddingCard: {
    paddingTop: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fullView: {
    flex: 1,
    marginBottom: 15,
    paddingRight: 35,
  },
});

export default SettingsScreen;
