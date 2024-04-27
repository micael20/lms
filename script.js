// script.js

document.addEventListener('DOMContentLoaded', () => {
    const userId = 1; // Assuming the user is logged in and their ID is known
  
    // Function to handle course selection
    const selectCourses = () => {
      const selectedCourses = []; // Array to store selected course IDs
  
      // Loop through checkboxes or any other UI elements representing courses
      document.querySelectorAll('.course-checkbox').forEach(checkbox => {
        if (checkbox.checked) {
          selectedCourses.push(parseInt(checkbox.value)); // Add selected course ID to the array
        }
      });
  
      // Send selected courses to the server
      fetch('/select-courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, courses: selectedCourses })
      })
      .then(response => response.text())
      .then(message => {
        console.log(message); // Log success message
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
  
    // Event listener for the form submission (assuming you have a form)
    document.getElementById('course-selection-form').addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form submission
  
      selectCourses(); // Call the function to handle course selection
    });
  
    // Function to fetch and display selected courses for the user
    const displaySelectedCourses = () => {
      // Fetch selected courses from the server
      fetch(`/selected-courses/${userId}`)
      .then(response => response.json())
      .then(selectedCourses => {
        const coursesList = document.getElementById('selected-courses-list');
        coursesList.innerHTML = ''; // Clear previous courses
  
        // Create list items for selected courses and append to the list
        selectedCourses.forEach(course => {
          const listItem = document.createElement('li');
          listItem.textContent = course;
          coursesList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
  
    // Call the function to display selected courses when the page loads
    displaySelectedCourses();
  });

  