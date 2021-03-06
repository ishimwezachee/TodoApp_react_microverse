import React, { Component } from "react";
import styles from "./TodoItem.module.css";

const completedStyle = {
  fontStyle: "italic",
  color: "#595959",
  opacity: 0.4,
  textDecoration: "line-through",
};

export default class TodoItem extends Component {
  state = {
    editing: false,
  };

  handleEditing = () => {
    this.setState({
      editing: true,
    });
  };
  handleUpdateDone=(event)=>{
      if(event.key ==="Enter"){
          this.setState({editing:false})
      }
  }

  componentWillUnmount(){
    console.log('Cleaning up ...')
  }
  render() {
    const { id, completed, title } = this.props.todo;
    let viewMode = {};
    let editMode = {};
// toggle view vs edit based on true or false;;
    if (this.state.editing) {
      viewMode.display = "none";
    } else {
      editMode.display = "none";
    }
    return (
      <li className={styles.item}>
        <div onDoubleClick={this.handleEditing} style={viewMode}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={completed}
            onChange={() => this.props.handleChangeProps(id)}
          />
          <button onClick={() => this.props.deleteTodoProps(id)}>Delete</button>
          <span style={completed ? completedStyle : null}>{title}</span>
        </div>
        <input 
        type="text" 
        style={editMode} 
        className={styles.textInput} 
        value={title}
        onChange={e=>{
            this.props.setUpdate(e.target.value,id)
        }}
        onKeyDown={this.handleUpdateDone}
        />
      </li>
    );
  }
}  
