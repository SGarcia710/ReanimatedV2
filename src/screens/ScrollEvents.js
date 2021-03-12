import React from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  interpolateColor,
} from 'react-native-reanimated';

const Example3 = () => {
  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [-50, 0, 50],
        ['#74b9ff', '#212121', '#a29bfe'],
      ),
    };
  });

  return (
    <Animated.ScrollView
      style={[
        {
          width: '100%',
          height: '100%',
        },
        animatedStyle,
      ]}
      contentContainerStyle={{
        width: '100%',
        height: '100%',
      }}
      scrollEventThrottle={16}
      onScroll={scrollHandler}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              backgroundColor: '#706fd3',
            },
          ]}
        />
      </View>
    </Animated.ScrollView>
  );
};

export default Example3;
