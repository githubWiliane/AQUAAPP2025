// HistoryScreen.js
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getHistoryRecords, clearHistoryRecords } from "../StoryService/HistoryService"; // Assurez-vous du chemin

const HistoryScreen = () => {
  const [historyData, setHistoryData] = useState([]);

  // Charge l'historique depuis le service
  const loadHistory = () => {
    const records = getHistoryRecords();
    setHistoryData(records);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Lorsque l'icône "supprimer" est pressée, vide l'historique et met à jour l'affichage
  const handleClearHistory = () => {
    clearHistoryRecords();
    setHistoryData([]); // Réinitialise l'état local de l'historique
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Entête avec titre et icône de suppression */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Historique</Text>
        <TouchableOpacity onPress={handleClearHistory} style={styles.clearButton}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>

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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
  },
  clearButton: {
    padding: 10
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
