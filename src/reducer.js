import todosList from "./todos.json";

const initialState = {
  todos: todosList
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default todosReducer;
