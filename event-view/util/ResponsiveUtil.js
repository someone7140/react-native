import { Dimensions } from "react-native";

export const responsiveWidth = (width) => {
  return Dimensions.get("window").width * width;
};

export const responsiveHeight = (height) => {
  return Dimensions.get("window").height * height;
};
