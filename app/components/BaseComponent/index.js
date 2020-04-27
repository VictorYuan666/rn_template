import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
// import { Provider } from '@ant-design/react-native';
import PropTypes from 'prop-types';
// import { ToastContainer, ErrorPage, LoadingPage } from '../';
import navigator from '@navigation/navigator';
import Nav from '../Nav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default class BaseComponent extends React.Component {
  static propTypes = {
    navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };

  constructor(props) {
    super(props);
    const parentNavigation = this.props.navigation.dangerouslyGetParent();
    navigator.setRouters(parentNavigation.state.routes, parentNavigation);
    this.navigator = navigator;
    this.navParams = this.props.navigation.state.params;
    this.state = {
      pageState: 'success',
      errorMsg: '',
    };
  }

  onWillFocus() {}

  onWillBlur() {}

  _reload() {
    return null;
  }

  _forceInset() {
    return {};
  }

  _headerProps() {
    return {};
  }

  _renderHeader() {
    return <Nav />; //<NavBar isTranslucent {...this._headerProps()} />;
  }

  _containerStyle() {
    return { backgroundColor: '#F8F8F9' };
  }

  _render() {
    return null;
  }

  _renderBase() {
    return null;
  }

  // _renderLoading() {
  //   return <LoadingPage />;
  // }

  // _renderError() {
  //   const { errorMsg } = this.state;
  //   const netErrorMsg = ['连接到服务器失败'];
  //   return netErrorMsg.includes(errorMsg) ? (
  //     <ErrorPage
  //       title="暂无网络连接"
  //       type="error"
  //       onPress={() => this._reload()}
  //     />
  //   ) : (
  //     <ErrorPage
  //       title={errorMsg || '连接服务器出错'}
  //       type="error"
  //       onPress={() => this._reload()}
  //     />
  //   );
  // }

  render() {
    const { pageState } = this.state;
    return (
      <SafeAreaView
        style={[styles.container, this._containerStyle()]}
        forceInset={{
          top: 'never',
          ...this._forceInset(),
        }}
      >
        {this._renderHeader()}
        {/* {pageState === 'error' ? this._renderError() : null}
        {pageState === 'loading' ? this._renderLoading() : null} */}
        {(pageState === 'success' || !pageState) &&
          (this._renderBase() || (
            <KeyboardAwareScrollView
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
            >
              {this._render()}
            </KeyboardAwareScrollView>
          ))}
        <NavigationEvents
          onWillFocus={this.onWillFocus}
          onWillBlur={this.onWillBlur}
        />
        {/* {this.props.loading && (
          <ToastContainer type="loading" duration={0} visible>
            请稍候
          </ToastContainer>
        )} */}
      </SafeAreaView>
    );
  }
}
