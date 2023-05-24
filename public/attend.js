const absenceForm = document.getElementById("absence-form");
const absenceStatement = document.getElementById("absence-statement");

absenceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const course = document.getElementById("course").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  // Here you can make an AJAX call to the server to generate the absence statement
  // and display the result in the absenceStatement div
  absenceStatement.innerHTML = `
    <h2>Absence Statement for ${course}</h2>
    <p>From ${startDate} to ${endDate}</p>
    <ul>
      <li>Student 1</li>
      <li>Student 2</li>
      <li>Student 3</li>
      <li>Student 4</li>
    </ul>
  `;
  absenceStatement.style.display = "block";
});
