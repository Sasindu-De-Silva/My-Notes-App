import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

export function CreateNote({ navigation }) {
  const [getTitle, setTitle] = useState("");
  const [getCategory, setCategory] = useState("Study");
  const [getDescription, setDescription] = useState("");

  const ui = (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.view1}>
          <Text style={styles.text1}>Title :</Text>
          <TextInput style={styles.textInput1} onChangeText={setTitle} />
        </View>

        <View style={styles.view1}>
          <Text style={styles.text1}>Category :</Text>
          <View style={styles.selector}>
            <SelectDropdown
              data={["Study", "Work", "Travel"]}
              onSelect={setCategory}
              defaultValue={"Study"}
              // style={styles.selector}
              buttonStyle={{
                backgroundColor: "#EEEEEE",
                width: 240,
                height: 30,
                backgroundColor: "#EEEEEE",
                borderBottomColor: "#7D7D7D",
                borderBottomWidth: 0.5,
                borderRadius: 8,
                paddingStart: 10,
              }}
            />
          </View>
        </View>
        <View style={styles.view1}>
          <Text style={styles.text1}>Description :</Text>
          <TextInput style={styles.textInput1} onChangeText={setDescription} />
        </View>
      </View>
      <View>
        <Pressable style={{ marginTop: 20 }} onPress={createNote}>
          <View style={styles.regButton}>
            <Text style={styles.regText}>Create</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  async function createNote() {
    const jsonValue = await AsyncStorage.getItem("key");
    const value = JSON.parse(jsonValue);

    const noteDetails = {
      title: getTitle,
      category: getCategory,
      description: getDescription,
      mobile: value.mobile,
    };

    fetch("http://192.168.42.214/MyNotes/createNote.php", {
      method: "POST",
      body: JSON.stringify(noteDetails),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        if (text == "Saved") {
          Alert.alert("Alert", "Save successfully");
          navigation.navigate("My Notes");
        } else {
          Alert.alert("Alert", text);
        }
      })
      .catch((error) => {
        Alert("Error", error);
      });
  }

  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput1: {
    width: 240,
    fontSize: 16,
    backgroundColor: "#F3F3F3",
    borderBottomColor: "#7D7D7D",
    borderBottomWidth: 1,
  },
  view1: {
    marginBottom: 20,
    // flexDirection: "row",
    // alignItems: "center",
  },
  text1: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight: "bold",
  },
  regButton: {
    width: 200,
    height: 32,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  regText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

// title, description, category(study, work, travel)
