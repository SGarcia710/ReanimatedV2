import {
  List,
  Accordions,
  Basis,
  BottomSheet,
  BottomTabNavigator,
  Buttons,
  ColorInterpolation,
  DragAndDrop,
  DragAndDrop2,
  ScrollEvents,
  TikTokDisc,
  Transitions,
  Slider,
  Breathe,
  TinderSwipe,
} from '../screens';

const SCREENS = [
  {
    screenName: 'List',
    text: 'Index',
    component: List,
  },
  {
    screenName: 'Basis',
    text: 'Basis',
    component: Basis,
  },
  {
    screenName: 'DragAndDrop',
    text: 'Drag and Drop with return',
    component: DragAndDrop,
  },
  {
    screenName: 'DragAndDrop2',
    text: 'Drag and Drop to new position with decay(velocity)',
    component: DragAndDrop2,
  },
  {
    screenName: 'ScrollEvents',
    text: 'Scroll Events and Color interpolation',
    component: ScrollEvents,
  },
  {
    screenName: 'ColorInterpolation',
    text: 'Slider with Color Interpolation and Indicator',
    component: ColorInterpolation,
  },
  {
    screenName: 'BottomSheet',
    text: 'Bottom Sheet',
    component: BottomSheet,
  },
  {
    screenName: 'BottomTabNavigator',
    text: 'Animated Bottom Tab Navigator',
    component: BottomTabNavigator,
  },
  {
    screenName: 'Buttons',
    text: 'Button animation',
    component: Buttons,
  },
  {
    screenName: 'Accordions',
    text: 'Accordions',
    component: Accordions,
  },
  {
    screenName: 'TikTokDisc',
    text: 'TikTok Disc',
    component: TikTokDisc,
  },
  {
    screenName: 'Transitions',
    text: 'Cards Transitions',
    component: Transitions,
  },
  {
    screenName: 'Slider',
    text: 'Slider with blurred background',
    component: Slider,
  },
  {
    screenName: 'Breathe',
    text: 'Breathe animation from Apple Watch',
    component: Breathe,
  },
  {
    screenName: 'TinderSwipe',
    text: 'Tinder Swipe Animation',
    component: TinderSwipe,
  },
];

export default SCREENS;
