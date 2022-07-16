import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TopComponent from "./components/TopComponent";
import { EventSearchProvider } from "./context/EventSearchProvider";

export default function App() {
  const Stack = createStackNavigator();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
      },
    },
  });

  return (
    <EventSearchProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="event search"
              component={TopComponent}
              options={{
                headerTitle: "イベント検索",
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </EventSearchProvider>
  );
}
