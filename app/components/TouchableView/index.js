/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';

import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class ThrottleTask {
  throttle = 0;

  timer = null;

  constructor(time = 1000) {
    this.throttle = Math.abs(time);
  }

  // 开始计时
  start() {
    this.timer = setTimeout(this.end.bind(this), this.throttle);
  }

  // 结束计时
  end() {
    if (this.timer != null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  // 判断任务类的运行
  isRuning() {
    return this.timer != null;
  }
}

export const TouchableType = {
  Throttle: 'Throttle',
  Debounce: 'Debounce',
};
class TouchableView extends Component {
  throttleTask = null;

  constructor(props) {
    super(props);
    // 属性配置
    /**
     * 1:节流时间
     * 2:节流类型
     * 3:是否该组件需要节流
     */
    this.state = {
      throttle: this.props.throttle || 1000,
      type: this.props.throttletype || TouchableType.Throttle,
      isthrottle: this.props.isthrottle || true,
    };
    // 创建任务类
    if (this.state.isthrottle)
      this.throttleTask = new ThrottleTask(this.state.throttle);
  }

  componentWillReceiveProps(nP) {
    this.setState({
      type: nP.type,
      isthrottle: nP.isthrottle,
    });
  }

  componentWillUnmount() {
    this.throttleTask.end();
    this.throttleTask = null;
  }

  onPress = (...args) => {
    // 对默认的点击事件进行处理
    if (!this.state.isthrottle) {
      this.props.onPress && this.props.onPress(...args);
      return;
    }
    if (this.throttleTask.isRuning()) {
      if (this.state.type == TouchableType.Debounce)
        // 重启定时任务
        this.reStartTask();
      return;
    }
    // 重启定时任务
    this.reStartTask();
    // 触发时间
    this.props.onPress && this.props.onPress(...args);
  };

  reStartTask() {
    // 节流任务重新计时
    this.throttleTask.end();
    this.throttleTask.start();
  }

  render() {
    const {
      activeOpacity,
      children,
      onPress,
      type,
      disabled,
      image,
      ...props
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        disabled={!onPress || disabled}
        onPress={this.onPress}
        {...props}
      >
        {children}
        {image && image}
      </TouchableOpacity>
    );
  }
}

// const TouchableView = ({ activeOpacity, children, onPress, type, disabled, image, ...props }) => {
//   return (
//     <TouchableOpacity
//       activeOpacity={activeOpacity}
//       disabled={!onPress || disabled}
//       onPress={_.throttle(onPress, 800)}
//       {...props}
//     >
//       {children}
//       {image && image}
//     </TouchableOpacity>
//   );
// };

TouchableView.defaultProps = {
  activeOpacity: 0.6,
  type: 'normal',
  noDebounce: false,
  disabled: false,
  onPress: () => {},
  image: null,
  throttle: 800,
  throttletype: TouchableType.Throttle,
  isthrottle: true,
};
TouchableView.propTypes = {
  activeOpacity: PropTypes.number,
  type: PropTypes.oneOf(['normal', 'prompt', 'render']), // 普通 提示 渲染
  noDebounce: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.element.isRequired,
  onPress: PropTypes.func,
  image: PropTypes.node,
  throttle: PropTypes.number,
  throttletype: PropTypes.string,
  isthrottle: PropTypes.bool,
};

export default TouchableView;
