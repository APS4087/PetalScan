import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  useFonts({
    "OpenSans-Regular": require("../assets/fonts/OpenSans_Condensed-Regular.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans_Condensed-SemiBold.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans_SemiCondensed-ExtraBoldItalic.ttf"),
  });
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="login/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
