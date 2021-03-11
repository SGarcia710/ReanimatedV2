import React, {useEffect} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const Example1 = () => {
  const randomWidth = useSharedValue(200);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: randomWidth.value,
      height: randomWidth.value,
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
      <TouchableWithoutFeedback
        onPress={() => {
          randomWidth.value = withSpring(Math.random() * 350);
        }}>
        <Animated.View
          style={[
            {
              borderRadius: 100 / 2,
              backgroundColor: '#706fd3',
            },
            animatedStyle,
          ]}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Example1;
