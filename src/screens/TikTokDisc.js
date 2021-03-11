import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const Example1 = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {duration: 1000, easing: Easing.linear}),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
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
        backgroundColor: '#b2b2b2',
      }}>
      <Animated.Image
        source={{
          uri:
            'https://res.cloudinary.com/sgarciacloud/image/upload/v1614217280/disc_knxnbm.png',
        }}
        style={[
          {
            width: 100,
            height: 100,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default Example1;
