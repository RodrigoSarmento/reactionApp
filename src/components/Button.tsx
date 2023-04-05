import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ViewStyle,
} from 'react-native';

interface IButton {
  text: string;
  variant?: 'outline';
  customStyle?: ViewStyle;
  onButtonPress: () => void;
}
export const screenWidth = Dimensions.get('window').width;

const Button: React.FC<IButton> = ({
  onButtonPress,
  text,
  customStyle,
  variant,
}) => {
  const {container, textStyle, outlineContainer, textOutline} = styles;

  const buttonContainer = {...container, ...customStyle};

  return (
    <TouchableOpacity
      onPress={() => onButtonPress()}
      style={variant === 'outline' ? outlineContainer : buttonContainer}>
      <Text style={variant === 'outline' ? textOutline : textStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262626',
    width: screenWidth * 0.7,
    height: 90,
    borderRadius: 12,
  },
  textStyle: {
    color: 'white',
    fontSize: 38,
    fontWeight: '700',
  },
  textOutline: {
    color: 'white',
    fontSize: 38,
    fontWeight: '700',
  },
  outlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#262626',
    width: screenWidth * 0.7,
    height: 90,
    borderRadius: 12,
  },
});

export {Button};
