import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";
import TodoList from "./TodoList";

class App extends Component {
  state = {
    todos: todosList
  };

  handleCreate = event => {
    if (event.key === "Enter") {
      const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 100000000),
        title: event.target.value,
        completed: false
      };
      const newTodoList = [...this.state.todos];
      newTodoList.push(newTodo);
      this.setState({ todos: newTodoList });
      event.target.value = "";
    }
  };

  handleToggleTodo = (event, todoIdToToggle) => {
    const newTodoList = this.state.todos.map(todo => {
      if (todo.id === todoIdToToggle) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: newTodoList });
  };

  handleDeleteTodo = (event, todoIdToDelete) => {
    const newTodoList = this.state.todos.filter(todo => {
      if (todo.id === todoIdToDelete) {
        return false;
      }
      return true;
    });
    this.setState({ todos: newTodoList });
  };

  handleDeleteCompletedTodo = event => {
    const newTodoList = this.state.todos.filter(todo => {
      if (todo.completed === true) {
        return false;
      }
      return true;
    });
    this.setState({ todos: newTodoList });
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
            handleToggleTodo={this.handleToggleTodo}
            handleDeleteTodo={this.handleDeleteTodo}
            todos={this.state.todos}
          />
        </Route>
        <Route exact path="/active">
          <TodoList
            handleToggleTodo={this.handleToggleTodo}
            handleDeleteTodo={this.handleDeleteTodo}
            todos={this.state.todos.filter(todo => todo.completed === false)}
          />
        </Route>
        <Route exact path="/completed">
          <TodoList
            handleToggleTodo={this.handleToggleTodo}
            handleDeleteTodo={this.handleDeleteTodo}
            todos={this.state.todos.filter(todo => todo.completed === true)}
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

export default App;
