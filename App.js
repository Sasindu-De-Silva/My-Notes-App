import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserRegistration } from "./UserRegistration";
import { UserSignIn } from "./UserSignIn";
import { CreateNote } from "./CreateNote";
import { Home } from "./Home";
import { ViewNote } from "./ViewNote";
import { useState } from "react";

const Stack = createNativeStackNavigator();

function App() {
  const [getUi, setUi] = useState(null);

  getAsyncStorage();
  var jsonValue;

  var ui;
  if (getUi != null) {
    ui = (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="My Notes" component={Home} />
          <Stack.Screen name="Create a Note" component={CreateNote} />
          <Stack.Screen name="View Note" component={ViewNote} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    ui = (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UserSignIn" component={UserSignIn} />
          <Stack.Screen name="UserRegistration" component={UserRegistration} />
          <Stack.Screen name="Create a Note" component={CreateNote} />
          <Stack.Screen name="My Notes" component={Home} />
          <Stack.Screen name="View Note" component={ViewNote} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return ui;

  async function getAsyncStorage() {
    const key = await AsyncStorage.getItem("key");
    jsonValue = JSON.parse(key);
    setUi(jsonValue);
  }
}

export default App;
