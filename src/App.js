import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	NavigationContainer,
	useNavigationContainerRef,
} from "@react-navigation/native";
import Home from "./components/home/Home";
import ToDo from "./components/todos/ToDo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
import { store,persistor } from "./setup/store/store";


export default function App() {
	// Created navigator 
	const Stack = createNativeStackNavigator();
	const navRef = useNavigationContainerRef();
	return (
		<Provider store={store}>
			<PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
				<NavigationContainer ref={navRef}>
					<Stack.Navigator>
						<Stack.Screen name="Home" component={Home} />
						<Stack.Screen name="ToDo" component={ToDo} />
					</Stack.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
