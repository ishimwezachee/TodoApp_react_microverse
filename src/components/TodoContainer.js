import React from "react";
import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";
class TodoContainer extends React.Component {
  state = {
    todos: [
      {
        id: uuidv4(),
        title: "Setup development environment",
        completed: true,
      },
      {
        id: uuidv4(),
        title: "Develop website and add content",
        completed: false,
      },
      {
        id: uuidv4(),
        title: "Deploy to live server",
        completed: false,
      },
    ],
  };
 
  // write the class method
  handleChange = (id) => {
    this.setState(prev=>({
      todos: prev.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
          completed:!todo.completed,
          }
        }
        return todo;
      }),
    }));
  };

  deleteTodo = id =>{
    this.setState({
      todos:[
        ...this.state.todos.filter(todo=> todo.id !== id)
      ]
    })
  }
 
  addTodoItem = title =>{
    const newTodo = {
      id:uuidv4(),
      title:title,
      completed:false
    };
    this.setState({
      todos:[...this.state.todos,newTodo]
    })
  }

  render() {
    return (
      <div>
        <Header />
        <InputTodo addTodoProps ={this.addTodoItem}/>
        <TodoList
          todos={this.state.todos}
          handleChangeProps={this.handleChange}
          deleteTodoProps = {this.deleteTodo}
        />
      </div>
    );
  }
}
export default TodoContainer;