import React from "react";
import { StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
  Directions,
} from "react-native-gesture-handler";

const Card = ({
  item,
  index,
  animatedValue,
  currentIndex,
  prevIndex,
  maxVisibleValue,
  dataLength,
}) => {
  // Gesture Handler Code
  const leftflingGesture = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd((e) => {
      if (currentIndex.value !== dataLength - 1) {
        animatedValue.value = withTiming((currentIndex.value += 1), {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        });
        prevIndex.value = currentIndex.value - 1;
      }
    });
  const rightflingGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd((e) => {
      if (currentIndex.value !== 0) {
        animatedValue.value = withTiming((currentIndex.value -= 1), {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        });
        prevIndex.value = currentIndex.value;
      }
    });

  const composedGesture = Gesture.Simultaneous(
    leftflingGesture,
    rightflingGesture
  );
  // Gesture Handler Code

  // Reanimated Code
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [30, 1, -30]
    );
    const translateX_IntialCard = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [50, 1, -100]
    );
    const scale = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [0.9, 1, 1.1]
    );
    const opacity = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [0.5, 1, 0]
    );
    return {
      transform: [
        {
          translateX:
            index === prevIndex.value ? translateX_IntialCard : translateX,
        },
        { scale },
      ],
      opacity:
        index < currentIndex.value + maxVisibleValue - 1
          ? opacity
          : index === currentIndex.value + maxVisibleValue - 1
          ? withTiming(0.5)
          : withTiming(0),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [20, 1, -20]
    );

    const opacity = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [0, 1, 0]
    );

    return {
      transform: [{ translateY }],
      opacity,
    };
  });
  // Reanimated Code

  return (
    <>
      <GestureDetector gesture={composedGesture}>
        <Animated.Image
          source={item.photo}
          style={[styles.image, animatedStyle, { zIndex: dataLength - index }]}
        />
      </GestureDetector>

      <Animated.View style={[styles.view, animatedTextStyle]}>
        <Text style={[styles.title]}>{item.title}</Text>
        <Text style={[styles.location]}>
          <Ionicons name="location" size={18} color="green" />
          {item.location}
        </Text>
      </Animated.View>
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 50,
    width: 330,
    height: 520,
    borderRadius: 15,
  },
  view: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    top: 600,
    width: 330,
    height: 70,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    alignSelf: "center",
  },
  location: {
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "center",
  },
});
