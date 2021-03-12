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
} from '../screens';

const SCREENS = [
  {screenName: 'List', text: 'Index', component: List},
  {screenName: 'Basis', text: 'Basis', component: Basis},
  {
    screenName: 'DragAndDrop',
    text: 'Drag and Drop with return',
    component: DragAndDrop,
  },
  {
    screenName: 'DragAndDrop2',
    text: 'Drag and Drop to new position',
    component: DragAndDrop2,
  },
  {screenName: 'ScrollEvents', text: 'Scroll Events', component: ScrollEvents},
  {
    screenName: 'ColorInterpolation',
    text: 'Slider with Color Interpolation and Indicator',
    component: ColorInterpolation,
  },
  {screenName: 'BottomSheet', text: 'Bottom Sheet', component: BottomSheet},
  {
    screenName: 'BottomTabNavigator',
    text: 'Animated Bottom Tab Navigator',
    component: BottomTabNavigator,
  },
  {
    screenName: 'Buttons',
    text: 'Buttons',
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
