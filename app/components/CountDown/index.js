import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { setSpText } from '@utils';

const appendZero = val => {
  if (val < 10) {
    return `0${val}`;
  }
  return val;
};

export default class CountDownText extends Component {
  static defaultProps = {
    type: 'seconds',
    onEnd: () => {}, // 结束回调
    startTime: 0, // 正向计时 时间起点为0秒
    endTime: 0,
    step: -1, // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
    startText: '获取验证码', // 开始的文本
    intervalText: null, // 定时的文本，可以是回调函数
    endText: '获取验证码', // 结束的文本
    auto: false,
    style: {},
  };

  static propTypes = {
    type: PropTypes.oneOf(['seconds', 'minute']),
    onEnd: PropTypes.func, // 结束回调
    startTime: PropTypes.number, // 正向计时 时间起点为0秒
    endTime: PropTypes.number,
    step: PropTypes.number, // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
    startText: PropTypes.string, // 开始的文本
    intervalText: PropTypes.string, // 定时的文本，可以是回调函数
    endText: PropTypes.string, // 结束的文本
    auto: PropTypes.bool,
    style: PropTypes.object,
  };

  // 定时回调
  constructor(props) {
    super(props);
    const { startText, startTime } = this.props;
    this.state = {
      text: startText, // 要显示文本
      time: startTime,
    };
  }

  componentDidMount() {
    const { auto } = this.props;

    if (auto) {
      this.start();
    }
  }

  componentWillUnmount() {
    // 重置倒计时
    this.reset();
  }

  // 开始计时
  start = () => {
    const { step, onEnd, intervalText, startTime, endTime, type } = this.props;
    this.setState({
      time: startTime,
    });
    this.reset();
    this.timer = setInterval(() => {
      const { time } = this.state;
      if (time !== endTime) {
        const currentTime = time + step;
        let showTime = currentTime;
        if (type === 'minute') {
          showTime = `${appendZero(_.round(currentTime / 60))}:${appendZero(
            currentTime % 60
          )}`;
        }
        this.setState({
          time: currentTime,
          text: intervalText.split('#').join(showTime),
        });
      } else {
        this.end();
        onEnd();
      }
    }, 1000);
  };

  // 结束计时
  end = () => {
    const { endText } = this.props;
    this.setState({
      text: endText,
    });
    this.reset();
  };

  // 重置
  reset = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };

  render() {
    return (
      <Text
        style={[{ color: 'white', fontSize: setSpText(11) }, this.props.style]}
      >
        {this.state.text}
      </Text>
    );
  }
}
