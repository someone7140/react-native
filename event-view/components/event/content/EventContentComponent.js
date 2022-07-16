import { useContext } from "react";
import { Card } from "react-native-elements";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import { EventSearchContext } from "../../../context/EventSearchProvider";
import { responsiveWidth } from "../../../util/ResponsiveUtil";

export default function EventContentComponent(prop) {
  const { master } = useContext(EventSearchContext);
  const event = prop.event;
  const siteName = master?.sites.find((s) => s.key == event.site_id)?.label;

  async function onCardPress() {
    await Linking.openURL(event.url);
  }
  return (
    <Card style={styles.content}>
      <TouchableOpacity onPress={onCardPress}>
        <Text style={styles.siteName}>{siteName}</Text>
        <Text style={styles.title}>{event.title}</Text>
        {event.event_time && (
          <Text style={styles.eventTime}>{event.event_time}</Text>
        )}
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    width: responsiveWidth(0.95),
  },
  siteName: {
    color: "darkgray",
  },
  title: {
    marginTop: "5px",
  },
  eventTime: {
    marginTop: "5px",
    color: "darkgray",
  },
});
