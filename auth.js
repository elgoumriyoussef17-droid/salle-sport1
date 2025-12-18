const ADMIN = { email: 'admin@gym.com', password: 'admin123' };


function login() {
const e = email.value;
const p = password.value;
if (e === ADMIN.email && p === ADMIN.password) {
localStorage.setItem('auth', 'true');
location.href = 'dashboard.html';
} else msg.innerText = 'Erreur de connexion';
}


function logout() {
localStorage.clear();
location.href = 'index.html';
}


if (!location.pathname.includes('index') && localStorage.getItem('auth') !== 'true') {
location.href = 'index.html';
}