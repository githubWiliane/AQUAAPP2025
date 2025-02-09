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
  { id: "A", label: "Monocristallin  - 30W / 12Vcc", power: 30, panelVoltage: 12, usageVoltage: 12 },
  { id: "B", label: "Monocristallin  - 50W / 12Vcc", power: 50, panelVoltage: 12, usageVoltage: 12 },
  { id: "C", label: "Monocristallin  - 100W / 12Vcc", power: 100, panelVoltage: 12, usageVoltage: 12 },
  { id: "D", label: "Monocristallin  - 200W / 12Vcc", power: 200, panelVoltage: 12, usageVoltage: 12 },
  { id: "E", label: "Monocristallin  - 300W / 24Vcc", power: 300, panelVoltage: 24, usageVoltage: 24 },
  { id: "F", label: "Polycristallin  - 150W / 12Vcc", power: 150, panelVoltage: 12, usageVoltage: 12 },
  { id: "G", label: "Polycristallin   - 250W / 24Vcc", power: 250, panelVoltage: 24, usageVoltage: 24 },
];

// Options pour les batteries
const batteryOptions = [
  { id: "Type1", label: "AGM  - 38Ah / 12Vcc", capacity: 38, voltage: 12 },
  { id: "Type2", label: "AGM  - 50Ah / 12Vcc", capacity: 50, voltage: 12 },
  { id: "Type3", label: "AGM  - 75Ah / 12Vcc", capacity: 75, voltage: 12 },
  { id: "Type4", label: "AGM  - 100Ah / 12Vcc", capacity: 100, voltage: 12 },
  { id: "Type5", label: "AGM  - 200Ah / 12Vcc", capacity: 200, voltage: 12 },
  { id: "Type6", label: "Lithium  - 100Ah / 48VVcc", capacity: 100, voltage: 48 },
  { id: "Type7", label: "Lithium  - 200Ah / 48VVcc", capacity: 200, voltage: 48 },
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

  // Par défaut, le système est dimensionné pour 1 jour d'autonomie
  const [autonomyDays, setAutonomyDays] = useState(1);

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

  // Calcul de la demande en énergie des appareils (en Wh) sur une journée
  const totalEnergy = devices.reduce(
    (sum, device) => sum + device.power * device.quantity * device.hours,
    0
  );

  // Calcul de la demande journalière avec pertes (30%) – utilisé pour les panneaux
  const totalEnergyWithLosses = totalEnergy * 1.3;

  // Calcul de la consommation totale sur l'autonomie choisie
  const totalEnergyForAutonomy = totalEnergy * autonomyDays;
  const totalEnergyWithLossesForAutonomy = totalEnergyForAutonomy * 1.3;

  // Calcul de la production journalière par panneau (en Wh)
  const dailyEnergyPerPanel = selectedPanel.power * parseFloat(sunFactor);
  const numPanels = Math.ceil(totalEnergyWithLosses / dailyEnergyPerPanel);

  // Calcul de la capacité totale de batterie requise en Ah sur l'autonomie choisie
  const batteryCapacityTotal = totalEnergyForAutonomy / selectedBattery.voltage;
  const numBatteries = Math.ceil(batteryCapacityTotal / selectedBattery.capacity);

  // Calcul de la capacité du régulateur (ampères)
  const regulatorCurrent =
    totalEnergyWithLosses > 0
      ? Math.ceil((selectedPanel.power * numPanels) / selectedBattery.voltage)
      : 0;
  const recommendedRegulator =
    totalEnergyWithLosses > 0
      ? `régulateur de ${selectedBattery.voltage}Vcc - ${regulatorCurrent}A`
      : "0";

  // Formatage pour l'affichage des résultats
  const displayedDailyEnergy =
    totalEnergyWithLosses > 0 ? totalEnergyWithLosses.toFixed(2) + " Wh" : "0";
  const displayedAutonomyEnergy =
    totalEnergyWithLossesForAutonomy > 0 ? totalEnergyWithLossesForAutonomy.toFixed(2) + " Wh" : "0";
  const displayedNumBatteries =
    totalEnergyWithLosses > 0
      ? `${numBatteries} (${selectedBattery.capacity}Ah/${selectedBattery.voltage}Vcc)`
      : "0";
  const displayedNumPanels =
    totalEnergyWithLosses > 0
      ? `${numPanels} (${selectedPanel.power}W/${selectedPanel.panelVoltage}V/${selectedPanel.usageVoltage}V)`
      : "0";

  // Fonction appelée lors du clic sur refresh pour enregistrer l'historique et réinitialiser les champs
  const resetAll = () => {
    const devicesSummary = devices
      .map((device) => `${device.name} (${device.power}W)`)
      .join(", ");

    const record = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      description: devicesSummary ? `Appareils: ${devicesSummary}` : "Aucun appareil ajouté",
      result: totalEnergyWithLossesForAutonomy > 0 ? totalEnergyWithLossesForAutonomy.toFixed(2) + " Wh" : "0",
      details: {
        panels: {
          number: totalEnergyWithLosses > 0 ? numPanels : 0,
          info: `${selectedPanel.power}W / ${selectedPanel.panelVoltage}V / ${selectedPanel.usageVoltage}V`
        },
        batteries: {
          number: totalEnergyWithLosses > 0 ? numBatteries : 0,
          info: `${selectedBattery.capacity}Ah / ${selectedBattery.voltage}Vcc`
        },
        regulator: recommendedRegulator,
        autonomyDays
      }
    };
    addHistoryRecord(record);

    // Réinitialisation des champs, de la liste des appareils ET de l'autonomie
    setDevices([]);
    setDeviceName("");
    setPower("");
    setQuantity("");
    setHours("");
    setAutonomyDays(1);  // Réinitialise l'autonomie à 1 jour
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

      {/* Contrôle pour l'autonomie en jours avec des boutons Prev et Next */}
      <View style={styles.autonomyContainer}>
        <Text style={styles.label}>Autonomie en jours :</Text>
        <View style={styles.autonomyControl}>
          <TouchableOpacity
            onPress={() => setAutonomyDays(Math.max(1, autonomyDays - 1))}
            style={styles.autonomyButton}
          >
            <Text style={styles.buttonText}>Prev</Text>
          </TouchableOpacity>
          <Text style={styles.autonomyValue}>{autonomyDays}</Text>
          <TouchableOpacity
            onPress={() => setAutonomyDays(autonomyDays + 1)}
            style={styles.autonomyButton}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Affichage des résultats */}
      <View style={styles.resultsContainer}>
        <Text style={styles.result}>
          <Text style={styles.labelText}>Besoins quotidiens en énergie : </Text>
          <Text style={styles.valueText}>{displayedDailyEnergy}</Text>
        </Text>
        <Text style={styles.result}>
          <Text style={styles.labelText}>Besoins totaux sur {autonomyDays} jours: </Text>
          <Text style={styles.valueText}>{displayedAutonomyEnergy}</Text>
        </Text>
        <Text style={styles.result}>
          <Text style={styles.labelText}>Nombre de batteries: </Text>
          <Text style={styles.valueText}>{displayedNumBatteries}</Text>
        </Text>
        <Text style={styles.result}>
          <Text style={styles.labelText}>Nombre de panneaux solaires: </Text>
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
    color: "green"
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
  },
  autonomyContainer: {
    alignItems: "center",
    marginTop: 15
  },
  autonomyControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  autonomyButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    fontSize: 16
  },
  autonomyValue: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default SolarEnergyCalculator;
