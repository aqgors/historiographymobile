import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet, Modal, Image, TextInput, Switch } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';

interface Place {
  id: string;
  name: string;
  image: string;
}

const initialPlaces: Place[] = [
  { id: '1', name: "Ейфелева вежа", image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" },
  { id: '2', name: "Колізей", image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg" },
  { id: '3', name: "Мачу-Пікчу", image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg" },
  { id: '4', name: "Стоунхендж", image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Stonehenge2007_07_30.jpg" }
];

export default function HistoricalPlacesApp() {
  const [screen, setScreen] = useState<string>("list");
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16);
  const [language, setLanguage] = useState<string>("uk");

  const addPlace = (values: { name: string; image: string }, actions: any) => {
    const newPlace: Place = { id: Date.now().toString(), name: values.name, image: values.image };
    setPlaces([...places, newPlace]);
    actions.resetForm();
    setScreen("list");
  };

  const removePlace = (id: string) => {
    setPlaces(places.filter(place => place.id !== id));
  };

  const toggleTheme = () => setTheme(!theme);
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 30));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));
  const toggleLanguage = () => setLanguage(language === "uk" ? "en" : "uk");

  return (
    <View style={[styles.container, { backgroundColor: theme ? "#2c3e50" : "#f4f1eb" }]}>
      {/* Кнопка меню */}
      <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
        <Text style={styles.menuButtonText}>
          {language === "uk" ? "Меню" : "Menu"}
        </Text>
      </TouchableOpacity>

      {/* Виведення кнопок меню горизонтально */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => setScreen("list")}>
            <Text style={styles.menuText}>{language === "uk" ? "Список місць" : "Places List"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setScreen("add")}>
            <Text style={styles.menuText}>{language === "uk" ? "Додати місце" : "Add Place"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => setScreen("settings")}>
            <Text style={styles.menuText}>{language === "uk" ? "Налаштування" : "Settings"}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Виведення списку місць */}
      {screen === "list" && (
        <View>
          {places.map((place) => (
            <TouchableOpacity key={place.id} onPress={() => { setSelectedPlace(place); setModalVisible(true); }}>
              <View style={styles.item}>
                <Image source={{ uri: place.image }} style={styles.image} />
                <Text style={[styles.text, { fontSize, fontFamily: "sans-serif" }]}>{place.name}</Text>
                <Button title="❌" onPress={() => removePlace(place.id)} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Додавання місця */}
      {screen === "add" && (
        <Formik
        initialValues={{ name: "", image: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Обов'язкове поле"),
          image: Yup.string().url("Некоректний URL").required("Обов'язкове поле"),
        })}
        onSubmit={addPlace}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={styles.form}>
            <TextInput
              placeholder={language === "uk" ? "Назва місця" : "Place Name"}
              value={values.name}
              onChangeText={handleChange("name")}
              style={styles.input}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            <TextInput
              placeholder={language === "uk" ? "URL зображення" : "Image URL"}
              value={values.image}
              onChangeText={handleChange("image")}
              style={styles.input}
            />
            {errors.image && <Text style={styles.error}>{errors.image}</Text>}
            <Button title={language === "uk" ? "Додати" : "Add"} onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
      )}

      {/* Налаштування */}
      {screen === "settings" && (
        <View style={styles.settingsContainer}>
          <Text style={[styles.settingsTitle, { fontSize, fontFamily: "sans-serif" }]}>
            {language === "uk" ? "Налаштування" : "Settings"}
          </Text>

          <View style={styles.setting}>
            <Text style={styles.settingText}>
              {language === "uk" ? "Зміна теми:" : "Change Theme:"}
            </Text>
            <Switch value={theme} onValueChange={toggleTheme} />
          </View>

          <View style={styles.setting}>
            <Text style={styles.settingText}>
              {language === "uk" ? "Зміна шрифтів:" : "Change Font Size:"}
            </Text>
            <View style={styles.fontSizeControls}>
              <Button title="➕" onPress={increaseFontSize} />
              <Text style={{ fontSize }}> {language === "uk" ? "Розмір шрифта" : "Font Size"}</Text>
              <Button title="➖" onPress={decreaseFontSize} />
            </View>
          </View>

          <View style={styles.setting}>
            <Text style={styles.settingText}>
              {language === "uk" ? "Мова інтерфейсу:" : "Interface Language:"}
            </Text>
            <View style={styles.languageButtonContainer}>
              <Button title={language === "uk" ? "Англійська" : "Ukrainian"} onPress={toggleLanguage} />
            </View>
          </View>
        </View>
      )}

      {/* Модальне вікно */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPlace?.name}</Text>
            <Image source={{ uri: selectedPlace?.image }} style={styles.modalImage} />
            <Button title={language === "uk" ? "Закрити" : "Close"} onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  menuButton: {
    backgroundColor: "#8e735b",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  menuButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: "#8e735b",
    padding: 12,
    borderRadius: 5,
  },
  menuText: {
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#8e735b",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#black",
  },
  error: {
    color: "red",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 200,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  settingsContainer: {
    padding: 20,
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  setting: {
    marginBottom: 15,
  },
  settingText: {
    fontSize: 18,
    marginBottom: 10,
  },
  fontSizeControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageButtonContainer: {
    alignItems: "flex-start",
  },
});


