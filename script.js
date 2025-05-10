const date = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById("date").textContent = date.toLocaleDateString('id', options);