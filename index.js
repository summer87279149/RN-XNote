import { AppRegistry } from 'react-native';
import Root from './component/Root';
import { YellowBox } from 'react-native'; YellowBox.ignoreWarnings(
    ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);//去掉黄色警告

AppRegistry.registerComponent('qlddsc', () => Root);
