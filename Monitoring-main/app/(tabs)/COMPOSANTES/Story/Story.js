// HistoryScreen.js
import React from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet } from "react-native";
import { getHistoryRecords } from "../HistoryService/HistoryService"; // Import du service d'historique

const HistoryScreen = () => {
  const historyData = getHistoryRecords();

  return (
    <SafeAreaView style={styles.container}>
      {/* Entête */}
      <Text style={styles.headerTitle}>Historique</Text>

      {/* Affichage de la liste d'historique */}
      {historyData.length > 0 ? (
        <FlatList
          data={historyData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyDate}>{item.date}</Text>
              <Text style={styles.historyDescription}>{item.description}</Text>
              <Text style={styles.historyResult}>{item.result}</Text>
            </View>
          )}
          contentContainerStyle={styles.historyList}
        />
      ) : (
        <Text style={styles.noHistory}>Aucun historique disponible.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  historyList: {
    paddingBottom: 20
  },
  historyItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10
  },
  historyDate: {
    fontSize: 16,
    fontWeight: "bold"
  },
  historyDescription: {
    fontSize: 14,
    marginVertical: 5
  },
  historyResult: {
    fontSize: 14,
    color: "blue"
  },
  noHistory: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20
  }
});

export default HistoryScreen;
