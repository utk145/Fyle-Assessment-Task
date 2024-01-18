# GitHunter Web App

GitHunter is a simple web app that allows users to search for GitHub profiles and view repositories. It's built using HTML, CSS, and JavaScript.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Demo](#demo)
- [Task](#task)

## Features
- Search for GitHub profiles
- Display user details and repositories
- Pagination for repositories
- Responsive design for various screen sizes
- Redirection to respective repository
- Loader when api call in progress

## Getting Started
To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/utk145/Fyle-Assessment-Task.git
   cd Fyle-Assessment-Task
   ```
2. Open the `index.html` file in your preferred web browser.



## Usage
- Enter a GitHub username in the input field.
- Set the desired number of repositories per page.
- Click the "Search" button to fetch and display the user's profile and repositories.

## Demo
Check out the hosted version of the app : [GitFinder Web App](https://utproj-githunter.netlify.app/).


## Task
Complete details about the task can be found [here](https://fyleuniverse.notion.site/Fyle-Web-Development-Internship-Channel-17d5401b2ebf47cf90a77f7b39ec680c).

✅ indicates implemented.

### Requirements

- The below image represents a topic of a particular repository; one repository could have multiple topics ✅:

    ![Repository Topic](https://fyleuniverse.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7743fc64-964a-4fb2-a231-d646d2d88e0a%2FScreenshot_2021-05-17_at_3.11.10_AM.png?table=block&id=f5dc621e-cee0-4ce3-8d01-c61485041ae6&spaceId=983632c5-ee66-4f64-a1a6-b3eeff04ddb8&width=150&userId=&cache=v2)

- Pagination:
  - By default, show 10 repositories per page ✅
  - User should be able to choose a maximum of 100 repositories per page. ✅
  - When the API calls are in progress, consider showing loaders. ✅
- The assignment has to be done in pure HTML, CSS and Javascript. ✅
- Handling edge cases. ✅
- Optionally, you can provide a search bar to filter the repositories.
