import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useQuery } from "react-query";
import { EventSearchContext } from "../../context/EventSearchProvider";
import EventContentComponent from "./content/EventContentComponent";
import EventDatesSelectComponent from "./date/EventDatesSelectComponent";
import SiteSelectComponent from "./site/SiteSelectComponent";
import { searchEvents } from "../../service/api/EventSearchService";

export default function EventContainerComponent() {
  const { eventDate, location, master, selectSite } =
    useContext(EventSearchContext);
  const { data, isError, isLoading, refetch } = useQuery("search", () => {
    return searchEvents(location, eventDate);
  });
  const [displayEvents, setDisplayEvents] = useState([]);

  useEffect(() => {
    if (location && eventDate) {
      refetch();
    }
  }, [location, eventDate]);

  useEffect(() => {
    if (data) {
      if (selectSite) {
        setDisplayEvents(data.filter((e) => e.site_id == selectSite));
      } else {
        setDisplayEvents(data);
      }
    }
  }, [data, selectSite]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>データの取得に失敗しました</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.subTitle}>
          <View>
            <Text>
              {master.locations.find((l) => l.key == location).label}
              のイベント検索
            </Text>
          </View>
          <View style={styles.siteSelect}>
            <SiteSelectComponent />
          </View>
        </View>
        <View style={styles.dateSelect}>
          <EventDatesSelectComponent />
        </View>
      </View>
      <ScrollView style={styles.scrollableView}>
        {displayEvents.map((e) => (
          <EventContentComponent event={e} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  subTitle: {
    marginTop: "5px",
    flexDirection: "row",
  },
  dateSelect: {
    marginTop: "5px",
  },
  siteSelect: {
    marginLeft: "20px",
  },
  scrollableView: {
    marginTop: "20px",
    height: 500,
  },
});
