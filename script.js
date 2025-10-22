// LOGIN HANDLER
const form = document.getElementById("loginForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Dummy login credentials
    if (username === "user" && password === "1234") {
      localStorage.setItem("username", username);
      localStorage.setItem("balance", "75000"); // starting balance
      localStorage.setItem("transactions", JSON.stringify([]));
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("errorMsg").textContent =
        "Invalid username or password";
    }
  });
}

// DASHBOARD HANDLER
const balanceDisplay = document.getElementById("balance");
const userDisplay = document.getElementById("userDisplay");
const transactionList = document.getElementById("transactionList");

if (userDisplay) {
  userDisplay.textContent = localStorage.getItem("username") || "User";
  updateBalanceDisplay();
  displayTransactions();
}

function updateBalanceDisplay() {
  const balance = localStorage.getItem("balance") || "0";
  balanceDisplay.textContent = `₹${balance}`;
}

function deposit() {
  const amount = parseFloat(document.getElementById("depositAmount").value);
  if (isNaN(amount) || amount <= 0) return alert("Enter a valid deposit amount!");

  let balance = parseFloat(localStorage.getItem("balance"));
  balance += amount;
  localStorage.setItem("balance", balance);
  addTransaction(`Deposited ₹${amount}`);
  updateBalanceDisplay();
  document.getElementById("depositAmount").value = "";
}

function withdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  if (isNaN(amount) || amount <= 0) return alert("Enter a valid withdrawal amount!");

  let balance = parseFloat(localStorage.getItem("balance"));
  if (amount > balance) return alert("Insufficient balance!");

  balance -= amount;
  localStorage.setItem("balance", balance);
  addTransaction(`Withdrew ₹${amount}`);
  updateBalanceDisplay();
  document.getElementById("withdrawAmount").value = "";
}

function addTransaction(text) {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const now = new Date();
  const timestamp = now.toLocaleString();
  transactions.unshift(`${timestamp} — ${text}`);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  displayTransactions();
}

function displayTransactions() {
  if (!transactionList) return;
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactionList.innerHTML = transactions
    .map((t) => `<li>${t}</li>`)
    .join("");
}

function logout() {
  localStorage.removeItem("username");
  window.location.href = "index.html";
}


