import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import { SearchPlaceContext } from "../../context/SearchPlaceProvider";

export default function PlaceComponent() {
  const { searchInfo, setSearchInfo } = useContext(SearchPlaceContext);

  return (
    <View style={styles.container}>
      {!searchInfo && <Text>検索条件を入力してください</Text>}
      {searchInfo && <Text>ここに一覧を表示</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
