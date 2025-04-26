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

let todoList = [
  /* {
    id: 1,
    text: "note#1",
    complete: false,
  },*/
];

function openModal() {
  modal.classList.add("modal__open");
}

function closeModal() {
  modal.classList.remove("modal__open");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function renderList() {
  // обнуляем содержимое лист, чтобы не происходило дублирования разметки
  list.innerHTML = null;
  // позволяет выполнить функцию для каждого элемента внутри массива
  todoList.forEach(function (todo) {
    console.log(todo);
    // универ. запись, к. позволяет скопировать всю разметку внутри элемента template
    const clone = listTemplate.content.cloneNode(true);
    // внутри клона достаём элементы, к-е надо поменять
    const listText = clone.querySelector(".list__text");
    const listTodo = clone.querySelector(".list__todo");
    const btnDelete = clone.querySelector(".list__delete");
    const btnCheck = clone.querySelector(".list__check");

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
  if (todoList.length === 0) {
    const clone = emptyTemplate.content.cloneNode(true);
    list.append(clone);
  }
}

function addTodo() {
  // позволяет вытащить текст, к-й ввел пользователь
  const text = modalInput.value;
  if (text === "") {
    alert("Enter a task");
  } else {
    //добавляются объекты в конец массива
    todoList.push({
      //возвращает уникальн. таймстэмп даты
      id: Date.now(),
      text: text,
      complete: false,
    });
    //отрисовать обновл. список
    renderList();
    closeModal();
    //почистили поле для ввода
    modalInput.value = "";
  }
}
// функция параметром принимает id объекта, который надо удалить
function deleteTodo(id) {
  // метод фильтр применяет функцию к каждому элементу массива и оставляет в нём только те элементы, для к. выполняется условие
  todoList = todoList.filter(function (todo) {
    // оставляем только те элементы, id которых не равно id объекта для удаления
    return todo.id != id;
  });
  renderList();
}

function completeTodo(id) {
  //  метод файнд применяет функцию к каждому элементу массива и возвращает первый элемент, на к-ом выполняется переданное условие
  const currentTodo = todoList.find(function (todo) {
    return todo.id === id;
  });
  //присваиваем противоположное значение (если тру, то фолс и наоборот)
  currentTodo.complete = !currentTodo.complete;
  renderList();
}

function filterList() {
  const value = select.value;
  if (value === "incomplete") {
    const result = todoList.filter(function (todo) {
      return todo.complete === false;
    });
  } else if (value === "complete") {
    const result = todoList.filter(function (todo) {
      return todo.complete === true;
    });
  } else {
  }
}

crossBtn.onclick = openModal;
cancelBtn.onclick = closeModal;
switchBtn.onclick = toggleTheme;
applyBtn.onclick = addTodo;

renderList();
/*
function sum(a, b) {
  console.log(a + b);
}
sum(4, 6);
*/
