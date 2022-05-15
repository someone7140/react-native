import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import useSWR from "swr";

import SearchModalComponent from "./SearchModalComponent";
import { getSearchCondition } from "../../service/api/SearchPlaceService";

export default function SearchComponent() {
  const { data, error } = useSWR("/get_search_condition", async () => {
    return await getSearchCondition();
  });

  if (!data)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  if (error)
    return (
      <View style={styles.container}>
        <Text>failed to load</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <SearchModalComponent searchCondition={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
