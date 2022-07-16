import { useContext, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { useQuery } from "react-query";
import { EventSearchContext } from "../context/EventSearchProvider";
import { getSearchMaster } from "../service/api/EventSearchService";
import EventContainerComponent from "./event/EventContainerComponent";

export default function TopComponent() {
  const { master, setMaster } = useContext(EventSearchContext);
  const { data, isError, isLoading } = useQuery("master", getSearchMaster);

  useEffect(() => {
    if (data) {
      setMaster(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.containerNotContents}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.containerNotContents}>
        <Text>データの取得に失敗しました</Text>
      </View>
    );
  }

  return (
    <>
      {master && (
        <View style={styles.container}>
          <EventContainerComponent />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  containerNotContents: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: "10px",
  },
});
