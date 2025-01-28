import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

const WifiConnection = () => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    WifiManager.connectToSSID("Your_SSID")
      .then(() => {
        fetch('http://ESP32_IP_ADDRESS')
          .then((response) => response.text())
          .then((data) => {
            const tempValue = data.match(/Temperature:\s(\d+\.\d+)/)[1];
            setTemperature(parseFloat(tempValue));
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <Text>Température (Wi-Fi) : {temperature}°C</Text>
    </View>
  );
};

export default WifiConnection;
