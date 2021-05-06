import React from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

const Example2 = () => {
  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (e) => {
      touchX.value = e.translationX;
      touchY.value = e.translationY;
    },
    onEnd: () => {
      touchX.value = withSpring(0);
      touchY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: touchX.value,
        },
        {
          translateY: touchY.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#121212',
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
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Example2;
