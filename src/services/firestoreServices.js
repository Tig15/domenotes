import { getFirestore, collection, addDoc, deleteDoc, updateDoc, getDocs, doc } from 'firebase/firestore';
import firebaseApp from './firebaseAuth';
 
const firestore = getFirestore(firebaseApp);

const addTask = async (task) => {
  try {
    const docRef = await addDoc(collection(firestore, 'tasks'), task);
    return docRef.id; 
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(firestore, 'tasks', taskId); 
    await deleteDoc(taskRef);
  } catch (error) {
    throw error;
  }
};

const updateTask = async (taskId, updatedTask) => {
  try {
    const taskRef = doc(firestore, 'tasks', taskId); 
    await updateDoc(taskRef, updatedTask);
  } catch (error) {
    throw error;
  }
};


const getAllTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'tasks'));
    const tasks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return tasks;
  } catch (error) {
    throw error;
  }
};

export { addTask, deleteTask, updateTask, getAllTasks };
