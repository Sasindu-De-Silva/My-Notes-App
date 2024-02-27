import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Button,
  FlatList,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export function Home({ navigation }) {
  const [getNotes, setNotes] = useState([]);

  loadData();

  const ui = (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor: "black",
          borderBottomWidth: 1,
          width: "90%",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Create a Note");
          }}
        >
          <View style={styles.createButton}>
            <Text style={styles.regText}>Create a note</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ flex: 10 }}>
        <View style={{ marginTop: 10 }}>
          <FlatList data={getNotes} renderItem={NoteUi} />
        </View>
      </View>
    </SafeAreaView>
  );

  async function loadData() {
    const jsonValue = await AsyncStorage.getItem("key");
    const value = JSON.parse(jsonValue);

    const loadDetails = {
      mobile: value.mobile,
    };

    fetch("http://192.168.42.214/MyNotes/viewNoteData.php", {
      method: "POST",
      body: JSON.stringify(loadDetails),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        try {
          setNotes(json);
        } catch (e) {
          // return false;
        }
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  }

  function NoteUi({ item }) {
    if (item.id == 0) {
      const ui = (
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            No notes.
          </Text>
        </View>
      );

      return ui;
    } else {
      var icon;

      if (item.note_category_id == 1) {
        icon = require("./study.png");
      } else if (item.note_category_id == 2) {
        icon = require("./work.png");
      } else if (item.note_category_id == 3) {
        icon = require("./travel.png");
      }

      const des = item.description.substr(0, 17);

      const ui = (
        <Pressable
          onPress={() => {
            const details = {
              id: item.id,
            };

            navigation.navigate("View Note", details);
          }}
        >
          <View
            style={{
              backgroundColor: "#D7D7D7",
              width: 320,
              height: 70,
              margin: 5,
              borderRadius: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 2,
              }}
            >
              <Image source={icon} style={{ width: 50, height: 50 }} />
            </View>
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                flex: 3,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 15 }}>{des}</Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-start",
                flex: 5,
              }}
            >
              <Text style={{ padding: 4 }}>{item.date_time}</Text>
            </View>
          </View>
        </Pressable>
      );

      return ui;
    }
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
  },
  text1: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight: "bold",
  },
  createButton: {
    width: 140,
    height: 32,
    backgroundColor: "#22B624",
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
