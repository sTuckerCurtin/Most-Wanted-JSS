
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchByTraits(people) {
    let filteredPeople = people;
    let searchCriteria = [];
  
    while (searchCriteria.length < 5) {
      const trait = validatedPrompt("Please enter a trait to search for:", 
      ["height", "weight", "gender", "occupation", "eye color"]
      );
      
  
      switch (trait.toLowerCase()) {
        case 'height':
          const height = parseInt(prompt('Enter the persons height: in inches.'));
          filteredPeople = filteredPeople.filter(person => person.height === height);
          searchCriteria.push(`height = ${height}"`);
          break;
        case 'weight':
          const weight = parseInt(prompt('Enter the persons: weight in pounds.'));
          filteredPeople = filteredPeople.filter(person => person.weight === weight);
          searchCriteria.push(`weight = ${weight}`);
          break;
        case 'gender':
          const gender = prompt('Enter the persons gender: male or female.');
          filteredPeople = filteredPeople.filter(person => person.gender.toLowerCase() === gender.toLowerCase());
          searchCriteria.push(`gender = ${gender.toLowerCase()}`);
          break;
        case 'occupation':
          const occupation = prompt('Enter the persons occupation.');
          filteredPeople = filteredPeople.filter(person => person.occupation.toLowerCase() === occupation.toLowerCase());
          searchCriteria.push(`occupation = ${occupation.toLowerCase()}`);
          break;
        case 'eye color':
          const eyeColor = prompt('Enter the persons eye color.');
          filteredPeople = filteredPeople.filter(person => person.eyeColor.toLowerCase() === eyeColor.toLowerCase());
          searchCriteria.push(`eye color = ${eyeColor.toLowerCase()}`);
          break;
        default:
          alert('Invalid trait entered.');
      }
  
      if (filteredPeople.length === 0) {
        alert('No matches found.');
        return [];
      } else if (filteredPeople.length === 1) {
        alert(`1 match found: ${filteredPeople[0].firstName} ${filteredPeople[0].lastName}`);
        return filteredPeople;
      }
  
      const continueSearch = prompt(`Results filtered by ${searchCriteria.join(', ')}.Do you want to continue searching? (y/n)`);
      if (continueSearch.toLowerCase() === 'n') {
        return filteredPeople;
      }
    }
  
    alert('Maximum of 5 search criteria reached.');
    return filteredPeople;
  }
  

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName} Do you want to know their full info, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            displayPersonInfo(person);
            break;
        case "family":
            let personFamily = findPersonFamily(person, people);
            displayPeople('Family', personFamily);
            break;
        case "descendants":
            let personDescendants = findPersonDescendants(person, people);
            displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName} - ${person.relationship}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}


function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}


function displayPersonInfo(person){
        let infoForPerson = "First Name: " + person.firstName+ "\n";
        infoForPerson += "Last Name: " + person.lastName+ "\n";
        infoForPerson += "Gender: " + person.gender+ "\n";
        infoForPerson += "Weight: " + person.weight+ "\n";
        infoForPerson += "Eye Color: " + person.eyeColor+ "\n";
        infoForPerson += "Height: " + person.height+ "\n";
        infoForPerson += "Occupation: "+ person.occupation+ "\n";
        alert(infoForPerson)
        
}

function findPersonFamily(person, people){
  let personFamily = [];
  for (let i =0; i < people.length; i++){
    if (people[i].lastName === person.lastName && people[i] !==person){
        personFamily.push(people[i])
    }
  }
  for (let i=0; i < personFamily.length; i++){
    let relationship = " ";
    if(personFamily[i].currentSpouse === person.id){
        relationship = "Partner"
    }
    else if(person.parents.includes(personFamily[i].id)){
        relationship = "Parent"
    }
    else if(personFamily[i].parents.includes(person.id)){
        relationship = "Child"
    }
    else if(person.gender === "male" || person.gender == "female" && personFamily[i].gender === "male" || person.gender === "female" || person.gender ==="male" && personFamily[i].gender === "female"){
        relationship = "Sibling"
    }
   
    personFamily[i].relationship = relationship 
  }
    displayPeople (`Family members of ${person.firstName} ${person.lastName} `,personFamily);
}


// function findPersonDescendants(person, people) {
//   let personDescendants = [];
//   for (let i = 0; i < people.length; i++) {
//     let relationship;
//     if (people[i].parents.includes(person.id)) {
//       relationship = "Child";
//     } else if (people.some(person => person.parents.includes(people[i].id) && person.parents.includes(person.id))) {
//       relationship = "Grandchild";
//       personDescendants.push(people[i]);
//     }
//     if (relationship) {
//       people[i].relationship = relationship;
//     }
//   }
//   displayPeople(`Descendants of ${person.firstName} ${person.lastName}`, personDescendants);
// }
function findPersonDescendants(person, people) {
    let personDescendants = [];
    
    function findDescendants(parent, people) {
      let children = people.filter(person => person.parents.includes(parent.id));
      for (let child of children) {
        personDescendants.push(child);
        findDescendants(child, people);
      }
    }
  
    findDescendants(person, people);
    displayPeople(`Descendants of ${person.firstName} ${person.lastName} ${person.relationship}`, personDescendants);
  }
  