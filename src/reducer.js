const initialState = [];

export function toDoReducer(state = initialState, action) {
  if (action.type === "todos/edit") {
    const { id, value, type } = action.payload;
    if (type === "submit") {
      if (!state.items) {
        return {
          ...state,
          items: [
            {
              id: id,
              title: value,
            },
          ],
          isEditing: false,
        };
      } else {
        const newList = state.items.concat({
          id: id,
          title: value,
        });
        return {
          ...state,
          items: newList,
          isEditing: false,
        };
      }
    } else if (type === "editing") {
      return {
        ...state,
        isEditing: true,
      };
    } else if (type === "edit") {
      const filteredList = state.items.filter((item) => item.id !== id);
      const newList = filteredList.concat({ id: id, title: value });
      return {
        ...state,
        items: newList,
        isEditing: false,
      };
    }
  }
  if (action.type === "todos/remove") {
    const { id } = action.payload;
    const newList = state.items.filter((item) => item.id !== id);
    return {
      ...state,
      items: newList,
    };
  }
  if (action.type === "todos/clear") {
    return {};
  }

  return state;
}
