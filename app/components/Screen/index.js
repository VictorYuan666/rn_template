import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';

Screen.propTypes = {};

function Screen({children}) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{}}>
        {children}
        <Text onPress={() => navigation.push('Detail')}>123</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Screen;
