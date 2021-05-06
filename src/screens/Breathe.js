import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Breathe = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#121212'}}>
      {React.Children.toArray(
        new Array(6).fill(0).map((_, index) => {
          return <Circle index={index} />;
        }),
      )}
    </View>
  );
};

const Circle = ({index}) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <View
        style={{
          backgroundColor: '#64BEE6',
        }}
      />
    </View>
  );
};

export default Breathe;
