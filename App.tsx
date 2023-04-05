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
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = ['red', 'green', 'blue', 'yellow'];
export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

const START_TIME = 0;

function App() {
  const [gameResult, setGameResult] = useState({
    score: 0,
    averageTime: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [numberOfBallsLeft, setNumberOfBallsLeft] = useState(10);
  const [timeToStart, setTimeToStart] = useState(START_TIME);
  const [ballTimestampStart, setBallTimestampStart] = useState(0);
  const [ballTimestampEnd, setBallTimestampEnd] = useState(0);
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

  const getGameResults = async () => {
    const results = await AsyncStorage.getItem('game_results');
    if (results !== null) {
      setGameResult(JSON.parse(results));
    }
  };

  useEffect(() => {
    getGameResults();
  }, []);

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
    setScore(0);
    setNumberOfBallsLeft(10);
    setBallTimestampStart(Date.now());
  };

  const onResetButtonPress = () => {
    setTimeToStart(START_TIME);
    setIsPlaying(false);
    setScore(0);
    setNumberOfBallsLeft(10);
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
    if (numberOfBallsLeft === 0) {
      const totalTime = ballTimestampEnd - ballTimestampStart;
      const averageTime = totalTime / 10;
      if (
        (score > gameResult.score && score > 0) ||
        (averageTime < gameResult.averageTime && averageTime > 0)
      ) {
        setGameResult({score, averageTime});
        AsyncStorage.setItem(
          'game_results',
          JSON.stringify({
            score: score,
            averageTime: averageTime,
          }),
        );
      }

      return (
        <View style={centralizeContainer}>
          <View style={resultContainer}>
            <Text style={text24}>Pontuação {score}</Text>
            <Text style={text24}>
              Tempo total {(totalTime / 1000).toFixed(3)} segundos
            </Text>
            <Text style={text24}>
              Tempo médio {(averageTime / 1000).toFixed(3)} segundos
            </Text>
          </View>
          <Button
            customStyle={restartButton}
            text={'Jogar de novo'}
            onButtonPress={() => onStartButtonPress()}
          />
          <Button
            variant={'outline'}
            customStyle={restartButton}
            text={'Voltar para início'}
            onButtonPress={() => onResetButtonPress()}
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
              increaseRight={() => {
                setScore(score + 1);
                setNumberOfBallsLeft(numberOfBallsLeft - 1);
                if (numberOfBallsLeft === 1) {
                  setBallTimestampEnd(Date.now());
                }
              }}
              increaseWrong={() => {
                setScore(score - 1);
                if (numberOfBallsLeft === 1) {
                  setBallTimestampEnd(Date.now());
                }
              }}
            />
          </View>
        </View>
      );
    }
  };

  const renderStart = () => {
    const {myNameText, gameResultText, gameResultContainer} =
      initialScreenStyles;

    return (
      <View style={centralizeContainer}>
        <View style={gameResultContainer}>
          <Text style={gameResultText}>Score Máximo: {gameResult.score}</Text>
          <Text style={gameResultText}>
            Melhor tempo médio: {(gameResult.averageTime / 1000).toFixed(3)}{' '}
            segundos
          </Text>
        </View>

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
  gameResultText: {fontSize: 20},
  gameResultContainer: {
    position: 'absolute',
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 20,
  },
  restartButton: {marginTop: 24, marginBottom: 24},
  resultContainer: {alignItems: 'flex-start', gap: 8},
});

export default App;
