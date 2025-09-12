// ---- cookie helpers ----
const setCookie = (name, value, days = 365) => {
  const expires = new Date(Date.now() + days*864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};
const getCookie = (name) =>
  document.cookie.split('; ').find(r => r.startsWith(name+'='))?.split('=')[1] || '';

// ---- state ----
let todos = [];
const list = document.getElementById('ft_list');

// load from cookie
try { todos = JSON.parse(decodeURIComponent(getCookie('todos') || '[]')) || []; }
catch { todos = []; }

// render all
const render = () => {
  list.innerHTML = '';
  todos.forEach(t => list.prepend(makeItem(t))); // newest on top
};

const makeItem = (t) => {
  const div = document.createElement('div');
  div.className = 'todo';
  div.textContent = t.text;
  div.title = 'Click to remove';
  div.addEventListener('click', () => {
    if (confirm(`Remove this TO DO?\n\n${t.text}`)) {
      todos = todos.filter(x => x.id !== t.id);
      save();            // persist
      div.remove();      // remove from DOM
    }
  });
  return div;
};

const save = () => setCookie('todos', JSON.stringify(todos));

// new button
document.getElementById('new').addEventListener('click', () => {
  const text = prompt('New TO DO:');
  if (text && text.trim()) {
    const item = { id: Date.now(), text: text.trim() };
    todos.push(item);
    save();
    list.prepend(makeItem(item)); // add to top
  }
});

render();
