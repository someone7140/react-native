import { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { EventSearchContext } from "../../../context/EventSearchProvider";

export default function EventDateComponent(prop) {
  const { eventDate, setEventDate } = useContext(EventSearchContext);

  const onPress = () => {
    setEventDate(prop.dateKey);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={
          prop.dateKey === eventDate
            ? styles.buttonSelected
            : styles.buttonNotSelected
        }
      >
        <Text>{prop.dateLabel}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonNotSelected: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8ff",
    marginRight: "5px",
    paddingBottom: "20px",
  },
  buttonSelected: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#dcdcdc",
    marginRight: "5px",
    paddingBottom: "20px",
  },
});
