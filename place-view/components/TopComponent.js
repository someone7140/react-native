import { StyleSheet, View } from "react-native";
import PlaceComponent from "./place/PlaceComponent";
import SearchComponent from "./search/SearchComponent";
import { SearchPlaceProvider } from "../context/SearchPlaceProvider";

export default function TopComponent() {
  return (
    <SearchPlaceProvider>
      <View style={styles.container}>
        <SearchComponent />
        <PlaceComponent />
      </View>
    </SearchPlaceProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
