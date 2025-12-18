import { addItem } from "./storage.js";

export function trainingsPage() {
  page.innerHTML = `
    <h1 class="font-bold text-xl">Trainings</h1>
    <button onclick="addTraining()">Add Training</button>
  `;
}

window.addTraining = () => addItem("trainings", { date: new Date() });
