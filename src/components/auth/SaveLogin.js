import React from 'react';
import {AuthProvider} from './AuthProvider';
import CheckLogin from './CheckLogin';

const SaveLogin = ({navigation}) => {
  return (
    <AuthProvider>
      {console.log('SaveLogin')}
      <CheckLogin navigation={navigation} />
    </AuthProvider>
  );
};

export default SaveLogin;
