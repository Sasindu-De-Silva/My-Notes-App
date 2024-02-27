import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

export function UserRegistration({ navigation }) {
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getUserType, setUserType] = useState("Employee");

  const ui = (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.view1}>
          <Text style={styles.text1}>First name :</Text>
          <TextInput style={styles.textInput1} onChangeText={setFirstName} />
        </View>
        <View style={styles.view1}>
          <Text style={styles.text1}>Last name :</Text>
          <TextInput style={styles.textInput1} onChangeText={setLastName} />
        </View>
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
        <View style={styles.view1}>
          <Text style={styles.text1}>Select User type :</Text>
          <View style={styles.selectorView}>
            <SelectDropdown
              data={["Employee", "Student"]}
              onSelect={setUserType}
              defaultValue={"Employee"}
              // style={{ backgroundColor: "red" }}
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
      </View>
      <View>
        <Pressable style={{ marginTop: 20 }} onPress={registerUser}>
          <View style={styles.regButton}>
            <Text style={styles.regText}>Register</Text>
          </View>
        </Pressable>
        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => {
            navigation.navigate("UserSignIn");
          }}
        >
          <View style={styles.logButton}>
            <Text style={styles.regText}>Go to Login</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  function registerUser() {
    const registerDetails = {
      firstName: getFirstName,
      lastName: getLastName,
      mobile: getMobile,
      password: getPassword,
      userType: getUserType,
    };

    fetch("http://192.168.42.214/MyNotes/registerUser.php", {
      method: "POST",
      body: JSON.stringify(registerDetails),
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        if (text == "Registration successfully") {
          Alert.alert("Alert", text);
          navigation.navigate("UserSignIn");
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
    width: 200,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#22B624",
    alignItems: "center",
    justifyContent: "center",
  },
  logButton: {
    width: 200,
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
