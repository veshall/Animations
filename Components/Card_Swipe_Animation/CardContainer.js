import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./Card";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const _DATA = [
  {
    title: "Effile Tower",
    location: "Paris, France",
    photo: require("../assets/CardPhotos/1.jpg"),
  },
  {
    title: "Macchu Picchu",
    location: "Cusco, Peru",
    photo: require("../assets/CardPhotos/2.jpg"),
  },
  {
    title: "Manarola",
    location: "Liguria, Italy",
    photo: require("../assets/CardPhotos/3.jpg"),
  },
  {
    title: "Leaning Tower",
    location: "Pesa, Italy",
    photo: require("../assets/CardPhotos/4.jpg"),
  },
  {
    title: "Taj Mahal",

    location: "Agra, India",
    photo: require("../assets/CardPhotos/5.jpg"),
  },
];

const CardContainer = () => {
  const { width, height } = useWindowDimensions();
  const deviceWidth = width;
  const deviceHeight = height;

  const animatedValue = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const prevIndex = useSharedValue(0);
  const maxVisibleValue = 3;

  return (
    <>
      <Text style={styles.heading}>Card Swipe Animation</Text>
      <View
        style={{
          width: deviceWidth,
          height: deviceHeight,
          alignItems: "center",
        }}
      >
        {_DATA.map((item, index) => {
          return (
            <>
              <Card
                key={index}
                item={item}
                index={index}
                animatedValue={animatedValue}
                currentIndex={currentIndex}
                prevIndex={prevIndex}
                maxVisibleValue={maxVisibleValue}
                dataLength={_DATA.length}
              />
            </>
          );
        })}
      </View>
    </>
  );
};

export default CardContainer;

const styles = StyleSheet.create({
  heading: {
    top: 45,
    borderRadius: 12,
    fontSize: 28,
    alignSelf: "center",
    fontWeight: "700",
    letterSpacing: -0.5,
    lineHeight: 40,
    padding: 10,
    marginBottom: 30,
  },
});
