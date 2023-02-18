import { StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "@apollo/client";
import HomeScreen from "./src/screens/Home";
import { createClient } from "./src/graphql/apollo-client";

export default function App() {
  // Initialize Apollo Client
  const client = createClient();

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>My Countries App</Text>
        <HomeScreen />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
