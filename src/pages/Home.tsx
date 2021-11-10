import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EdiTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const registerTask = tasks.find(tasks => tasks.title === newTaskTitle);

    if(registerTask){
        return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks( oldTasks => [...oldTasks, newTask]);

   }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const checkItem = updatedTasks.find(item => item.id=== id);

    if(!checkItem){
      return;
    } else {
      checkItem.done = !checkItem.done;
      setTasks(updatedTasks);
    }
  }

  function handleRemoveTask(id: number) {
   
    Alert.alert('Remover Item', 'Tem certeza que deseja remover este item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const removeTask = tasks.filter(task => task.id !== id );
          setTasks(removeTask);
          }
        }
    ])

   
  }

  function handleEditTask({taskId, taskNewTitle}: EdiTaskArgs ){
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskCompleted = updatedTasks.find(item => item.id=== taskId);

    if(!taskCompleted){
      return;
    } else {
             taskCompleted.title = taskNewTitle;

      setTasks(updatedTasks);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})