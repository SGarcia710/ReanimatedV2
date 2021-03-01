import React from 'react';
import {View, useWindowDimensions, StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  useAnimatedScrollHandler,
  interpolateColor,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const colors = ['#eb3b5a', '#fa8231', '#f7b731', '#20bf6b', '#0fb9b1'];

const Example3 = () => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const {width} = useWindowDimensions();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollX.value,
        colors.map((_, i) => i * width),
        colors,
      ),
    };
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyle]} />
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={16}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}>
        {React.Children.toArray(
          colors.map((color) => {
            return (
              <View
                style={{
                  width,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>HEY {color}</Text>
              </View>
            );
          }),
        )}
      </Animated.ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          flexDirection: 'row',
        }}>
        {React.Children.toArray(
          colors.map((_, i) => {
            const dotScale = interpolate(
              scrollX.value,
              [(i - 1) * width, i * width, (i + 1) * width],
              [0.5, 1, 0.5],
              Extrapolate.CLAMP,
            );
            const dotOpacity = interpolate(
              scrollX.value,
              [(i - 1) * width, i * width, (i + 1) * width],
              [0.5, 1, 0.5],
              Extrapolate.CLAMP,
            );
            const dotStyles = useAnimatedStyle(() => {
              return {
                opacity: dotOpacity,
                transform: [
                  {
                    scale: dotScale,
                  },
                ],
              };
            });
            return (
              <Animated.View
                style={[
                  {
                    width: 10,
                    height: 10,
                    borderRadius: 10 / 2,
                    backgroundColor: '#212121',
                    marginRight: 10,
                  },
                  dotStyles,
                ]}
              />
            );
          }),
        )}
      </View>
    </View>
  );
};

export default Example3;
