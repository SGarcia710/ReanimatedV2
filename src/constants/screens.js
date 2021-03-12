import {
  List,
  Example1,
  Example2,
  Example3,
  Example4,
  Example5,
  Example6,
  Example7,
  Example8,
  Example9,
  Example10,
  Transitions,
  Slider,
} from '../screens';

const SCREENS = [
  {screenName: 'List', text: 'Index', component: List},
  {screenName: 'Example1', text: 'Basis', component: Example1},
  {
    screenName: 'Example2',
    text: 'Drag and Drop with return',
    component: Example2,
  },
  {
    screenName: 'Example10',
    text: 'Drag and Drop to new position',
    component: Example10,
  },
  {screenName: 'Example3', text: 'Scroll Events', component: Example3},
  {
    screenName: 'Example4',
    text: 'Color Interpolation',
    component: Example4,
  },
  {screenName: 'Example5', text: 'Bottom Sheet', component: Example5},
  {
    screenName: 'Example6',
    text: 'Animated Bottom Tab Navigator',
    component: Example6,
  },
  {
    screenName: 'Example7',
    text: 'Buttons',
    component: Example7,
  },
  {
    screenName: 'Example8',
    text: 'Accordions',
    component: Example8,
  },
  {
    screenName: 'Example9',
    text: 'TikTok Disc',
    component: Example9,
  },
  {
    screenName: 'Transitions',
    text: 'Transitions',
    component: Transitions,
  },
  {
    screenName: 'Slider',
    text: 'Slider',
    component: Slider,
  },
];

export default SCREENS;
