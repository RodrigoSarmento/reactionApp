import React from 'react';

import {View, Pressable, StyleSheet} from 'react-native';

interface IInputButtons {
  color: 'red' | 'green' | 'blue' | 'yellow';
  onChangeBallProperties: () => void;
  increaseRight: () => void;
  increaseWrong: () => void;
}

const InputButtons: React.FC<IInputButtons> = ({
  color,
  onChangeBallProperties,
  increaseRight,
  increaseWrong,
}) => {
  const {blueButton, yellowButton, redButton, greenButton, bottomContainer} =
    styles;

  return (
    <View style={bottomContainer}>
      <Pressable
        onPress={() => {
          if (color === 'red') {
            onChangeBallProperties();
            increaseRight();
          } else {
            increaseWrong();
          }
        }}
        style={redButton}
      />
      <Pressable
        onPress={() => {
          if (color === 'green') {
            onChangeBallProperties();
            increaseRight();
          } else {
            increaseWrong();
          }
        }}
        style={greenButton}
      />
      <Pressable
        onPress={() => {
          if (color === 'blue') {
            onChangeBallProperties();
            increaseRight();
          } else {
            increaseWrong();
          }
        }}
        style={blueButton}
      />
      <Pressable
        onPress={() => {
          if (color === 'yellow') {
            onChangeBallProperties();
            increaseRight();
          } else {
            increaseWrong();
          }
        }}
        style={yellowButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blueButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
  },
  greenButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
  },
  redButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  yellowButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'yellow',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
  },
});

export {InputButtons};
