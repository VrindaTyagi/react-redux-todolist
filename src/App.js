import React, { useState } from "react";
import List from "./List";
import Alert from "./Alert";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    list: state,
    isEditing: state.isEditing,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editItem: (id, value, type) => {
      dispatch({ type: "todos/edit", payload: { id, value, type } });
    },
    removeItem: (id) => dispatch({ type: "todos/remove", payload: { id } }),
    clearList: () => dispatch({ type: "todos/clear" }),
  };
};
function App(props) {
  const { editItem, removeItem, list, isEditing, clearList } = props;
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "please enter a value");
    } else if (name && isEditing) {
      editItem(editId, name, "edit");
      setName("");
      setEditId(null);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      editItem(new Date().getTime().toString(), name, "submit");
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const editItemName = (id) => {
    const newItem = list.items.find((item) => item.id === id);
    setName(newItem.title);
    setEditId(id);
    editItem(id, newItem.title, "editing");
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert showAlert={showAlert} {...alert} list={list} />}
        <h3> TO-DO List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. workout in the evening"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.items && list.items.length > 0 && (
        <div className="grocery-container">
          <List
            items={list.items}
            editItem={editItemName}
            removeItem={removeItem}
          />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
