import React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';

import {useGravityAnimation} from './useCirclesHook';
import Circle, {circleDiameter} from './Circle';

const AnimatedCircles = () => {
  const circles = useGravityAnimation({
    dimensions: Dimensions.get('window'),
    numCircles: 8,
  });
  if (!circles?.length) return null;
  return (
    <>
      {circles.map((p, index) => {
        return (
          <Circle
            key={index}
            index={index}
            translateX={p.x}
            translateY={p.y}
            circles={circles}
            isCenter={p?.isCenter}
            item={p?.item}
            {...p}
          />
        );
      })}
    </>
  );
};

export default AnimatedCircles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 500,
  },
});
