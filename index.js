/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

/*
* To run project
source $HOME/.bash_profile
adb devices
npx react-native run-android

* For icons
https://oblador.github.io/react-native-vector-icons/
*/
