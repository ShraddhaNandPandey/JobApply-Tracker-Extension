const toggleButton = document.getElementById('mode-toggle');
const body = document.body;
let isDarkMode = false;

toggleButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode');
    const imageSrc = isDarkMode ? 'images/moon.png': 'images/sun.png';
    toggleButton.setAttribute('src', imageSrc);

});


//form will appear
const addNewButton = document.getElementById('addNew');
const formSection = document.querySelector('.formSection');
const closeFormButton = document.getElementById('closeFormButton');

addNewButton.addEventListener('click', () => {
  formSection.style.display = 'block';
});
``
closeFormButton.addEventListener('click', () => {
  formSection.style.display = 'none';
});




// Function to add application
function addApplication() {
  // Get form input values
  var companyName = document.getElementById('companyName').value;
  var position = document.getElementById('position').value;
  var applyDate = document.getElementById('applyDate').value;
  var status = document.getElementById('status').value;
  var link = document.getElementById('link').value;
  var notes = document.getElementById('notes').value;

  // Validate form inputs
  if (!companyName || !position || !applyDate || !status || !link || !notes) {
    alert('Please fill in all fields');
    return;
  }

  // Create a new row for the table
  var table = document.getElementById('applicationsTable');
  var newRow = table.insertRow(-1);

  // Insert cells into the new row and set their content
  var cells = [];
  for (var i = 0; i < 8; i++) {
    cells.push(newRow.insertCell(i));
  }

  // Set cell content
  cells[0].innerText = table.rows.length - 1; // S.No
  cells[1].innerText = companyName;
  cells[2].innerText = position;
  cells[3].innerText = applyDate;
  cells[4].innerText = status;
  cells[5].innerText = link;
  cells[6].innerText = notes;
  cells[7].innerHTML = `<span class="material-symbols-outlined" onclick="editApplication(this)">edit</span> <span class="material-symbols-outlined" onclick="deleteApplication(this)">remove</span>`;


  // Reset form fields
  document.getElementById('applicationForm').reset();
}

function editApplication(button) {
  var row = button.parentNode.parentNode; // Get the parent row of the clicked button
  var cells = row.cells; // Get the cells of the row

  // Populate form fields with data from the clicked row
  document.getElementById('companyName').value = cells[1].innerText;
  document.getElementById('position').value = cells[2].innerText;
  document.getElementById('applyDate').value = cells[3].innerText;
  document.getElementById('status').value = cells[4].innerText;
  document.getElementById('link').value = cells[5].innerText;
  document.getElementById('notes').value = cells[6].innerText;
   document.querySelector('.formSection').style.display = 'block';
  // Remove the row from the table
  row.parentNode.removeChild(row);
}

// Function to handle deleting an application
function deleteApplication(button) {
  var row = button.parentNode.parentNode; // Get the parent row of the clicked button
  row.parentNode.removeChild(row); // Remove the row from the table
}


// Open (or create) a database
var request = indexedDB.open('jobApplicationsDatabase', 1);

// Event handler for when the database is created or upgraded
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create an object store (similar to a table in SQL databases)
  var objectStore = db.createObjectStore('applications', { keyPath: 'id', autoIncrement: true });

  // Define indexes for efficient querying
  objectStore.createIndex('companyName', 'companyName', { unique: false });
  objectStore.createIndex('applyDate', 'applyDate', { unique: false });
};

// Event handler for successful database opening
request.onsuccess = function(event) {
  var db = event.target.result;

  // Function to add application data to the database
  function addApplication(applicationData) {
    var transaction = db.transaction(['applications'], 'readwrite');
    var objectStore = transaction.objectStore('applications');
    var request = objectStore.add(applicationData);
    request.onsuccess = function(event) {
      console.log('Application added to IndexedDB');
    };
    request.onerror = function(event) {
      console.log('Error adding application to IndexedDB:', event.target.error);
    };
  }

  // Example usage:
  // Add a new application
  var newApplication = {
    companyName: document.getElementById('companyName').value,
    position: document.getElementById('position').value,
    applyDate: document.getElementById('applyDate').value,
    status: document.getElementById('status').value,
    link: document.getElementById('link').value,
    notes: document.getElementById('notes').value
  };
  addApplication(newApplication);
};

// Event handler for database errors
request.onerror = function(event) {
  console.error('Database error:', event.target.error);
};
// change text your name
function changeText(){
  var newName = prompt("Enter your name");
  var headline = document.getElementById("headline");
  if (newName) {
    var imgTag = headline.querySelector('img');
    localStorage.setItem('userName', newName);
    headline.innerText = newName;
   
  }
}

// to store data in localStorage
window.onload = function() {
  var storedName = localStorage.getItem('userName');
  if(storedName) {
    var headline = document.getElementById("headline");
    headline.innerText = storedName;
    
  }
}