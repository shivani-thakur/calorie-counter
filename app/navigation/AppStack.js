import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LandingMain from "../screens/LandingMain";
import UploadData from "../screens/UploadData";
import Splash from "../screens/Splash";

const Stack = createStackNavigator();



export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Landing" component={LandingMain} />
      <Stack.Screen name="UploadData" component={UploadData} />
      <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
    </Stack.Navigator>
  );
}
