import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import "./firebase/firebase";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import ErrorView from "./components/ErrorView";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <NativeBaseProvider>
            <ErrorView>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </ErrorView>
          </NativeBaseProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
