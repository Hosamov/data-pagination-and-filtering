/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const studentList = document.querySelector('.student-list');
const itemsPerPage = 9; //Set how many items to be shown per page
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = (page * itemsPerPage);

  studentList.innerHTML = '';

  //Loop over the list parameter
  for (let i = 0; i < 9; i++) {  //TODO: replaced '6' with list.length
    if(i >= startIndex && i < endIndex) {

      // function createElement(elementName, newElement, className) { //Ex: createElement('label', 'textContent', 'Confirmed')
      //   const element = document.createElement(newElement);
      //   element.className = className;
      //   return element;
      // }
      //
      // function appendToElement(elementName, newElement, className) {
      //   const element = createElement(elementName, newElement, className);
      //   const elementItem = elementName;
      //   elementItem.appendChild(element);
      //   return element;
      // }

      const li = document.createElement('li');
      li.setAttribute('class', 'student-item cf'); //setClass(li, 'class', 'student-item cf');
      studentList.appendChild(li);

      const studentDetails = document.createElement('div');
      studentDetails.setAttribute('class', 'student-details');
      li.appendChild(studentDetails);

      const avatar = document.createElement('img');
      avatar.setAttribute('class', 'avatar');
      avatar.setAttribute('src', `${data[i].picture.medium}`);
      studentDetails.appendChild(avatar);

      const h3 = document.createElement('h3');
      studentDetails.appendChild(h3);
       h3.innerHTML = `${data[i].name.first} ${data[i].name.last}`;

      const span = document.createElement('span');
      studentDetails.appendChild(span);
      span.innerHTML = `${data[i].email}`;

      const joinedDetails = document.createElement('div');
      joinedDetails.setAttribute('class', 'joined-details');
      li.appendChild(joinedDetails);

      const joinedDate = document.createElement('span');
      joinedDate.setAttribute('class', 'date');
      joinedDetails.appendChild(joinedDate);
      joinedDate.innerHTML = `Joined ${data[i].registered.date}`;
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {

}

// Call functions
showPage(data,1);

addPagination();
