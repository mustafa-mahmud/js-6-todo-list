'use strict';

const inputEl = document.querySelector('input');
const errEl = document.querySelector('.err');
const contentEl = document.querySelector('.content');
const fasAdd = document.querySelector('.fa-plus-circle');

function addTodo(e) {
  if (e.key === 'Enter') {
    if (inputEl.value === '') {
      showMsg('Pls put some todo text...', 'wrong');
    } else {
      if (inputEl.getAttribute('editing')) changeTodo();
      else addToDo();
    }
  }
}

function showMsg(msg, cls) {
  errEl.classList.add(cls);
  errEl.textContent = msg;

  setTimeout(() => {
    errEl.classList.remove(cls);
    errEl.textContent = '';
  }, 2000);
}

function addToDo() {
  const time = new Date().toLocaleTimeString();
  const date = new Date().toDateString();
  const div = document.createElement('div');

  div.classList.add('note');

  div.innerHTML = `
		<p class="info">
			<span class="date">${date} || ${time}</span>
			<span class="edit"><i class="fas fa-pencil-alt"></i></span>
			<span class="del"><i class="fas fa-trash-alt"></i></span>
		</p>

		<p class="text">
			${inputEl.value}
		</p>
	`;

  contentEl.appendChild(div);

  inputEl.value = '';

  showMsg('Your data added susseccfully', 'success');
}

function todoDone(e) {
  const target = e.target;
  target.closest('.note').classList.toggle('done');
}

function editDelTodo(e) {
  const target = e.target;

  if (
    !target.classList.contains('fa-pencil-alt') &&
    !target.classList.contains('fa-trash-alt')
  )
    return;

  if (target.classList.contains('fa-pencil-alt')) editTodo(target);
  if (target.classList.contains('fa-trash-alt')) delTodo(target);
}

function editTodo(target) {
  const notes = document.querySelectorAll('.note');
  const note = target.parentElement.parentElement.parentElement;
  const p = note.querySelector('.text');
  const text = p.textContent.trim();

  notes.forEach((el) => el.classList.remove('editing'));
  note.classList.add('editing');

  fasAdd.className = 'fas fa-pencil-alt';
  //set attribute so that, enter could not add new todo
  inputEl.setAttribute('editing', true);

  inputEl.value = text;
}

function delTodo(target) {
  target.parentElement.parentElement.parentElement.remove();

  cancelTodo();
}

function changeTodo() {
  const editing = document.querySelector('.editing');

  editing.querySelector('.text').textContent = inputEl.value;
  editing.classList.remove('editing');

  cancelTodo();
}

function cancelTodo() {
  inputEl.value = '';
  inputEl.removeAttribute('editing');
  fasAdd.className = 'fas fa-plus-circle';
}

//Events===========================
inputEl.addEventListener('keyup', addTodo);
contentEl.addEventListener('dblclick', todoDone);
contentEl.addEventListener('click', editDelTodo);
