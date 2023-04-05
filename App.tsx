import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import {Button, CountDown, InputButtons} from './src/components';

const COLORS = ['red', 'green', 'blue', 'yellow'];
export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

const START_TIME = 0;

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [numberOfRightAnswer, setNumberOfRightAnswer] = useState(0);
  const [numberOfWrongAnswer, setNumberOfWrongAnswer] = useState(0);
  const [timeToStart, setTimeToStart] = useState(START_TIME);
  const [ballProps, setBallProps] = useState<{
    color: 'blue' | 'red' | 'yellow' | 'green';
    distanceFromTop: number;
    distanceFromLeft: number;
  }>({
    color: 'blue',
    distanceFromTop: 0,
    distanceFromLeft: 0,
  });

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1100,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      setTimeToStart(timeToStart - 1);
    }, 1100);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeToStart]);

  const changeBallProperties = () => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)] as
      | 'blue'
      | 'red'
      | 'yellow'
      | 'green';

    const distanceFromTop = Math.floor(Math.random() * 500);
    const distanceFromLeft = Math.floor(Math.random() * 300);

    setBallProps({color, distanceFromTop, distanceFromLeft});
  };

  const onStartButtonPress = () => {
    setTimeToStart(START_TIME);
    setIsPlaying(true);
    setNumberOfRightAnswer(0);
    setNumberOfRightAnswer(0);
  };

  const renderBall = (
    color: string,
    distanceFromTop: number,
    distanceFromLeft: number,
  ) => {
    const {ball} = styles;
    return (
      <View
        style={{
          backgroundColor: color,
          left: distanceFromLeft,
          top: distanceFromTop,
          ...ball,
        }}
      />
    );
  };

  const renderGaming = () => {
    const {text24, restartButton, resultContainer} = styles;
    if (numberOfRightAnswer + numberOfWrongAnswer > -1) {
      return (
        <View style={centralizeContainer}>
          <View style={resultContainer}>
            <Text style={text24}>
              Quantidade de acertos: {numberOfRightAnswer}
            </Text>
            <Text style={text24}>
              Quantidade de erros: {numberOfWrongAnswer}
            </Text>
          </View>
          <Button
            customStyle={restartButton}
            text={'Jogar de novo'}
            onButtonPress={() => onStartButtonPress()}
          />
        </View>
      );
    } else {
      return (
        <View style={flex1}>
          <View style={flexView}>
            {renderBall(
              ballProps.color,
              ballProps.distanceFromTop,
              ballProps.distanceFromLeft,
            )}
          </View>
          <View style={flexButtons}>
            <InputButtons
              color={ballProps.color}
              onChangeBallProperties={() => changeBallProperties()}
              increaseRight={() =>
                setNumberOfRightAnswer(numberOfRightAnswer + 1)
              }
              increaseWrong={() =>
                setNumberOfWrongAnswer(numberOfWrongAnswer + 1)
              }
            />
          </View>
        </View>
      );
    }
  };

  const renderStart = () => {
    const {myNameText} = initialScreenStyles;

    return (
      <View style={centralizeContainer}>
        <Button text={'Iniciar'} onButtonPress={() => onStartButtonPress()} />
        <Text style={myNameText}>Trabalho de Rodrigo Sarmento</Text>
      </View>
    );
  };

  const {flex1, flexView, flexButtons, centralizeContainer} = styles;

  return (
    <SafeAreaView style={flex1}>
      {isPlaying ? (
        <View style={flex1}>
          {timeToStart > 0 ? (
            <CountDown time={timeToStart} animation={animation} />
          ) : (
            renderGaming()
          )}
        </View>
      ) : (
        renderStart()
      )}
    </SafeAreaView>
  );
}

const initialScreenStyles = StyleSheet.create({
  myNameText: {
    position: 'absolute',
    bottom: 0,
  },
});

const styles = StyleSheet.create({
  flex1: {flex: 1},
  flexButtons: {flex: 0.1},
  flexView: {flex: 0.9},
  centralizeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  ball: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
  },
  text24: {
    fontSize: 24,
  },
  restartButton: {marginTop: 24},
  resultContainer: {alignItems: 'flex-start', gap: 8},
});

export default App;
