const todoList = [{
  name: 'make dinner',
  dueDate: '2023-6-27'
}, {
  name: 'wash dishes',
  dueDate: '2023-6-27'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  todoList.forEach((todoObject, index) => {
    
    const {name, dueDate} = todoObject
    //generating the HTML
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
      `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      } )
    });
      //Closure -If a function has access to a value
      //-It will always have access to that value
      //value gets packaged together (enclosed) with the function
      //.filter(),.map()
      //Arrow functions, addEventListener
      //.forEach()
      //setTimeout(), setInterval()
      //Functions are values
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');

  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    name,
    dueDate
  });

  inputElement.value = '';

  renderTodoList();
}