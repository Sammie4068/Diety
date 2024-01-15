function toggleSection(sectionId) {
  const sections = document.querySelectorAll('main section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = 'block';
  }
}

function viewPatientProfile(patientName) {
  alert('Implement functionality to view ' + patientName + "'s profile");
}

function createNutritionPlan() {
  alert('Implement functionality to create a nutrition plan');
}

function viewNutritionPlan(patientName) {
  alert('Implement functionality to view ' + patientName + "'s nutrition plan");
}

function sendMessage() {
  const messageInput = document.getElementById('message');
  const message = messageInput.value;
  alert('Implement functionality to send message: ' + message);
  messageInput.value = '';
}

function scheduleAppointment() {
  const patientNameInput = document.getElementById('patient-name');
  const appointmentDateInput = document.getElementById('appointment-date');

  const patientName = patientNameInput.value;
  const appointmentDate = appointmentDateInput.value;

  alert('Implement functionality to schedule appointment for ' + patientName + ' on ' + appointmentDate);
  patientNameInput.value = '';
  appointmentDateInput.value = '';
}

function logMeal() {
  const mealDateInput = document.getElementById('meal-date');
  const mealDescriptionInput = document.getElementById('meal-description');
  const feedbackInput = document.getElementById('feedback');

  const mealDate = mealDateInput.value;
  const mealDescription = mealDescriptionInput.value;
  const feedback = feedbackInput.value;

  alert('Implement functionality to log meal: Date: ' + mealDate + ', Description: ' + mealDescription + ', Feedback: ' + feedback);


  mealDateInput.value = '';
  mealDescriptionInput.value = '';
  feedbackInput.value = '';
}

toggleSection('dashboard-overview');

function logout() {
  window.location = "index.html";
}




