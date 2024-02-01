import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import * as Haptics from 'expo-haptics';
import {Image} from 'expo-image';

import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  ZoomIn,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import Shape from '../../components/shape';

export const circleDiameter = 110;

const Circle = ({
  translateX,
  translateY,
  circles,
  index,
  isCenter,
  item,
  initialX,
  initialY,
}) => {
  const width = isCenter ? 140 : 110;
  const height = isCenter ? 135 : 110.8;
  const scale = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const isCommingBack = useSharedValue(false);
  const style = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {
        scale: scale.value,
      },
    ],
    zIndex: isCenter ? 999 : 99,
  }));
  useAnimatedReaction(
    () => {
      return {
        translateX: translateX.value,
        translateY: translateY.value,
      };
    },
    (value, prevValue) => {
      if (Platform.OS !== 'web') {
        for (let i = 0; i < circles.length; i++) {
          const circle = circles[i];
          circle.x.value = withSpring(circle.initialX, {
            damping: 7,
            mass: 0.2,
            stiffness: 150,
          });
          circle.y.value = withSpring(circle.initialY, {
            damping: 7,
            mass: 0.2,
            stiffness: 150,
          });
        }
        if (!isDragging.value) {
          for (let i = 0; i < circles.length; i++) {
            for (let j = i; j < circles.length; j++) {
              if (i === j) continue;
              const circleA = circles[i];
              const circleB = circles[j];
              const dx = circleB.x.value - circleA.x.value;
              const dy = circleB.y.value - circleA.y.value;
              const distanceBetweenCenters = Math.sqrt(dx * dx + dy * dy);
              const areOverlapping = distanceBetweenCenters < circleDiameter;
              const overlapDistance = circleDiameter - distanceBetweenCenters;
              const percentOverlap = overlapDistance / circleDiameter;
              const halfPercent = percentOverlap * 0.5;
              if (areOverlapping) {
                circleA.x.value = circleA.x.value - dx * halfPercent;
                circleA.y.value = circleA.y.value - dy * halfPercent;
                circleB.x.value = circleB.x.value + dx * halfPercent;
                circleB.y.value = circleB.y.value + dy * halfPercent;
              }
            }
          }
        }
      }
    },
    [circles],
  );

  useEffect(() => {
    setTimeout(() => {
      scale.value = withTiming(1, {
        duration: 100,
      });
      if (Platform.OS !== 'web')
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, 200 * (index + 1));
  }, []);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      isDragging.value = true;
      
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (_, ctx) => {
      isDragging.value = false;
      if (Platform.OS == 'web') {
        translateX.value = withSpring(ctx.startX, {
          damping:7,
          mass:0.5,
          stiffness: 150,
        });
        translateY.value = withSpring(ctx.startY, {
          damping: 7,
          mass: 0.5,
          stiffness: 30,
        });
      }
    },
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.container, style]}>
          <View style={styles.shadowLayer}>
            <Shape
              width={width * 1.02}
              height={height * 1.02}
              color={'#00000020'}
            />
          </View>
          <View style={styles.contentView}>
            <Image contentFit="contain" style={styles.pic} source={item?.pic} />
            <Text style={styles.name}>{item?.name}</Text>
          </View>
          <Shape width={width} height={height} />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Circle;

const styles = StyleSheet.create({
  container: {position: 'absolute'},
  shadowLayer: {
    position: 'absolute',
    transform: [{rotate: `30rad`}],
    zIndex: -1,
  },
  contentView: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  pic: {
    width: 40,
    height: 40,
  },
  name: {
    textAlign: 'center',
    marginTop: 8,
  },
});
