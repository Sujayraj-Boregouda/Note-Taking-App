/*****
Improvements Done by me
1) Prevent Empty Note to Enter by disabling the submit button
2) Creating alert for empty Notes
3) Add Confirm to Delete Validation
4) Improving search functionality

//This Method was used before // notesObj.push(addTxt.value);
//This Method was used before //<h5 class="card-title">Note ${index + 1}</h5>
//This Method was used before //<p class="card-text">${element}</p>
*****/


console.log("Hello App Users");
showNotes();

// If user Adds a Note, Add it to local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];        
    }
    else if (addTitle.value == '') {
        alert("Title can't be empty");
        button.disabled = true;
    }
    else if (addTxt.value == '') {
        alert("Notes can't be empty");
        button.disabled = true;
    }
    else {
        notesObj = JSON.parse(notes);
    }

    // Added this on update

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    showNotes();
});

// Function to show Notes element when add note button is clicked. We are pulling it from local storage
function showNotes() {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard mx-2 my-2 card" style="width: 18rem;">
                        <div class="card-body">                        
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        </div>
                 </div>`
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to Show!`;
    }
}


// Function To Delete Note
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    var confirmDeleteNote = confirm("Want to delete?");
    if (confirmDeleteNote == true) {
        notesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        showNotes();
    }
}


// Search Functionality
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});