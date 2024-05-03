import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/AuthScreen";
import DomeNotes from "../screens/Domenotes";
import { Colors } from "../assets/Colors";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerStyle: { elevation: 10 },
          headerTitleStyle: {
            color: Colors.text,
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerTitle: "Welcome To Create Your Dome",
          headerBackAllowFontScaling: true,
        }}
      />
      <Stack.Screen
        name="Todo"
        component={DomeNotes}
        options={{
          headerTitle: "Dome Notes",
          headerBackAllowFontScaling: true,
          headerStyle: { elevation: 10 },
          headerTitleStyle: {
            color: Colors.text,
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
