import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Alert,
} from "react-native";

export function ViewNote({ navigation, route }) {
  const [getTitle, setTitle] = useState("");
  const [getDescription, setDescription] = useState("");
  const [getCategory, setCategory] = useState("");
  const [getDate, setDate] = useState("");

  note();
  const ui = (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          marginStart: 20,
          paddingTop: 20,
          // flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Title : </Text>
        <Text style={{ fontSize: 20 }}>{getTitle}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          marginStart: 20,
          paddingTop: 20,
          // flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Category : </Text>
        <Text style={{ fontSize: 20 }}>{getCategory}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          marginStart: 20,
          paddingTop: 20,
          // flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Date & Time : </Text>
        <Text style={{ fontSize: 20 }}>{getDate}</Text>
      </View>
      <View
        style={{
          flex: 5,
          alignItems: "flex-start",
          marginStart: 20,
          paddingTop: 20,
          // flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Description : </Text>
        <Text style={{ fontSize: 20 }}>{getDescription}</Text>
      </View>
    </SafeAreaView>
  );

  async function note() {
    const loadDetails = {
      id: route.params.id,
    };

    fetch("http://192.168.42.214/MyNotes/viewNote.php", {
      method: "POST",
      body: JSON.stringify(loadDetails),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setTitle(json.title);
        setDescription(json.description);
        // setCategory(json.note_category_id);
        setDate(json.date_time);
        if (json.note_category_id == 1) {
          setCategory("Study");
        } else if (json.note_category_id == 2) {
          setCategory("Work");
        } else if (json.note_category_id == 3) {
          setCategory("Travel");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  return ui;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  view1: {},
});
