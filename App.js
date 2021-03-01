import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import App from './src/navigation';

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication(appName, {rootTag});
}

export default App;
