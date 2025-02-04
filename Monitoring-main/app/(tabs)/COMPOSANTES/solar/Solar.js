import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addHistoryRecord } from "../HistoryService/HistoryService"; // Adaptez le chemin si nécessaire

// Options pour les panneaux solaires
const panelOptions = [
  { id: "A", label: "Monocristallin - 100W / 12Vcc", power: 50, panelVoltage: 12, usageVoltage: 12 },
  { id: "B", label: "Monocristallin - 200W / 12Vcc", power: 100, panelVoltage: 12, usageVoltage: 12 },
  { id: "C", label: "Monocristallin - 300W / 24Vcc", power: 50, panelVoltage: 24, usageVoltage: 12 },
  { id: "C", label: "Polycristallin - 150W / 12Vcc", power: 50, panelVoltage: 24, usageVoltage: 12 },
  { id: "C", label: "Polycristallin - 250W / 24Vcc", power: 50, panelVoltage: 24, usageVoltage: 12 },
];

// Options pour les batteries
const batteryOptions = [
  { id: "Type1", label: "AGM - 38Ah / 12Vcc", capacity: 38, voltage: 12 },
  { id: "Type2", label: "AGM - 100Ah / 12Vcc", capacity: 100, voltage: 12 },
  { id: "Type3", label: "AGM - 200Ah / 12Vcc", capacity: 100, voltage: 12 },
  { id: "Type4", label: "Lithium - 100Ah / 48VVcc", capacity: 100, voltage: 12 },
  { id: "Type5", label: "Lithium - 200Ah / 48VVcc", capacity: 100, voltage: 12 },
   

];

