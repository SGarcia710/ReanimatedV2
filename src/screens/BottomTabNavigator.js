import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Transition, Transitioning} from 'react-native-reanimated';
import {useRef} from 'react';

const Tabs = createBottomTabNavigator();

const DATA = [
  {
    screenProps: {
      name: 'Home',
    },
    tabProps: {
      iconName: 'home',
      label: 'Home',
      focusColor: '#ffe1c5',
    },
    screenColor: '#c56b14',
  },
  {
    screenProps: {
      name: 'Search',
    },
    tabProps: {
      iconName: 'search',
      label: 'Search',
      focusColor: '#e5c1e5',
    },
    screenColor: '#f37ff3',
  },
  {
    screenProps: {
      name: 'Profile',
    },
    tabProps: {
      iconName: 'user-o',
      label: 'Profile',
      focusColor: '#d7d8f8',
    },
    screenColor: '#4b458c',
  },
  {
    screenProps: {
      name: 'Inbox',
    },
    tabProps: {
      iconName: 'inbox',
      label: 'Inbox',
      focusColor: '#bce3fa',
    },
    screenColor: '#2d9cdb',
  },
];

const Example6 = () => {
  return (
    <Tabs.Navigator>
      {React.Children.toArray(
        DATA.map((item) => {
          return (
            <Tabs.Screen
              {...item.screenProps}
              options={{
                tabBarButton: (props) => (
                  <TabItem
                    iconColor={item.screenColor}
                    {...item.tabProps}
                    {...props}
                  />
                ),
              }}>
              {() => <DummyScreen backgroundColor={item.screenColor} />}
            </Tabs.Screen>
          );
        }),
      )}
    </Tabs.Navigator>
  );
};

const TabItem = ({
  label,
  iconName,
  accessibilityState,
  iconColor,
  onPress,
  focusColor,
}) => {
  const focused = accessibilityState.selected;
  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={100} />
      <Transition.Change interpolation="easeInOut" durationMs={200} />
      <Transition.In type="fade" durationMs={100} />
    </Transition.Sequence>
  );

  const ref = useRef();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        ref.current.animateNextTransition();
        onPress();
      }}>
      <Transitioning.View
        ref={ref}
        transition={transition}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: focused ? focusColor : 'transparent',
          borderRadius: 100,
          margin: 6,
        }}>
        <Icon
          style={{marginRight: 6}}
          name={iconName}
          color={focused ? iconColor : 'black'}
          size={18}
        />
        {focused && (
          <Text
            style={{
              color: focused && iconColor,
              fontWeight: '600',
            }}>
            {label}
          </Text>
        )}
      </Transitioning.View>
    </TouchableWithoutFeedback>
  );
};

const DummyScreen = ({backgroundColor}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
      }}>
      <Text style={{color: 'white'}}>Screen</Text>
    </View>
  );
};

export default Example6;
