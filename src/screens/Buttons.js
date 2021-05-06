import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
        backgroundColor: '#121212',
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
