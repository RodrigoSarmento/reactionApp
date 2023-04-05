import React from 'react';

import {View, Animated, StyleSheet} from 'react-native';

interface ICountDown {
  time: number;
  animation: Animated.Value;
}

const CountDown: React.FC<ICountDown> = ({time, animation}) => {
  const {container, text} = styles;

  return (
    <View style={container}>
      <Animated.Text
        style={{
          ...text,
          opacity: animation,
        }}>
        {time}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    color: 'black',
  },
});

export {CountDown};
