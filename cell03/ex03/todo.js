const BOX = document.getElementById('ft_list');
const KEY = 'todos'; // cookie name

// --- cookie helpers ---
const setCookie = (k, v, days=365) => {
  const d = new Date(Date.now() + days*864e5).toUTCString();
  document.cookie = `${k}=${encodeURIComponent(v)}; expires=${d}; path=/`;
};
const getCookie = (k) =>
  document.cookie.split('; ').find(x => x.startsWith(k+'='))?.split('=')[1] || '';

// --- state ---
let todos = [];
const save = () => setCookie(KEY, JSON.stringify(todos));
const render = () => {
  BOX.innerHTML = '';
  todos.forEach((t, i) => BOX.prepend(makeItem(t, i))); // newest on top
};

function makeItem(text, idx){
  const d = document.createElement('div');
  d.className = 'todo';
  d.textContent = text;
  d.title = 'Click to remove';
  d.addEventListener('click', () => {
    if (confirm(`Remove this TODO?\n\n${text}`)) {
      todos.splice(idx, 1);
      save(); render();
    }
  });
  return d;
}

// load from cookie
try { todos = JSON.parse(decodeURIComponent(getCookie(KEY)) || '[]') || []; } catch { todos = []; }
render();

// New button
document.getElementById('new').addEventListener('click', () => {
  const t = prompt('New TODO:');
  if (t && t.trim()) {
    todos.push(t.trim()); // add to end then render with prepend → shows on top
    save(); render();
  }
});
