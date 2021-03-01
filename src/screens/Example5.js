import {
  View,
  Text,
  Button,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    alignItems: 'center',
  },
  sheetDragBar: {
    backgroundColor: '#212121',
    borderRadius: 16,
    width: 34,
    height: 6,
    marginBottom: 16,
  },
});

const Example5 = () => {
  const {height} = useWindowDimensions();
  const top = useSharedValue(height);

  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SPRING_CONFIG),
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd() {
      if (top.value > height / 2 + 200) {
        top.value = height;
      } else if (top.value < height / 2 - 100) {
        top.value = height * 0.05;
      } else {
        top.value = height / 2;
      }
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Button
          title="Open sheet"
          onPress={() => {
            top.value = withSpring(height / 2, SPRING_CONFIG); // half screen
          }}
        />
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[style, styles.sheetContainer]}>
          <View style={styles.sheetDragBar} />
          <Text>Sheet</Text>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Example5;
