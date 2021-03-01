import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

const Example1 = () => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    // withTiming will update this value from 0 to 1 in 1000ms
    // opacity.value = withTiming(1, {
    //   duration: 1000,
    // });
    // opacity.value = withRepeat(withDelay(1000, withSpring(1)), -1);
    opacity.value = withRepeat(withSequence(withSpring(1), withSpring(0)), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          scale: interpolate(opacity.value, [0, 1], [0.1, 1]),
        },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212121',
      }}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: '#706fd3',
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default Example1;
