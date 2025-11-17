// ==================== STUDENT DASHBOARD ====================

document.addEventListener("DOMContentLoaded", function () {
  setupStudentEventListeners();
  loadStudentDashboard();
});

// ==================== EVENT LISTENERS ====================

function setupStudentEventListeners() {
  const joinClassBtn = document.getElementById("join-class-btn");
  if (joinClassBtn) {
    joinClassBtn.addEventListener("click", joinClass);
  }
}

// ==================== LOAD FUNCTIONS ====================

function loadStudentDashboard() {
  loadStudentClasses();
  loadStudentAssignments();
  loadSubmissionHistory();
}

async function loadStudentClasses() {
  const grid = document.getElementById("student-classes-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const classes = await fetchClasses();

  classes.forEach((classItem) => {
    const card = document.createElement("div");
    card.className = "class-card";
    card.innerHTML = `
      <h4>${classItem.name}</h4>
      <p>Teacher: ${classItem.teacher}</p>
      <button class="btn btn-sm btn-primary mt-20">View Class</button>
    `;
    grid.appendChild(card);
  });
}

async function loadStudentAssignments() {
  const list = document.getElementById("student-assignments-list");
  if (!list) return;

  list.innerHTML = "";

  // Fetch assignments from Firebase or API
  let assignments = [];
  try {
    if (typeof db !== "undefined" && db) {
      const snapshot = await db.collection("assignments").get();
      assignments = [];
      snapshot.forEach((doc) => {
        assignments.push({ id: doc.id, ...doc.data() });
      });
    }
  } catch (err) {
    console.warn("Firebase assignments fetch error:", err);
  }

  // Fallback to sampleData if no Firebase assignments
  if (assignments.length === 0) {
    assignments = sampleData.assignments;
  }

  if (assignments.length === 0) {
    list.innerHTML = "<p>No assignments available yet.</p>";
    return;
  }

  assignments.forEach((assignment) => {
    const card = document.createElement("div");
    card.className = "assignment-card";
    card.innerHTML = `
      <div class="assignment-info">
        <h4>${assignment.title}</h4>
        <div class="assignment-meta">
          ${assignment.class} • Due: ${assignment.dueDate}
        </div>
        ${assignment.description ? `<p>${assignment.description}</p>` : ""}
        ${
          assignment.fileName
            ? `<p><strong>File:</strong> <a href="#" onclick="alert('File: ${assignment.fileName}'); return false;">${assignment.fileName}</a></p>`
            : ""
        }
      </div>
      <div class="assignment-actions">
        <button class="btn btn-sm btn-primary submit-btn" data-assignment="${
          assignment.title
        }">Submit</button>
        <button class="btn btn-sm btn-success details-btn" data-assignment="${
          assignment.title
        }">View Details</button>
      </div>
    `;

    // Add event listeners
    const submitBtn = card.querySelector(".submit-btn");
    const detailsBtn = card.querySelector(".details-btn");

    if (submitBtn)
      submitBtn.addEventListener("click", () =>
        showSubmitAssignmentModal(assignment)
      );
    if (detailsBtn)
      detailsBtn.addEventListener("click", () =>
        showAssignmentDetailsModal(assignment)
      );

    list.appendChild(card);
  });
}

function loadSubmissionHistory() {
  const tbody = document.getElementById("submission-history-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  sampleData.submissions.forEach((submission) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${submission.assignment}</td>
      <td>${submission.class}</td>
      <td>${submission.submitted}</td>
      <td>${submission.grade}</td>
      <td><span class="status ${submission.status.toLowerCase()}">${
      submission.status
    }</span></td>
    `;
    tbody.appendChild(row);
  });
}

// ==================== CLASS FUNCTIONS ====================

function joinClass() {
  const codeInput = document.getElementById("class-code-input");
  if (!codeInput) return;

  const code = codeInput.value.trim();

  if (!code) {
    alert("Please enter a class code");
    return;
  }

  alert(`Successfully joined class with code: ${code}`);
  codeInput.value = "";
  loadStudentClasses();
}

// ==================== ASSIGNMENT SUBMISSION MODALS ====================

function showSubmitAssignmentModal(assignment) {
  const modalBody = document.getElementById("modal-body");
  if (!modalBody) return;

  modalBody.innerHTML = `
    <form id="submit-assignment-form">
      <h4>${assignment.title}</h4>
      <p><strong>Class:</strong> ${assignment.class}</p>
      <p><strong>Due Date:</strong> ${assignment.dueDate}</p>
      
      ${
        assignment.description
          ? `<div><strong>Instructions:</strong><p>${assignment.description}</p></div>`
          : ""
      }
      ${
        assignment.fileName
          ? `<p><strong>Teacher's File:</strong> <a href="#" onclick="alert('File: ${assignment.fileName}'); return false;">${assignment.fileName}</a></p>`
          : ""
      }
      
      <div class="form-group">
        <label for="submission-file">Upload Your Work</label>
        <input type="file" id="submission-file" class="form-control" required>
        <small>Accepted: PDF, DOC, DOCX, TXT, Images</small>
      </div>
      
      <div class="form-group">
        <label for="submission-note">Notes (Optional)</label>
        <textarea id="submission-note" class="form-control" rows="3" placeholder="Add any notes about your submission..."></textarea>
      </div>
      
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Submit Assignment</button>
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
      </div>
    </form>
  `;

  document.getElementById("modal-title").textContent = "Submit Assignment";
  document.getElementById("modal-overlay").classList.remove("hidden");

  document
    .getElementById("submit-assignment-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const fileInput = document.getElementById("submission-file");
      const note = document.getElementById("submission-note").value.trim();

      if (!fileInput.files.length) {
        alert("Please select a file to submit.");
        return;
      }

      const fileName = fileInput.files[0].name;

      const submission = {
        assignmentTitle: assignment.title,
        class: assignment.class,
        studentEmail: currentUser?.email || "unknown",
        fileName: fileName,
        note: note,
        submittedDate: new Date().toISOString().split("T")[0],
        grade: null,
        status: "Submitted",
      };

      try {
        if (typeof db !== "undefined" && db) {
          await db.collection("submissions").add(submission);
          console.log("Submission saved to Firebase");
        } else {
          // Fallback to API
          const response = await fetch("/api/submissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submission),
          });
          if (!response.ok) throw new Error("API request failed");
        }
        alert("Assignment submitted successfully!");
      } catch (err) {
        console.error("Error submitting assignment:", err);
        alert("Could not submit assignment. Check console for details.");
      }

      closeModal();
      await loadSubmissionHistory();
    });
}

function showAssignmentDetailsModal(assignment) {
  const modalBody = document.getElementById("modal-body");
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="assignment-details">
      <h4>${assignment.title}</h4>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; margin: 15px 0;">
        <p><strong>Class:</strong> ${assignment.class}</p>
        <p><strong>Due Date:</strong> ${assignment.dueDate}</p>
        <p><strong>Status:</strong> <span style="color: #4361ee;">Pending Submission</span></p>
      </div>
      
      ${
        assignment.description
          ? `
        <div style="margin: 15px 0;">
          <h5>Assignment Details</h5>
          <p>${assignment.description}</p>
        </div>
      `
          : ""
      }
      
      ${
        assignment.fileName
          ? `
        <div style="margin: 15px 0;">
          <h5>Teacher's Resource</h5>
          <p>
            <strong>File:</strong> 
            <a href="#" onclick="alert('Download: ${assignment.fileName}'); return false;">📥 ${assignment.fileName}</a>
          </p>
        </div>
      `
          : ""
      }
      
      <div style="margin-top: 20px;">
        <button class="btn btn-primary" onclick="
          const assignment = {title: '${assignment.title}', class: '${
    assignment.class
  }', dueDate: '${assignment.dueDate}', description: '${
    assignment.description || ""
  }', fileName: '${assignment.fileName || ""}'};
          showSubmitAssignmentModal(assignment);
        ">Submit Assignment</button>
        <button class="btn btn-secondary" onclick="closeModal()">Close</button>
      </div>
    </div>
  `;

  document.getElementById("modal-title").textContent = "Assignment Details";
  document.getElementById("modal-overlay").classList.remove("hidden");
}
