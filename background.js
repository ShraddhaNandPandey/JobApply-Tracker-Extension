// Access DOM elements
const toggleButton = document.getElementById('mode-toggle');
const body = document.body;
const addNewButton = document.getElementById('addNew');
const formSection = document.querySelector('.formSection');
const closeFormButton = document.getElementById('closeFormButton');
const applicationsTable = document.getElementById('applicationsTable');

// State variables
let isDarkMode = false;
let isEditing = false;

// Event listeners
toggleButton.addEventListener('click', toggleDarkMode);
addNewButton.addEventListener('click', showForm);
closeFormButton.addEventListener('click', hideForm);
document.getElementById('save').addEventListener('click', saveApplication);
document.querySelector('.search-bar input').addEventListener('input', filterApplications);
window.onload = loadDataFromLocalStorage;

// Functions
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode');
    const imageSrc = isDarkMode ? 'images/moon.png': 'images/sun.png';
    toggleButton.setAttribute('src', imageSrc);
}

function showForm() {
    formSection.style.display = 'block';
    closeFormButton.style.display = 'block';
}

function hideForm() {
    formSection.style.display = 'none';
    closeFormButton.style.display = 'none';
    isEditing = false;
}

function saveApplication() {
    const companyName = document.getElementById('companyName').value;
    const position = document.getElementById('position').value;
    const applyDate = document.getElementById('applyDate').value;
    const status = document.getElementById('status').value;
    const link = document.getElementById('link').value;
    const notes = document.getElementById('notes').value;

    if (!companyName || !position || !applyDate || !status || !link || !notes) {
        alert('Please fill in all fields');
        return;
    }

    const newRow = applicationsTable.insertRow(-1);
    const cells = [];
    for (let i = 0; i < 8; i++) {
        cells.push(newRow.insertCell(i));
    }

    cells[0].innerText = applicationsTable.rows.length - 1;
    cells[1].innerText = companyName;
    cells[2].innerText = position;
    cells[3].innerText = applyDate;
    cells[4].innerText = status;

    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.target = '_blank';
    const imageElement = document.createElement('img');
    imageElement.src = 'images/link.png';
    linkElement.appendChild(imageElement);
    cells[5].appendChild(linkElement);

    cells[6].innerText = notes;
    cells[7].innerHTML = `<span class="material-symbols-outlined" onclick="editApplication(this)">edit</span> <span class="material-symbols-outlined" onclick="deleteApplication(this)">remove</span>`;

    saveDataToLocalStorage();
    document.getElementById('applicationForm').reset();
    hideForm();
}

function editApplication(button) {
    if (isEditing) {
        alert("You can only edit one row at a time.");
        return;
    }

    const row = button.parentNode.parentNode;
    const cells = row.cells;

    document.getElementById('companyName').value = cells[1].innerText;
    document.getElementById('position').value = cells[2].innerText;
    document.getElementById('applyDate').value = cells[3].innerText;
    document.getElementById('status').value = cells[4].innerText;
    document.getElementById('link').value = cells[5].querySelector('a').href;
    document.getElementById('notes').value = cells[6].innerText;

    isEditing = true;
    formSection.style.display = 'block';
    row.parentNode.removeChild(row);

    const tableRows = document.querySelectorAll("#applicationsTable tr:not(:first-child)");
    tableRows.forEach((row, index) => {
        row.cells[0].innerText = index + 1;
    });
}

function deleteApplication(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveDataToLocalStorage();
}

function filterApplications() {
    const searchText = this.value.toLowerCase();
    const tableRows = document.querySelectorAll("#applicationsTable tr:not(:first-child)");

    tableRows.forEach(row => {
        const [companyName, position, applyDate, status, link, notes] = [...row.cells].map(cell => cell.innerText.toLowerCase());
        const isVisible = [companyName, position, applyDate, status, link].some(cellContent => cellContent.includes(searchText));
        row.style.display = isVisible ? '' : 'none';
    });
}

function saveDataToLocalStorage() {
    const tableRows = document.querySelectorAll("#applicationsTable tr:not(:first-child)");
    const data = Array.from(tableRows).map(row => ({
        companyName: row.cells[1].innerText,
        position: row.cells[2].innerText,
        applyDate: row.cells[3].innerText,
        status: row.cells[4].innerText,
        link: row.cells[5].querySelector('a').href,
        notes: row.cells[6].innerText
    }));
    localStorage.setItem('tableData', JSON.stringify(data));
}

function loadDataFromLocalStorage() {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
        document.getElementById("headline").innerText = storedName;
    }

    const tableData = localStorage.getItem('tableData');
    if (tableData) {
        const data = JSON.parse(tableData);
        data.forEach((item, index) => {
            const newRow = applicationsTable.insertRow(-1);
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.companyName}</td>
                <td>${item.position}</td>
                <td>${item.applyDate}</td>
                <td>${item.status}</td>
                <td><a href="${item.link}" target="_blank"><img src="images/link.png"></a></td>
                <td>${item.notes}</td>
                <td><span class="material-symbols-outlined" onclick="editApplication(this)">edit</span> <span class="material-symbols-outlined" onclick="deleteApplication(this)">remove</span></td>
            `;
        });
    }
}

// Modal code
function openModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function saveName() {
    const newName = document.getElementById("nameInput").value;
    const headline = document.getElementById("headline");
    if (newName) {
        localStorage.setItem('userName', newName);
        headline.innerText = newName;
    }


    // linkedin id setup
  
    const linkedinLink = document.getItem('linkedin');

    if(linkedinLink)
    {
        const linkedinAnchor = document.get("linkedin");
        linkedinAnchor.href = linkedinLink;
        linkedinAnchor.title = "Linkedin Profile";
        localStorage.setItem('linkedin', linkedinLink);

    }
    closeModal();
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// sorting 
let sortDirection = 'asc';

function sortBy(key) {
    const table = document.getElementById('applicationsTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelector(`td:nth-child(${getHeaderIndex(key)})`).innerText;
        const cellB = rowB.querySelector(`td:nth-child(${getHeaderIndex(key)})`).innerText;

        if (key === 'date') {
            return new Date(cellA) - new Date(cellB);
        } else {
            return cellA.localeCompare(cellB);
        }
    });

    if (sortDirection === 'desc') {
        rows.reverse();
        sortDirection = 'asc';
    } else {
        sortDirection = 'desc';
    }

    rows.forEach(row => tbody.appendChild(row));
}

function getHeaderIndex(key) {
    const table = document.getElementById('applicationsTable');
    const headerRow = table.querySelector('thead tr');
    for (let i = 0; i < headerRow.cells.length; i++) {
        if (headerRow.cells[i].innerText.toLowerCase().includes(key)) {
            return i + 1; // Adding 1 to account for nth-child indexing
        }
    }
    return -1;
}


//delete modal
function closeModal() {
    // Find the modal element and hide it
    const modalElement = document.getElementById('delete_modal');

    
    modalElement.style.display = 'none';
}



//delete modal end