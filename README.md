# React Native 初始化项目模板

采用 react navigation、rematch 作为基础的项目，完全用 react hooks 写法，集成了项目中常用的组件并封装了常用的方法，添加了一键打包发布到 fir.im。

## 特色

- 最新版 React Native 和 React navigation
- Rematch 状态管理最佳实践
- React hooks 写法
- 路由表现两端完全一致
- 支持暗黑模式的切换
- 使用 CodePush 进行热更新
- 基于 fastlane 自动打包及 iOS 证书管理
- 采用 Angular 团队推荐的 git 规范

## 开始

1. 目录结构
2. 运行项目
3. 添加页面
4. 打包发布

## 其他

代码提交规范参见 https://juejin.im/post/5c85bdde5188257dfa07da6b

## 常见问题

### husky 的钩子无法执行无法进行提交检查

确认自己的 git 版本 Git >= 2.13.2，小于该版本使用 brew upgrade git 升级即可
