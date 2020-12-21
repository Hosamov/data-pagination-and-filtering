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
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">${list[i].registered.date}</span>
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

  const btnType = linkList.querySelector('[type="button"]');
  if(btnType){
    btnType.className = 'active';
  }

  //Event Listener to track when a button is individually clicked by the user
  linkList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const activeButton = e.target;
      const activeClass = document.querySelector('.active');

      activeClass.className = ''; //Change class of 'active' to an empty string
      activeButton.className = 'active'; //Set the target button to 'active'

      let activePage = activeButton.textContent; //See what button is being clicked
      showPage(list, activePage); //pass values of data (data.js) and activePage to function, showPage()
    }
  });
}

/*
Add a Search Bar & Submit Button
Create a function to allow searching for specific name criteria
*/
const header = document.querySelector('.header'); //Target the header element for inserting HTML:

function searchPage(list) { //Create a function with a parameter of 'list'
  header.insertAdjacentHTML('beforeend', `
    <label for="search" class="student-search">
      <input id="search" placeholder="Search by name..." value="">
      <button type="button" class="submit-button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
  `);

  //initialize variables for event listener
  const searchBar = header.querySelector('#search');
  const searchBtn = header.querySelector('.submit-button');

  searchBtn.addEventListener('click', (e) => { //target the search button
    filterData(list);
  });

  searchBar.addEventListener('keyup', (e) => { //target search bar
    filterData(list);
  });
}

/*
Filter Search input
*/
function filterData(list) { //call list parameter
  const searchInputValue = header.querySelector('#search').value.toLowerCase();  //Target input id of 'search' and convert its value to lower case
  let filteredList = []; //Create a new array to hold the filtered results, below

  for(let i = 0; i < list.length; i++) {
    const fullName = `${list[i].name.first} ${list[i].name.last}`.toLowerCase(); //concatenate first and last name of students on the list and convert names to lower case
    //check to see if the full name matches any or all of the search input
    if(fullName.includes(searchInputValue)) {
      filteredList.push(list[i]); //add it to filteredList array
    }
  }

  if (!filteredList.length) {   //Check to see if there are no matches
    studentList.innerHTML = '<h1>No results found.</h1>'; //let the user know
  } else {
    console.log(filteredList);
    showPage(filteredList, 1); //otherwise, send filteredList array to the showPage function
  }
  addPagination(filteredList); //Send filteredList to addPagination function to match length of the array
}

// Call functions
showPage(data, 1); //By default, start on first page, showing 'data' list from beginning
addPagination(data); //Include list from data.js to calculate how many pages are required
searchPage(data);
