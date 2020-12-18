/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
By: Matt Coale
*/

//Declare global variables
const itemsPerPage = 9; //Define max number of students to be shown per page
const studentList = document.querySelector('.student-list'); //assign .student-list class to a variable

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  const startIndex = (page * itemsPerPage) - itemsPerPage; //Start index of data/students for the current page
  const endIndex = (page * itemsPerPage); //Declare end index of data/students for the current page

  studentList.innerHTML = ''; //Set studentList to empty string to remove any students previously displayed

  //Loop over the list parameter
  for (let i = 0; i < list.length; i++) { //List all students from data.js
    if (i >= startIndex && i < endIndex) {
      //Using insertAdjacentHTML() method, dynamically add student info to index.html
      studentList.insertAdjacentHTML('beforeend', `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${data[i].picture.large}" alt="Profile Picture">
            <h3>${data[i].name.first} ${data[i].name.last}</h3>
            <span class="email">${data[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">${data[i].registered.date}</span>
          </div>
        </li>
      `);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const numOfPages = Math.ceil(list.length / itemsPerPage); //declare a variable to calc number of pages needed
  const linkList = document.querySelector('.link-list'); //assign .link-list class to variable

  linkList.innerHTML = ''; //Set linkList to empty string to remove any pagination buttons previously displayed

  for (let i = 0; i < numOfPages; i++) { //Add pagination to the app, iterating over listLength
    //Using insertAdjacentHTML() method, dynamically add individual pages into index.html
    linkList.insertAdjacentHTML('beforeend', `
      <li>
        <button type="button">${i + 1}</button>
      </li>
    `);
  }

  const li = linkList.firstElementChild; //get first child (li) of linkList
  const firstButton = li.firstElementChild; //get first child (button) of li for editing
  firstButton.className = 'active'; //Set the first button (1) as 'active' initially

  //Event Listener to track when a button is individually clicked by the user
  linkList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const activeButton = e.target;
      const activeClass = document.querySelector('.active');

      activeClass.className = ''; //Change class of 'active' to an empty string
      activeButton.className = 'active'; //Set the target button to 'active'

      let activePage = activeButton.textContent; //See what button is being clicked
      showPage(data, activePage); //pass values of data (data.js) and activePage to function, showPage()
    }
  });
}

// Call functions
showPage(data, 1); //By default, start on first page, showing 'data' list from beginning
addPagination(data); //Include list from data.js to calculate how many pages are required
