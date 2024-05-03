import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  addTask,
  deleteTask,
  updateTask,
  getAllTasks,
} from "../services/firestoreServices";
import Icon from "react-native-vector-icons/FontAwesome";
import firebaseApp from "../services/firebaseAuth";
import { Colors } from "../assets/Colors";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const DomeNotes = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigation = useNavigation()

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksData = await getAllTasks();
      setTasks(tasksData);
    } catch (error) {
      console.log("Error loading tasks:", error.message);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;

    const newTaskData = { title: newTask.trim(), completed: false };

    setTasks([...tasks, newTaskData]);
    setNewTask("");

    try {
      await addTask(newTaskData);
    } catch (error) {
      setTasks(tasks.filter((task) => task !== newTaskData));
      console.log("Add Task Error:", error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);

    try {
      await deleteTask(taskId);
    } catch (error) {
      setTasks(tasks);
      console.log("Delete Task Error:", error.message);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await updateTask(taskId, { completed: !completed });
      await loadTasks();
    } catch (error) {
      console.log("Update Task Error:", error.message);
    }
  };

  const renderTaskItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.taskItem, item.completed && styles.completedTask]}
        onPress={() => handleToggleComplete(item.id, item.completed)}
      >
        <Text style={styles.taskTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Icon name="trash" size={20} color="#FF6347" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth(firebaseApp)
      await auth.signOut();
      navigation.reset("Login")
    } catch (error) {
      console.log('Logout Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.primary,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: Colors.lightText,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.button,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.background,
    marginLeft: 10,
  },
});

export default DomeNotes;
