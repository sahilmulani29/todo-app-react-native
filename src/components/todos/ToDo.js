import { useState } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Image,
	Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { 
	ADD_ITEM_ACTION, 
	DELETE_ITEM_ACTION, 
	SELECT_ITEM_ACTION
} from "../constant/constant";
import ToDoItem from "./ToDoItem";
import _ from "lodash";


function ToDo() {
	const [item, setItem] = useState("");
	const [selectedToDo, setselectedToDo] = useState("");
	const todoList = useSelector(state=>state.TodoReducer);
	const dispatch = useDispatch();

	const changeTextHandler = (newText) => {
		// Save the user input to add todo item
		setItem(newText);
	};

	// If user wish to add or delete item then callback from todo item component
	const changeHandler = (todo, action) => {
		switch (action) {
			// Delete Item action 
			case DELETE_ITEM_ACTION: {
				// find if todo item exist
				const index = todoList.indexOf(todo);
				if(index !== -1){
					//If user wish to delete selected todo item then removed the test from input box 
					if(todoList[index] === selectedToDo){
						setItem("")
					}
					const temp = _.cloneDeep(todoList);
					// Delete the todo
					temp.splice(index , 1);
					// Save the main state
					dispatch({type: DELETE_ITEM_ACTION , data: temp})
					setselectedToDo("");
				}
				break;
			}
			// Select todo item action
			case SELECT_ITEM_ACTION: {
				// Store the selected todo item
				setItem(todo);
				setselectedToDo(todo);
				break;
			}
			default: {
				return;
			}
		}
	};

	// Add todo item function
	const addToDos = () => {
		// Check if its new toDo item or has been selected from list
		const textToAdd = selectedToDo ? selectedToDo : item;
		const index = todoList.indexOf(textToAdd);
		if (index !== -1) {
			//If todo item has been selected
			const temp = _.cloneDeep(todoList);
			temp[index] = item;
			// Here delete action work for updating todo
			dispatch({type: DELETE_ITEM_ACTION , data: temp})
		} else {
			// If todo item is new
			dispatch({type: ADD_ITEM_ACTION , data: item})
		}
		// Once added clear all data
		setItem("");
		setselectedToDo("");
	}

	// Render your todo items
	const renderTodos = () => {
		return todoList.length > 0 ? (
			todoList.map((item) => (
				// Pass key todoItem and callback function
				<ToDoItem key={item} todo={item} selectedToDo={selectedToDo} onChange={changeHandler} />
			))
		) : (
			// If no todo item added then display defualt text
			<Text style={styles.emptyText}>Nothing to do today!</Text>
		);
	};

	return (
		<View style={styles.mainContainer}>
			<ScrollView style={styles.listContainer}>{renderTodos()}</ScrollView>
			<View style={styles.bottomInputContainer}>
				<TextInput
					style={styles.toDoInput}
					placeholder={"Things to do"}
					testID="addingTodo"
					onChangeText={changeTextHandler}
					defaultValue={item}
				/>
				<TouchableOpacity
					style={styles.button}
					testID="button"
					onPress={() => {
						addToDos();
					}}
				>
					<Image
						source={selectedToDo ? require("../../../assets/updated.png") : require("../../../assets/add.png")}
						fadeDuration={0}
						style={{ width: 40, height: 40 }}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		display: "flex",
		flex: 1,
		backgroundColor: "#fbfbfb",
	},
	listContainer: {
		display: "flex",
		flex: 1,
	},
	bottomInputContainer: {
		display: "flex",
		flexDirection: "row",
		flexGrow: 0,
		flexShrink: 0,
		flexBasis: 80,
		backgroundColor: "#c5d5ea",
		justifyContent: "space-between",
	},
	toDoInput: {
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: "70%",
		padding: 15,
		margin: 10,
		marginRight: 0,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		borderRadius: 10,
	},
	emptyText: {
		fontSize: 18,
		alignSelf: "center",
		padding: 20,
	},
});

export default ToDo;
