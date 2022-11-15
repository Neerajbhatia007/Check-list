import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

const getTodoData = () => {
  const todoData = localStorage.getItem("TodoList");

  if (todoData) {
    return JSON.parse(todoData);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(getTodoData());
  const [editItems, setEditItems] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);
  const addItems = () => {
    if (!inputValue) {
      alert("Please Enter items...");
    } else if (inputValue && toggleBtn) {
      setItems(
        items.map((currEle) => {
          if (currEle.id === editItems) {
            return { ...currEle, name: inputValue };
          }
          return currEle;
        })
      );
      setInputValue("");
      setEditItems(null);
      setToggleBtn(false);
    } else {
      const newDataWithId = {
        id: new Date().getTime().toString(),
        name: inputValue,
      };
      setItems([...items, newDataWithId]);
      setInputValue("");
    }
  };

  const deleteItem = (index) => {
    const updatedList = items.filter((currEle) => {
      return currEle.id !== index;
    });
    setItems(updatedList);
  };

  const removeAll = () => {
    setItems([]);
  };

  const editItem = (index) => {
    const editedList = items.find((currEle) => {
      return currEle.id === index;
    });
    setInputValue(editedList.name);
    setEditItems(index);
    setToggleBtn(true);
  };

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todoLogo" />
            <figcaption>Add Your List Here 🤞</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items"
              className="form-control"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            {toggleBtn ? (
              <i className="far fa-edit add-btn" onClick={addItems}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItems}></i>
            )}
            {/* <i className="fa fa-plus add-btn" onClick={addItems}></i> */}
          </div>
          <div className="showItems">
            {items.map((currEle, index) => {
              return (
                <div className="eachItem" key={currEle.id}>
                  <h3>{currEle.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(currEle.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(currEle.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
