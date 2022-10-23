import { Alert, Button, StyleSheet, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
function Home({ navigation }) {

	// Biometric input
	const [isBiometricSupported, setIsBiometricSupported] = useState(false);

	useEffect(() => {
		(async () => {
			const compatible = await LocalAuthentication.isEnrolledAsync();
			setIsBiometricSupported(compatible);
		})();
	});

	const authenticate = async () => {
		const authOpts = isBiometricSupported
			? {
					promptMessage: "Confirm your identity",
					cancelLabel: "Cancel",
					disableDeviceFallback: true,
			  }
			: {};
		const res = await LocalAuthentication.authenticateAsync(authOpts);
		if (res?.success) {
			navigation.navigate("ToDo");
		} else {
			Alert.alert(
				"Authentication failed",
				"Please provide authentication to move ahead."
			);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.authWarnText}>
				Please confirm your identity to proceed
			</Text>
			<View style={styles.authBtn}>
				<Button
					title="Confirm"
					color={"#948542"}
					onPress={() => {
						authenticate();
					}}
				></Button>
			</View>
			<Text>
				{isBiometricSupported
					? "Device is compatible with biometrics"
					: "No biometric scanners available"}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		flex: 1,
		height: "100%",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	authBtn: {
		padding: 20,
		width: "90%",
	},
});

export default Home;
