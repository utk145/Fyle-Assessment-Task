let currentPage = 1;
let reposPerPage = 10;
let allRepos = [];

const searchButton = document.getElementById('search_btn');
const usernameInput = document.getElementById('username_input');
const userProfileSection = document.getElementById('user_profile');
const repositoriesSection = document.getElementById('repositories');
const paginationDiv = document.getElementById('pagination');
const loader = document.getElementById('loader');
let reposPerPageInput = document.getElementById('repos_per_page_input');
reposPerPage = parseInt(reposPerPageInput.value, 10);

searchButton.addEventListener('click', async function () {
    const username = usernameInput.value;
    if (username) {
        currentPage = 1;

        // show loader
        loader.style.display = 'block';

        try {
            await fetchUserProfile(username);
            await fetchRepositories(username);
        } catch (error) {
            console.error('Error:', error);
            displayUserNotFound(error.message);
        } finally {
            loader.style.display = 'none';
        }
    }
});

async function fetchUserProfile(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
        throw new Error('User not found');
    }

    const user = await response.json();
    displayUserProfile(user);
};

function displayUserProfile(user) {
    userProfileSection.style.display = 'flex';
    document.getElementById('avatar').src = user.avatar_url;
    document.getElementById('username').textContent = `@${user.login}`;
    document.getElementById('bio').textContent = user.bio;

    const locationElement = document.getElementById('location');
    locationElement.innerHTML = user.location
        ? `<svg class="octicon octicon-location" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="green"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path></svg> ${user.location}`
        : "";

    document.getElementById('blog').href = user.blog;
    document.getElementById('blog').textContent = user.blog;
    document.getElementById('githubLink').href = user.html_url;
};

function displayUserNotFound(message) {
    userProfileSection.style.display = 'none';
    repositoriesSection.innerHTML = '';

    // not found message
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.className = "error_message";
    repositoriesSection.appendChild(errorMessage);
};


async function fetchRepositories(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    allRepos = repos;
    updateReposPerPage();
    displayRepositories();
};

function updateReposPerPage() {
    reposPerPage = parseInt(reposPerPageInput.value, 10);
};

function displayRepositories() {
    repositoriesSection.innerHTML = '';

    // calculating start and end index 
    const startIndex = (currentPage - 1) * reposPerPage;
    const endIndex = startIndex + reposPerPage;

    allRepos.slice(startIndex, endIndex).forEach(repo => {
        const repoCard = createRepoCard(repo);
        repositoriesSection.appendChild(repoCard);
    });

    updatePagination();
};

function createRepoCard(repo) {
    const repoCard = document.createElement('div');
    repoCard.className = 'repo-card';

    const repoLink = document.createElement('a');
    repoLink.href = repo.html_url;
    repoLink.target = '_blank';

    const repoName = document.createElement('p');
    repoName.className = 'repo-name';
    repoName.textContent = repo.name;
    repoLink.appendChild(repoName);

    const repoDescription = document.createElement('p');
    repoDescription.textContent = repo.description;

    const repoLanguage = document.createElement('p');
    repoLanguage.textContent = repo.language ? `Languages: ${repo.language}` : "";
    repoLanguage.style.marginTop = ".6rem"

    // appending anchor and other elements to the repoCard
    repoCard.appendChild(repoLink);
    repoCard.appendChild(repoDescription);
    repoCard.appendChild(repoLanguage);

    if (repo.topics && repo.topics.length > 0) {
        const topicsContainer = document.createElement('div');
        topicsContainer.className = 'topics-container';

        const topicsTitle = document.createElement('p');
        topicsTitle.textContent = 'Topics:';
        topicsContainer.appendChild(topicsTitle);

        repo.topics.forEach(topic => {
            const topicButton = document.createElement('button');
            topicButton.className = 'topic-button';
            topicButton.textContent = topic;
            topicsContainer.appendChild(topicButton);
        });

        // appending repoCard to the repositories container
        repoCard.appendChild(topicsContainer);
    }

    return repoCard;
};

function updatePagination() {
    const totalPages = Math.ceil(allRepos.length / reposPerPage);
    paginationDiv.innerHTML = '';

    //pagination buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('pagination-button');
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayRepositories();
        });
        paginationDiv.appendChild(pageButton);
    }
};
