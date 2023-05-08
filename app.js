
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
      const trait = prompt(`Please enter a trait to search for (${5 - searchCriteria.length} remaining): Height, Weight, Gender, Occupation or Eye Color.`);
  
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
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
            // displayPersonInfo(person);
            break;
        case "family":
            //! TODO
            // let personFamily = findPersonFamily(person, people);
            // displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            // let personDescendants = findPersonDescendants(person, people);
            // displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
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