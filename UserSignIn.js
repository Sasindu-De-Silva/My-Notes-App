import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function UserSignIn({ navigation }) {
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");

  const ui = (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.view1}>
          <Text style={styles.text1}>Mobile :</Text>
          <TextInput
            style={styles.textInput1}
            inputMode="tel"
            onChangeText={setMobile}
          />
        </View>
        <View style={styles.view1}>
          <Text style={styles.text1}>Password :</Text>
          <TextInput style={styles.textInput1} onChangeText={setPassword} />
        </View>
      </View>
      <View>
        <Pressable style={{ marginTop: 20 }} onPress={logIn}>
          <View style={styles.regButton}>
            <Text style={styles.regText}>Log In</Text>
          </View>
        </Pressable>
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => {
            navigation.navigate("UserRegistration");
          }}
        >
          <View style={styles.logButton}>
            <Text style={styles.regText}>Go to Register</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  async function logIn() {
    const loginDetails = {
      mobile: getMobile,
      password: getPassword,
    };

    fetch("http://192.168.42.214/MyNotes/loginUser.php", {
      method: "POST",
      body: JSON.stringify(loginDetails),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        if (text == "Login success") {
          setAsync();
        } else {
          Alert.alert("Alert", text);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });

    async function setAsync() {
      await AsyncStorage.setItem("key", JSON.stringify(loginDetails));
      navigation.navigate("My Notes", loginDetails);
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
    backgroundColor: "#EEEEEE",
    borderBottomColor: "#7D7D7D",
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingStart: 10,
  },
  view1: {
    marginBottom: 20,
  },
  text1: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight: "bold",
  },
  regButton: {
    width: 180,
    height: 32,
    backgroundColor: "#22B624",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logButton: {
    width: 180,
    height: 32,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  regText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
