import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const DATA = [
  require('../assets/images/Card1.png'),
  require('../assets/images/Card2.png'),
  require('../assets/images/Card3.png'),
  require('../assets/images/Card4.png'),
];

const Slider = () => {
  const scrollX = useSharedValue(0);
  const scrollIndicator = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
        {React.Children.toArray(
          DATA.map((image, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const animatedStyles = useAnimatedStyle(() => {
              const opacity = interpolate(
                scrollX.value,
                inputRange,
                [0, 1, 0],
                Extrapolate.CLAMP,
              );
              return {
                opacity, // This doesnt works
              };
            });
            return (
              <Animated.View style={animatedStyles}>
                <Image
                  style={[
                    {
                      position: 'absolute',
                      width,
                      height,
                    },
                  ]}
                  blurRadius={50}
                  source={image}
                />
              </Animated.View>
            );
          }),
        )}
      </View>
      <Animated.ScrollView
        onScroll={onScroll}
        pagingEnabled
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {React.Children.toArray(
          DATA.map((image) => {
            return (
              <View
                style={{
                  width,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowRadius: 20,
                  shadowOpacity: 0.7,
                }}>
                <Image
                  style={{
                    width: width * 0.7,
                    height: width * 0.7 * 1.54,
                    resizeMode: 'contain',
                  }}
                  source={image}
                />
              </View>
            );
          }),
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default Slider;
