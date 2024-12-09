// Check if there's any saved data in localStorage and display it
document.addEventListener("DOMContentLoaded", loadData);

function loadData() {
  let students;

  const storedStudents = localStorage.getItem("students");
  if (storedStudents) {
    students = JSON.parse(storedStudents);
  } else {
    students = [];
  }
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = "";

  students.forEach((student) => {
    const div = document.createElement("div");
    div.classList.add("studentRecord"); //adds CSS class named "studentRecord" to the newly created div.
    div.innerHTML = `
            <span>${student.name}</span>
            <span>${student.studentId}</span>
            <span>${student.email}</span>
            <span>${student.contact}</span>
            <button class="edit" onclick="editStudent('${student.studentId}')">Edit</button>
            <button class="delete" onclick="deleteStudent('${student.studentId}')">Delete</button>
        `;
    studentList.appendChild(div);
  });
}

document.getElementById("studentForm").addEventListener("submit", function (e) {
  const name = document.getElementById("name").value;
  const studentId = document.getElementById("studentId").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;

  if (!name || !studentId || !email || !contact) {
    alert("Please fill out all fields");
    return;
  }

  if (isNaN(studentId) || isNaN(contact)) {
    alert("Student ID and Contact Number must be numeric");
    return;
  }

  if (!validateEmail(email)) {
    alert("Invalid email format");
    return;
  }

  let students;
  const storedStudents = localStorage.getItem("students");

  if (storedStudents) {
    students = JSON.parse(storedStudents);
  } else {
    students = [];
  }
  //check and ensure the unique id
  const existingStudent = students.find(
    (student) => student.studentId === studentId
  );
  if (existingStudent) {
    alert("A student with this ID already exists!");
    return;
  }
  const student = { name, studentId, email, contact };

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  document.getElementById("studentForm").reset();
  loadData();
});

function deleteStudent(studentId) {
  let students;
  const storedStudents = localStorage.getItem("students");

  if (storedStudents !== null) {
    students = JSON.parse(storedStudents);
  } else {
    students = [];
  }
  students = students.filter((student) => student.studentId !== studentId);
  localStorage.setItem("students", JSON.stringify(students));
  loadData();
}

function editStudent(studentId) {
  let students;
  const storedStudents = localStorage.getItem("students");

  if (storedStudents !== null) {
    students = JSON.parse(storedStudents);
  } else {
    students = [];
  }
  const student = students.find((student) => student.studentId === studentId);

  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  deleteStudent(studentId);
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
