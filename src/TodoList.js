import React, { Component } from "react";
import TodoItem from "./TodoItem";
import {connect} from "react-redux";
import { toggleTodo, deleteTodo } from "./action";

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              handleToggleTodo={event => this.props.toggleTodo(todo.id)}
              handleDeleteTodo={event =>
                this.props.deleteTodo(todo.id)
              }
              title={todo.title}
              completed={todo.completed}
              id={todo.id}
            />
          ))}
        </ul>
      </section>
    );
  }
}

const mapDispatchToProps = {
  toggleTodo,
  deleteTodo
};
export default connect(null,mapDispatchToProps) (TodoList);
