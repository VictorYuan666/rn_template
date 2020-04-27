import React from 'react';
import { StyleSheet } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { View, Text, TouchableView } from '@components';
import Icon from 'react-native-vector-icons/AntDesign';
import { scaleHeight, scaleSize, setSpText, isPortrait } from '@utils';
import navigator from '@navigation/navigator';

const Nav = ({ noBack, left, title, right }) => {
  return (
    <View style={styles.container}>
      {noBack ? (
        <View />
      ) : (
        left || (
          <TouchableView onPress={() => navigator.pop()}>
            <Flex direction="row">
              <Icon name="left" style={styles.backIcon} />
              <Text style={styles.backText}>返回</Text>
            </Flex>
          </TouchableView>
        )
      )}
      {/* <Text style={styles.title}>{title}</Text> */}
      {right || <View />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleSize(30),
    backgroundColor: '#3B98F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleSize(15),
  },
  backIcon: {
    fontSize: setSpText(14),
    color: 'white',
  },
  backText: {
    fontSize: setSpText(14),
    color: 'white',
    marginLeft: scaleHeight(4),
  },
  title: {
    fontSize: setSpText(14),
    color: 'white',
  },
});

export default Nav;
