let token = '';

async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert(data.message);
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();

  if (data.token) {
    token = data.token;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('taskSection').style.display = 'block';
    getTasks();
  } else {
    alert(data.message);
  }
}

async function getTasks() {
  const res = await fetch('http://localhost:5000/api/tasks', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerText = task.description;
    list.appendChild(li);
  });
}

async function addTask() {
  const description = document.getElementById('taskInput').value;
  await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ description })
  });
  getTasks();
}
