export function saveData(lists) {
  localStorage.setItem("lists", JSON.stringify(lists));
}

export function loadData() {
  const storedData = localStorage.getItem("lists");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
}

export function removeData() {
  localStorage.removeItem("lists");
}

export function checkDataExists() {
  return localStorage.getItem("lists") !== null;
}
