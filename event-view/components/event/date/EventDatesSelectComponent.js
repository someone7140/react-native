import { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  dateDisplayFormattedStr,
  dateKeyFormattedStr,
} from "../../../util/DateUtil";
import { responsiveWidth } from "../../../util/ResponsiveUtil";
import EventDateComponent from "./EventDateComponent";

export default function EventDatesSelectComponent() {
  let eventDates = [];

  for (let i = 0; i < 14; i++) {
    const targetDate = new Date();
    if (i > 0) {
      targetDate.setDate(targetDate.getDate() + i);
    }
    eventDates.push({
      key: dateKeyFormattedStr(targetDate),
      label: dateDisplayFormattedStr(targetDate),
    });
  }

  const Arrow = ({ children, onClick, style }) => {
    return (
      <>
        <TouchableOpacity onPress={onClick} style={style}>
          {children}
        </TouchableOpacity>
      </>
    );
  };

  const LeftArrow = () => {
    const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
    return (
      <Arrow onClick={() => scrollPrev()} style={styles.leftArrow}>
        <Icon
          name="angle-left"
          size={40}
          color={isFirstItemVisible ? "white" : "black"}
        />
      </Arrow>
    );
  };

  const RightArrow = () => {
    const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
    return (
      <Arrow onClick={() => scrollNext()} style={styles.rightArrow}>
        <Icon
          name="angle-right"
          size={40}
          color={isLastItemVisible ? "white" : "black"}
        />
      </Arrow>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {eventDates.map((d) => (
            <EventDateComponent
              itemId={d.key}
              dateKey={d.key}
              dateLabel={d.label}
            />
          ))}
        </ScrollMenu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  menu: {
    width: responsiveWidth(0.9),
  },
  rightArrow: {
    marginLeft: "15px",
  },
  leftArrow: {
    marginRight: "15px",
  },
});
