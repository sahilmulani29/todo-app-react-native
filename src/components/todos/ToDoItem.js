import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { DELETE_ITEM_ACTION, SELECT_ITEM_ACTION } from "../constant/constant";

function ToDoItem({ todo, onChange, selectedToDo }) {
	return (
		<TouchableOpacity
			testID="onSelectItem"
			style={todo === selectedToDo ? styles.todoItemActive : styles.todoItem}
			onPress={() => {
				onChange(todo, SELECT_ITEM_ACTION);
			}}
		>
			<Text style={styles.todoText}>{todo}</Text>
			<TouchableOpacity
				testID="onDeleteItem"
				onPress={() => {
					onChange(todo, DELETE_ITEM_ACTION);
				}}
			>
				<Image
					style={styles.removeIcon}
					source={require("../../../assets/remove.png")}
					fadeDuration={0}
				/>
			</TouchableOpacity>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	todoItem: {
		display: "flex",
		flexDirection: "row",
		flex: 1,
		padding: 20,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		backgroundColor: "#efe9e7",
	},
	todoItemActive: {
		display: "flex",
		flexDirection: "row",
		flex: 1,
		padding: 20,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		backgroundColor: "#2EFF2E",
	},
	todoText: {
		display: "flex",
		fontSize: 18,
		flex: 1,
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: "80%",
	},
	removeIcon: {
		width: 30,
		height: 30,
	},
});
export default ToDoItem;