const SolarEnergyCalculator = () => {
  const navigation = useNavigation();

  // États pour les appareils
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [power, setPower] = useState("");
  const [quantity, setQuantity] = useState("");
  const [hours, setHours] = useState("");
  const [sunFactor, setSunFactor] = useState("5"); // Facteur régional d'ensoleillement
  const [autonomyDays, setAutonomyDays] = useState("3"); // (non utilisé dans les calculs actuels)

  // Sélecteur de panneau solaire
  const [selectedPanel, setSelectedPanel] = useState(panelOptions[0]);

  // Sélecteur de batterie
  const [selectedBattery, setSelectedBattery] = useState(batteryOptions[0]);

  // Ajout d'un appareil
  const addDevice = () => {
    if (deviceName && power && quantity && hours) {
      setDevices([
        ...devices,
        {
          id: Date.now().toString(),
          name: deviceName,
          power: parseFloat(power),
          quantity: parseFloat(quantity),
          hours: parseFloat(hours)
        }
      ]);
      setDeviceName("");
      setPower("");
      setQuantity("");
      setHours("");
    }
  };

  // Calcul de la demande en énergie des appareils (en Wh)
  const totalEnergy = devices.reduce(
    (sum, device) => sum + device.power * device.quantity * device.hours,
    0
  );
  // On ajoute 30% de pertes système
  const totalEnergyWithLosses = totalEnergy * 1.3;

  // Calcul de la production journalière par panneau en Wh
  const dailyEnergyPerPanel = selectedPanel.power * parseFloat(sunFactor);
  const numPanels = Math.ceil(totalEnergyWithLosses / dailyEnergyPerPanel);

  // Calcul de la capacité totale de batterie requise en Ah
  const batteryCapacityTotal = totalEnergyWithLosses / parseFloat(selectedBattery.voltage);
  const numBatteries = Math.ceil(batteryCapacityTotal / selectedBattery.capacity);

  // Calcul de la capacité du régulateur (ampères)
  // Si aucun appareil n'est ajouté, le total d'énergie est nul et on affichera 0
  const regulatorCurrent =
    totalEnergyWithLosses > 0
      ? Math.ceil((selectedPanel.power * numPanels) / selectedBattery.voltage)
      : 0;
  // Construction du libellé du régulateur
  const recommendedRegulator =
    totalEnergyWithLosses > 0
      ? `régulateur de ${selectedBattery.voltage}Vcc - ${regulatorCurrent}A`
      : "0";

  // Pour l'affichage, si aucun appareil n'est ajouté, on force l'affichage de "0"
  const displayedEnergy = totalEnergyWithLosses > 0 ? totalEnergyWithLosses.toFixed(2) + " Wh" : "0";
  const displayedNumBatteries = totalEnergyWithLosses > 0 ? `${numBatteries} (${selectedBattery.capacity}Ah/${selectedBattery.voltage}Vcc)` : "0";
  const displayedNumPanels = totalEnergyWithLosses > 0 ? `${numPanels} (${selectedPanel.power}W/${selectedPanel.panelVoltage}V/${selectedPanel.usageVoltage}V)` : "0";

  // Fonction appelée lors du clic sur refresh pour enregistrer l'historique et réinitialiser les champs
  const resetAll = () => {
    // Création d'un résumé des appareils ajoutés (nom et puissance)
    const devicesSummary = devices.map(device => `${device.name} (${device.power}W)`).join(", ");

    const record = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      description: devicesSummary ? `Appareils: ${devicesSummary}` : "Aucun appareil ajouté",
      result: totalEnergyWithLosses > 0 ? totalEnergyWithLosses.toFixed(2) + " Wh" : "0",
      details: {
        panels: {
          number: totalEnergyWithLosses > 0 ? numPanels : 0,
          info: `${selectedPanel.power}W / ${selectedPanel.panelVoltage}V / ${selectedPanel.usageVoltage}V`
        },
        batteries: {
          number: totalEnergyWithLosses > 0 ? numBatteries : 0,
          info: `${selectedBattery.capacity}Ah / ${selectedBattery.voltage}Vcc`
        },
        regulator: recommendedRegulator
      }
    };
    addHistoryRecord(record);

    // Réinitialisation des champs et de la liste des appareils
    setDevices([]);
    setDeviceName("");
    setPower("");
    setQuantity("");
    setHours("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require("../solar/Solar.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")} style={styles.historyIcon}>
          <Ionicons name="time-outline" size={62} color="grey" />
        </TouchableOpacity>
      </View>

      {/* Titre */}
      <Text style={styles.title}>Calcul des Besoins en Énergie Solaire</Text>

      {/* Saisie des appareils */}
      <TextInput
        placeholder="Nom de l'appareil"
        value={deviceName}
        onChangeText={setDeviceName}
        style={styles.input}
      />
      <TextInput
        placeholder="Puissance (W)"
        value={power}
        onChangeText={setPower}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre d'unités"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Durée d'utilisation (h)"
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Ajouter l'appareil" onPress={addDevice} />
        <TouchableOpacity onPress={resetAll} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Espace sous le bouton */}
      <View style={styles.spaceBelowButton} />

      {/* Liste des appareils ajoutés */}
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.deviceText}>
            {item.name}: {item.power}W x {item.quantity} x {item.hours}h ={" "}
            {item.power * item.quantity * item.hours} Wh
          </Text>
        )}
        style={{ width: "100%" }}
        scrollEnabled={false}
      />

      {/* Sélecteur du type de panneau solaire */}
      <Text style={styles.label}>Sélectionnez le type de panneau solaire :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedPanel.id}
          style={styles.picker}
          onValueChange={(itemValue) =>
            setSelectedPanel(panelOptions.find((p) => p.id === itemValue))
          }
        >
          {panelOptions.map((option) => (
            <Picker.Item key={option.id} label={option.label} value={option.id} />
          ))}
        </Picker>
      </View>

      {/* Sélecteur du type de batterie */}
      <Text style={styles.label}>Sélectionnez le type de batterie :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBattery.id}
          style={styles.picker}
          onValueChange={(itemValue) =>
            setSelectedBattery(batteryOptions.find((b) => b.id === itemValue))
          }
        >
          {batteryOptions.map((option) => (
            <Picker.Item key={option.id} label={option.label} value={option.id} />
          ))}
        </Picker>
      </View>

      {/* Affichage des résultats */}
      <View style={styles.resultsContainer}>
        <Text style={styles.result}>
          <Text style={styles.labelText}>Besoins quotidiens en énergie: </Text>
          <Text style={styles.valueText}>{displayedEnergy}</Text>
        </Text>
        <Text style={styles.result}>
          <Text style={styles.labelText}>
            Nombre de batteries:{" "}
          </Text>
          <Text style={styles.valueText}>{displayedNumBatteries}</Text>
        </Text>
        <Text style={styles.result}>
          <Text style={styles.labelText}>
            Nombre de panneaux solaires:{" "}
          </Text>
          <Text style={styles.valueText}>{displayedNumPanels}</Text>
        </Text>
        <Text style={styles.result}>
          <Text style={styles.labelText}>Régulateur recommandé: </Text>
          <Text style={styles.valueText}>{recommendedRegulator}</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center"
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 10,
    transform: [{ scale: 1.5 }]
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    color: "black"
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "80%"
  },
  spaceBelowButton: {
    height: 20
  },
  pickerContainer: {
    width: "80%",
    backgroundColor: "#37474F",
    borderRadius: 5,
    marginBottom: 10
  },
  picker: {
    height: 50,
    width: "100%",
    color: "white"
  },
  deviceText: {
    fontSize: 16,
    color: "black",
    marginVertical: 2
  },
  resultsContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "flex-start"
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5
  },
  labelText: {
    color: "black"
  },
  valueText: {
    color: "skyblue"
  },
  icon: {
    width: 140,
    height: 200,
    tintColor: "black"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  refreshButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginLeft: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 2,
    left: 325
  },
  historyIcon: {
    padding: 10
  }
});

export default SolarEnergyCalculator;
