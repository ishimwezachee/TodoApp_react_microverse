import React from "react";
import TodoList from "./TodoList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { v4 as uuidv4 } from "uuid";
class TodoContainer extends React.Component {
  state = {
    todos: [],
  };
  
componentDidUpdate(prevProps,prevState){
  if(prevState.todos !== this.state.todos){
    const temp = JSON.stringify(this.state.todos)
    localStorage.setItem("todos",temp)
  }
}

componentDidMount(){
  const temp = localStorage.getItem("todos")
  const loadedTodos = JSON.parse(temp);
  if(loadedTodos){
    this.setState({
      todos:loadedTodos
    });
  }
}
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

  setUpdate = (UpdatedTitle,id)=>{
    this.setState({
      todos:this.state.todos.map(todo=>{
        if(todo.id === id){
          todo.title = UpdatedTitle
        }
        return todo;
      })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodoList
            todos={this.state.todos}
            handleChangeProps={this.handleChange}
            deleteTodoProps={this.deleteTodo}
            setUpdate ={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}
export default TodoContainer;
