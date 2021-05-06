import React from 'react';
import {Dimensions, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {clamp} from 'react-native-redash';
import {useHeaderHeight} from '@react-navigation/stack';

const {width, height} = Dimensions.get('window');

const IMAGE_SIZE = 200;

const DragAndDrop2 = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const headerHeight = useHeaderHeight();
  const boundX = width - IMAGE_SIZE;
  const boundY = height - IMAGE_SIZE - headerHeight;

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.offsetX = translateX.value;
      context.offsetY = translateY.value;
    }, // Second
    onActive: (event, context) => {
      translateX.value = clamp(context.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(context.offsetY + event.translationY, 0, boundY);
    }, // first
    onEnd: (event, context) => {
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, boundX],
      });
      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, boundY],
      });
    }, // Last
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#121212',
      }}>
      <PanGestureHandler {...{onGestureEvent}}>
        <Animated.Image
          style={[
            {
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              resizeMode: 'contain',
            },
            animatedStyles,
          ]}
          source={require('../assets/images/flowers.png')}
        />
      </PanGestureHandler>
    </View>
  );
};

export default DragAndDrop2;
