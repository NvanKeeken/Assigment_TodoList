const ul = document.getElementById("todo_Ul");

const displayTodoList = async () => {
  const data = await getData();
  const todoArray = data.map((todo) => {
    const li = document.createElement("li");
    li.setAttribute("id", "todo-item");
    li.setAttribute("id", `${todo._id}`);
    const label = document.createElement("label");
    label.innerHTML = todo.discription;
    ul.appendChild(li);
    li.appendChild(addCheckbox(todo._id));
    li.appendChild(label);
    li.appendChild(addEditButton(todo._id));
    li.appendChild(addDeleteButton(todo._id));
    return li;
  });
  return todoArray;
};
displayTodoList();

// add trashcan button + deleteRequest
const addDeleteButton = (id) => {
  const deleteButton = document.createElement("i");
  deleteButton.setAttribute("class", "fa-solid fa-trash");
  deleteButton.addEventListener("click", async (e) => {
    await deleteData(id);
    ul.innerHTML = "";
    displayTodoList();
  });
  return deleteButton;
};

// Add new todo with Post Request
const addNewTodo = () => {
  const inputForm = document.getElementById("todo-form");
  inputForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const todo = document.getElementById("new-todo-task").value;
    await postData(todo);
    ul.innerHTML = "";
    displayTodoList();
  });
};

// Bonus add checkbox + Put request "done"
const addCheckbox = (id) => {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox-todo");
  checkbox.addEventListener("change", async (e) => {
    e.preventDefault();
    checkbox.classList.toggle("done-isTrue");
    let done = "";
    if (checkbox.classList.contains("done-isTrue")) {
      done = "true";
    } else {
      done = "false";
    }
    await updateDone(id, done);
    const li = document.getElementById(`${id}`);
    li.classList.toggle("checked");
  });
  return checkbox;
};

//  Bonus add edit Button + Put request "discription"
const addEditButton = (id) => {
  const editButton = document.createElement("input");
  editButton.setAttribute("class", "edit-button");
  editButton.setAttribute("type", "button");
  editButton.setAttribute("value", "Edit");

  let editField = document.createElement("input");
  editField.setAttribute("type", "text");

  const li = document.getElementById(`${id}`);
  const childerenList = li.children;
  const secondChild = childerenList.item(1);

  editField.setAttribute("placeholder", secondChild.innerHTML);
  editField.setAttribute("class", "edit-field");

  editButton.addEventListener("click", (e) => {
    li.replaceChild(editField, secondChild);
    const saveButton = document.createElement("input");
    saveButton.setAttribute("type", "submit");
    saveButton.setAttribute("value", "Save");
    saveButton.setAttribute("class", "save-button");
    li.replaceChild(saveButton, editButton);

    saveButton.addEventListener("click", async (e) => {
      if (editField.value.length === 0) {
        window.alert("You have to type in a task");
      } else {
        await updateDiscription(id, editField.value);
        ul.innerHTML = "";
        displayTodoList();
      }
    });
  });

  return editButton;
};

addNewTodo();
