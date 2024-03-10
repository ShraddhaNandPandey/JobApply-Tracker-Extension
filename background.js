const toggleButton = document.getElementById('mode-toggle');
const body = document.body;
let isDarkMode = false;

toggleButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode');
    const imageSrc = isDarkMode ? 'images/moon.png': 'images/sun.png';
    toggleButton.setAttribute('src', imageSrc);
});

const addNewButton = document.getElementById('addNew');
const formSection = document.querySelector('.formSection');
const closeFormButton = document.getElementById('closeFormButton');

addNewButton.addEventListener('click', () => {
    formSection.style.display = 'block';
    closeFormButton.style.display = 'block';
});

closeFormButton.addEventListener('click', () => {
    formSection.style.display = 'none';
    closeFormButton.style.display = 'none';
});

function addApplication() {
    var companyName = document.getElementById('companyName').value;
    var position = document.getElementById('position').value;
    var applyDate = document.getElementById('applyDate').value;
    var status = document.getElementById('status').value;
    var link = document.getElementById('link').value;
    var notes = document.getElementById('notes').value;

    if (!companyName || !position || !applyDate || !status || !link || !notes) {
        alert('Please fill in all fields');
        return;
    }

    var table = document.getElementById('applicationsTable');
    var newRow = table.insertRow(-1);

    var cells = [];
    for (var i = 0; i < 8; i++) {
        cells.push(newRow.insertCell(i));
    }

    cells[0].innerText = table.rows.length - 1;
    cells[1].innerText = companyName;
    cells[2].innerText = position;
    cells[3].innerText = applyDate;
    cells[4].innerText = status;
    var linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.target = '_blank';
    var imageElement = document.createElement('img');
    imageElement.src = 'images/link.png';
    linkElement.appendChild(imageElement);
    cells[5].appendChild(linkElement);
    cells[6].innerText = notes;
    cells[7].innerHTML = `<span class="material-symbols-outlined" onclick="editApplication(this)">edit</span> <span class="material-symbols-outlined" onclick="deleteApplication(this)">remove</span>`;

    // Save data to local storage
    saveDataToLocalStorage();

    document.getElementById('applicationForm').reset();
}

var isEditing = false;

function editApplication(button) {
    if (isEditing) {
        alert("You can only edit one row at a time.");
        return;
    }

    var row = button.parentNode.parentNode;
    var cells = row.cells;

    document.getElementById('companyName').value = cells[1].innerText;
    document.getElementById('position').value = cells[2].innerText;
    document.getElementById('applyDate').value = cells[3].innerText;
    document.getElementById('status').value = cells[4].innerText;
    document.getElementById('link').value = cells[5].querySelector('a').href;
    document.getElementById('notes').value = cells[6].innerText;

    isEditing = true;
    document.querySelector('.formSection').style.display = 'block';
    row.parentNode.removeChild(row);

    var tableRows = document.querySelectorAll("#applicationsTable tr:not(:first-child)");
    for (var i = 0; i < tableRows.length; i++) {
        tableRows[i].cells[0].innerText = i + 1;
    }
}

document.getElementById('save').addEventListener('click', function() {
    isEditing = false;
    document.querySelector('.formSection').style.display = 'none';
});

function deleteApplication(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // Save data to local storage after deletion
    saveDataToLocalStorage();
}

function changeText() {
    var newName = prompt("Enter your name");
    var headline = document.getElementById("headline");
    if (newName) {
        var imgTag = headline.querySelector('img');
        localStorage.setItem('userName', newName);
        headline.innerText = newName;
    }
}

// Function to save data to local storage
function saveDataToLocalStorage() {
    var tableRows = document.querySelectorAll("#applicationsTable tr:not(:first-child)");
    var data = [];
    for (var i = 0; i < tableRows.length; i++) {
        var cells = tableRows[i].cells;
        data.push({
            companyName: cells[1].innerText,
            position: cells[2].innerText,
            applyDate: cells[3].innerText,
            status: cells[4].innerText,
            link: cells[5].querySelector('a').href,
            notes: cells[6].innerText
        });
    }
    localStorage.setItem('tableData', JSON.stringify(data));
}

// Load data from local storage when the page loads
window.onload = function () {
    var storedName = localStorage.getItem('userName');
    if (storedName) {
        var headline = document.getElementById("headline");
        headline.innerText = storedName;
    }

    var tableData = localStorage.getItem('tableData');
    if (tableData) {
        var data = JSON.parse(tableData);
        for (var i = 0; i < data.length; i++) {
            var newRow = document.getElementById('applicationsTable').insertRow(-1);
            newRow.innerHTML = `
                <td>${i + 1}</td>
                <td>${data[i].companyName}</td>
                <td>${data[i].position}</td>
                <td>${data[i].applyDate}</td>
                <td>${data[i].status}</td>
                <td><a href="${data[i].link}" target="_blank"><img src="images/link.png"></a></td>
                <td>${data[i].notes}</td>
                <td><span class="material-symbols-outlined" onclick="editApplication(this)">edit</span> <span class="material-symbols-outlined" onclick="deleteApplication(this)">remove</span></td>
            `;
        }
    }
}
// add searching event listener

