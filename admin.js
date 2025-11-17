// ==================== ADMIN DASHBOARD ====================

document.addEventListener("DOMContentLoaded", function () {
  setupAdminEventListeners();
  loadAdminDashboard();
});

// ==================== EVENT LISTENERS ====================

function setupAdminEventListeners() {
  const addUserBtn = document.getElementById("add-user-btn");
  if (addUserBtn) {
    addUserBtn.addEventListener("click", showAddUserModal);
  }
}

// ==================== LOAD FUNCTIONS ====================

function loadAdminDashboard() {
  loadUsersTable();
  loadAdminClasses();
}

async function loadUsersTable() {
  const tbody = document.getElementById("users-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  const users = await fetchUsers();

  if (!users || users.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">No users found</td>
      </tr>
    `;
    return;
  }

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td><span class="role-badge ${user.role}">${user.role}</span></td>
      <td><span class="status ${user.status}">${user.status}</span></td>
      <td>
        <button class="btn btn-sm btn-primary">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function loadAdminClasses() {
  const grid = document.getElementById("admin-classes-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const classes = await fetchClasses();

  classes.forEach((classItem) => {
    const card = document.createElement("div");
    card.className = "class-card";
    card.innerHTML = `
      <h4>${classItem.name}</h4>
      <p>Teacher: ${classItem.teacher}</p>
      <div class="class-code">Code: ${classItem.code}</div>
      <p>Students: ${classItem.studentCount}</p>
      <button class="btn btn-sm btn-primary mt-20">View Details</button>
    `;
    grid.appendChild(card);
  });
}

// ==================== MODAL FUNCTIONS ====================

function showAddUserModal() {
  const modalBody = document.getElementById("modal-body");
  if (!modalBody) return;

  modalBody.innerHTML = `
    <form id="add-user-form">
      <div class="form-group">
        <label for="user-name">Full Name</label>
        <input type="text" id="user-name" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="user-email">Email</label>
        <input type="email" id="user-email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="user-role">Role</label>
        <select id="user-role" class="form-control" required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Add User</button>
      </div>
    </form>
  `;

  document.getElementById("modal-title").textContent = "Add New User";
  document.getElementById("modal-overlay").classList.remove("hidden");

  document
    .getElementById("add-user-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("User added successfully!");
      closeModal();
      loadUsersTable();
    });
}
