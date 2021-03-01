import {
  List,
  Example1,
  Example2,
  Example3,
  Example4,
  Example5,
  Example6,
} from '../screens';

const SCREENS = [
  {screenName: 'List', text: 'Index', component: List},
  {screenName: 'Example1', text: 'Transitions', component: Example1},
  {screenName: 'Example2', text: 'Drag and Drop', component: Example2},
  {screenName: 'Example3', text: 'Scroll Events', component: Example3},
  {
    screenName: 'Example4',
    text: 'Scroll Events with Slider',
    component: Example4,
  },
  {screenName: 'Example5', text: 'Bottom Sheet', component: Example5},
  {
    screenName: 'Example6',
    text: 'Animated Bottom Tab Navigator',
    component: Example6,
  },
];

export default SCREENS;
