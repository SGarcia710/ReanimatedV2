import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const Example5 = () => {
  const height = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: `${height.value}%`,
    };
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          height.value = withTiming(height.value > 0 ? 0 : 20, {
            duration: 500,
          });
        }}
        style={{
          width: '90%',
          backgroundColor: '#A8DDE9',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 6,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: -2,
            color: '#3F5B98',
          }}>
          Press to show
        </Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          {
            width: '90%',
            backgroundColor: '#A8DDE9',
            marginTop: 5,
            borderRadius: 6,
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};

export default Example5;
