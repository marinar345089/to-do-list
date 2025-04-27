const modal = document.querySelector(".modal");
const crossBtn = document.querySelector(".cross");
const cancelBtn = document.querySelector(".modal__cancel");
const switchBtn = document.querySelector(".btn__moon");
const list = document.querySelector(".list");
const listTemplate = document.querySelector(".list__template");
const emptyTemplate = document.querySelector(".empty__template");
const modalInput = document.querySelector(".modal__input");
const applyBtn = document.querySelector(".modal__apply");
const select = document.querySelector(".search__select");
const searchInput = document.querySelector(".search__input");
const modalTitle = document.querySelector(".modal__title");

let todoList = getList();

let editTodo = null;
/* {
    id: 1,
    text: "note#1",
    complete: false,
  },*/

function openModal() {
  modal.classList.add("modal__open");
  if (editTodo) {
    modalTitle.textContent = "EDIT NOTE";
    modalInput.value = editTodo.text;
  } else {
    modalTitle.textContent = "NEW NOTE";
    modalInput.value = "";
  }
}

function closeModal() {
  modal.classList.remove("modal__open");
  editTodo = null;
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function renderList(array) {
  saveList();
  // обнуляем содержимое лист, чтобы не происходило дублирования разметки
  list.innerHTML = null;
  // позволяет выполнить функцию для каждого элемента внутри массива
  array.forEach(function (todo) {
    console.log(todo);
    // универ. запись, к. позволяет скопировать всю разметку внутри элемента template
    const clone = listTemplate.content.cloneNode(true);
    // внутри клона достаём элементы, к-е надо поменять
    const listText = clone.querySelector(".list__text");
    const listTodo = clone.querySelector(".list__todo");
    const btnDelete = clone.querySelector(".list__delete");
    const btnCheck = clone.querySelector(".list__check");
    const btnEdit = clone.querySelector(".list__edit");

    btnEdit.onclick = function () {
      startEdit(todo.id);
    };

    btnDelete.onclick = function () {
      // если функци принимает параметры, при назначении её по клику необходимо сделать функцию-обёртку
      deleteTodo(todo.id);
    };

    btnCheck.onclick = function () {
      completeTodo(todo.id);
    };

    if (todo.complete === true) {
      listTodo.classList.add("list__complete");
    }
    listText.textContent = todo.text;
    // добавляет html разметку внутрь и в конец элемента (лист)
    list.append(clone);
  });
  if (array.length === 0) {
    const clone = emptyTemplate.content.cloneNode(true);
    list.append(clone);
  }
}

function addTodo() {
  // позволяет вытащить текст, к-й ввел пользователь
  const text = modalInput.value;
  if (text === "") {
    alert("Enter a task");
    return;
  }
  if (editTodo) {
    // мэп позволяет преобр. элементы массива. результатом возвращает новый изменённый массив.
    todoList = todoList.map(function (todo) {
      if (todo.id === editTodo.id) {
        todo.text = text;
      }
      return todo;
    });
  } else {
    //добавляются объекты в конец массива
    todoList.push({
      //возвращает уникальн. таймстэмп даты
      id: Date.now(),
      text: text,
      complete: false,
    });
    //почистили поле для ввода
    modalInput.value = "";
  }
  //отрисовать обновл. список
  renderList(todoList);
  closeModal();
}
// функция параметром принимает id объекта, который надо удалить
function deleteTodo(id) {
  // метод фильтр применяет функцию к каждому элементу массива и оставляет в нём только те элементы, для к. выполняется условие
  todoList = todoList.filter(function (todo) {
    // оставляем только те элементы, id которых не равно id объекта для удаления
    return todo.id != id;
  });
  renderList(todoList);
}

function completeTodo(id) {
  //  метод файнд применяет функцию к каждому элементу массива и возвращает первый элемент, на к-ом выполняется переданное условие
  const currentTodo = todoList.find(function (todo) {
    return todo.id === id;
  });
  //присваиваем противоположное значение (если тру, то фолс и наоборот)
  currentTodo.complete = !currentTodo.complete;
  renderList(todoList);
}

function filterList() {
  const value = select.value;
  let result = todoList;
  if (value === "incomplete") {
    result = todoList.filter(function (todo) {
      return todo.complete === false;
    });
  } else if (value === "complete") {
    result = todoList.filter(function (todo) {
      return todo.complete === true;
    });
  }
  renderList(result);
}

function handleSearch() {
  const value = searchInput.value;
  const result = todoList.filter(function (todo) {
    return todo.text.toLowerCase().includes(value.toLowerCase());
  });
  renderList(result);
}

function saveList() {
  const list = JSON.stringify(todoList);
  localStorage.setItem("todoList", list);
}

function getList() {
  const list = localStorage.getItem("todoList");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

function startEdit(id) {
  editTodo = todoList.find(function (todo) {
    return todo.id === id;
  });
  openModal();
}

crossBtn.onclick = openModal;
cancelBtn.onclick = closeModal;
switchBtn.onclick = toggleTheme;
applyBtn.onclick = addTodo;
select.onchange = filterList;
searchInput.oninput = handleSearch;
renderList(todoList);
/*
function sum(a, b) {
  console.log(a + b);
}
sum(4, 6);
*/
