import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../assets/Colors";

const TaskItem = ({ item, onDeleteTask, onToggleComplete, onEditTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(item.title);
  
    const handleSaveEdit = async () => {
      if (editedTitle.trim() !== "") {
        try {
          await onEditTask(item.id, editedTitle);
          setIsEditing(false);
        } catch (error) {
          console.log("Error saving task edit:", error.message);
        }
      }
    };
  
    return (
      <TouchableOpacity
        style={[styles.taskItem, item.completed && styles.completedTask]}
        onPress={() => setIsEditing(true)}
      >
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editedTitle}
            onChangeText={(text) => setEditedTitle(text)}
            onBlur={handleSaveEdit}
            autoFocus
          />
        ) : (
          <>
            <TouchableOpacity onPress={() => onToggleComplete(item.id, item.completed)}>
              {item.completed ? (
                <Icon name="check-square-o" size={20} color={Colors.primary} />
              ) : (
                <Icon name="square-o" size={20} color={Colors.primary} />
              )}
            </TouchableOpacity>
            <Text style={[styles.taskTitle, item.completed && styles.completedTask]}>
              {item.title}
            </Text>
          </>
        )}
        <TouchableOpacity onPress={() => onDeleteTask(item.id)}>
          <Icon name="trash" size={20} color={Colors.danger} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    elevation: 4,
    marginTop:4,
    marginLeft:2,
    marginRight:4
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: Colors.text,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: Colors.lightText,
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: Colors.text,
  },
});

export default TaskItem;
