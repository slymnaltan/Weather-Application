import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { ImageBackground } from "react-native";
import axios from "axios";

const api_key = "bced16ef9df790436829725407ff527e";

// Weather icons for different conditions
const weatherIcons = {
  "01d": require("../assets/clear.png"),
  "01n": require("../assets/clear.png"),
  "02d": require("../assets/cloud.png"),
  "02n": require("../assets/cloud.png"),
  "03d": require("../assets/drizzle.png"),
  "03n": require("../assets/drizzle.png"),
  "04d": require("../assets/drizzle.png"),
  "04n": require("../assets/drizzle.png"),
  "09d": require("../assets/rain.png"),
  "09n": require("../assets/rain.png"),
  "10d": require("../assets/rain.png"),
  "10n": require("../assets/rain.png"),
  "13d": require("../assets/snow.png"),
  "13n": require("../assets/snow.png"),
  "50d": require("../assets/humidity.png"),
  "50n": require("../assets/humidity.png"),
};

const weatherBackgrounds = {
  "01d": require("../assets/clear-bg.jpg"),
  "01n": require("../assets/clear-bg.jpg"),
  "02d": require("../assets/cloud-bg.jpg"),
  "02n": require("../assets/cloud-bg.jpg"),
  "03d": require("../assets/cloud-bg.jpg"),
  "03n": require("../assets/cloud-bg.jpg"),
  "04d": require("../assets/cloud-bg.jpg"),
  "04n": require("../assets/cloud-bg.jpg"),
  "09d": require("../assets/rain-bg.jpg"),
  "09n": require("../assets/rain-bg.jpg"),
  "10d": require("../assets/rain-bg.jpg"),
  "10n": require("../assets/rain-bg.jpg"),
  "13d": require("../assets/snow-bg.jpg"),
  "13n": require("../assets/snow-bg.jpg"),
};


// HomeScreen component
const HomeScreen = () => {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [weeklyInfo, setWeeklyInfo] = useState([]);

  // Fetch current weather
  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching current weather:", error);
    }
  };

  // Fetch weekly forecast
  const fetchWeeklyInfo = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api_key}`
      );
      const dailyData = response.data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );
      setWeeklyInfo(dailyData);
    } catch (error) {
      console.error("Error fetching weekly forecast:", error);
    }
  };

  useEffect(() => {
    fetchWeather("London");
    fetchWeeklyInfo("London");
    setCity('');
  }, []);

  const handleSearch = () => {
    fetchWeather(city);
    fetchWeeklyInfo(city);
    setCity('');
  };

  return (
    <ImageBackground
      source={weather ? weatherBackgrounds[weather.weather[0].icon] : null}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content} >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>WeatherApp</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Please enter a city name"
              value={city}
              onChangeText={setCity}
            />
            <Button title="Search" onPress={handleSearch} style={styles.searchButton} />
          </View>
        </View>

        {weather && (
          <View style={styles.weatherContainer}>
            <Image
              source={weatherIcons[weather.weather[0].icon]}
              style={styles.weatherIcon}
            />
            <Text style={styles.mainText}>{`${weather.main.temp}°C ,   ${weather.name}`}</Text>
            <View style={styles.humidityWindContainer}>
              <View style={styles.humidityContainer}>
                <Image
                  source={require("../assets/humidity.png")}
                  style={styles.weatherSmallIcon}
                />
                <Text style={styles.smallText}>{`${weather.main.humidity}%`}</Text>
              </View>
              <View style={styles.windContainer}>
                <Image
                  source={require("../assets/wind.png")}
                  style={styles.weatherSmallIcon}
                />
                <Text style={styles.smallText}>{`${weather.wind.speed} m/s`}</Text>
              </View>
            </View>
          </View>
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView} >
          {weeklyInfo.map((day, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>
                {new Date(day.dt_txt).toLocaleDateString("tr-TR", {
                  weekday: "long",
                })}
              </Text>
              <Image
                source={weatherIcons[day.weather[0].icon]}
                style={styles.weatherIcons}
              />
              <Text style={styles.cardText}>{`${day.main.temp}°C`}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",

    justifyContent: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  content: {
    flex: 2,
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  header: {
    fontSize: 36, // büyütüldü
    fontWeight: "bold", // kalınlaştırıldı
    textAlign: "center",
    color: "#fff", // daha belirgin görünmesi için beyaz yapıldı
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "70%",
  },
  weatherContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  weatherIcon: {
    width: 250,
    height: 250,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom:18
  },  
  humidityWindContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom:20
  },
  humidityContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 20,
  },
  windContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  smallText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },  
  weatherSmallIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "lightblue",
    borderWidth: 0.2,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },  
  weatherIcons: {
    width: 100,
    height: 100,
  },
});

export default HomeScreen;
