import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import { addTodo, clearCompletedTodo } from "./action";

class App extends Component {
  state = {
    todos: todosList
  };

  handleCreate = event => {
    if (event.key === "Enter") {
      this.props.addTodo(event.target.value);
      event.target.value = "";
    }
  };


  handleDeleteCompletedTodo = event => {
  this.props.clearCompletedTodo();
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autofocus
            onKeyDown={this.handleCreate}
          />
        </header>
        <Route exact path="/">
          <TodoList
            todos={this.props.todos}
          />
        </Route>
        <Route exact path="/active">
          <TodoList
            todos={this.props.todos.filter(todo => todo.completed === false)}
          />
        </Route>
        <Route exact path="/completed">
          <TodoList
            todos={this.props.todos.filter(todo => todo.completed === true)}
          />
        </Route>
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {
                this.state.todos.filter(todo => {
                  if (todo.completed === true) {
                    return false;
                  }
                  return true;
                }).length
              }
            </strong>{" "}
            item(s) left
          </span>

          <ul className="filters">
            <li>
              <NavLink exact activeClassName="selected" to="/">
                All
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="selected" to="/active">
                Active
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="selected" to="/completed">
                Completed
              </NavLink>
            </li>
          </ul>

          <button
            onClick={this.handleDeleteCompletedTodo}
            className="clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = {
    addTodo,
    clearCompletedTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
