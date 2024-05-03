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
import firebaseApp, { signOutUser } from "../services/firebaseAuth";
import { Colors } from "../assets/Colors";
import { useNavigation } from "@react-navigation/native";
import TaskItem from "../components/TaskItem";

const DomeNotes = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigation = useNavigation();

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

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const updatedTask = { completed: !completed };
      await updateTask(taskId, updatedTask);
      await loadTasks();
    } catch (error) {
      console.log("Update Task Error:", error.message);
    }
  };
  
  const handleEditTask = async (taskId, updatedTitle) => {
    try {
      await updateTask(taskId, { title: updatedTitle });
      await loadTasks();
    } catch (error) {
      console.log("Edit Task Error:", error.message);
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.log("Delete Task Error:", error.message);
    }
  };
  

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Dome Notes List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Icon name="plus" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
          key={item.id}
            item={item}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No notes added yet.</Text>
        }
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
    marginTop:10
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    height: 30,
    width: 30,
    backgroundColor: Colors.lightText,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  taskList: {
    flex: 1,
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.danger,
    borderRadius: 8,
    padding: 6,
    marginTop: 20,
    position: "absolute",
    elevation: 10,
    top: -10,
    right: 10,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default DomeNotes;
