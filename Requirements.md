# Requirements

In order to get a complete score on the project, you have to follow the following requirements:

The requirements are divided into API, pages, and core components. Core components are components that have to show up on all pages.

## API

```
This contains all the documentation you need.
Documentation = https://developer.themoviedb.org/docs

This contains the references to the API endpoints
API_References = https://developer.themoviedb.org/reference/

This contains the Baseurl that you will use to interact with the API.
API_BASEURL = https://api.themoviedb.org/3
```

We will be using themoviedb API. To use it, one of you will have to register their account. Take the API-Key, which is used to authenticate all the requests to the API and use it. Please follow the following:

1. Go to this [page](https://developer.themoviedb.org)

## Core components

These are the core components that have to show up on all pages:

1. Navbar - The Navbar should show up on all pages and contains the following:
   1. Logo - This could be a design or simply text of your page.
   2. Genres - This is a drop down that include the genres of all movies. The Genres should be fetched from the API.
   3. Movies - This is another dropdown that contains the following options ["Top Rate", "Popular", "Latest", "Now playing", "Upcoming"] - Clicking on one of these options takes the user to the movies page (#2) and gives them the corresponding data. Each one of those has a dedicated API route.
   4. Actors - Goes to the Actors page (#4) and shows a list of all popular actors.
   5. Search box where you can type the movie or actor name and display the related results.
2. Footer - The footer should also show up on all pages and include the credit to you and your team mates (Names + Github + LinkedIn)

## Pages

Your website need to have the following pages:

1. Home page - This should contain a list of the latest movies. Clicking on a movie should take the user to the Single Page movie (See #3)
2. Movies page - This page contains lists of movies. Depending on the user choice in the Navbar (See above) this page shows the corresponding information. For example, if the user clicked on "Top rateed" in the Navbar this page shows all the top rated movies. This page will act almost similar to the home page. It will show lists of movies. When the user clicks on a movie it takes them to the Single Movie Page (#3)
3. Single Movie page - This pages shows the information about the current movie.
   1. It should contain the following information:
      1. The movie poster
      2. The movie title
      3. Release date
      4. Runtime
      5. Movie's Language
      6. The movie rating and how many votes has it received
      7. Director's name
      8. Overview of the movie
      9. The main 5 actors of the movies in the credit section (Use the API for this)
      10. A related movies section which includes at least five related movies (Use the API for this)
      11. A trailer section that has the movie trailer from youtube
      12. The movie production company name and logo.
   2. Functionality:
      1. Clicking an actor in the main actors should go to the single actor page.
      2. Clicking on a movie in the related movies section should take you to the Single movie page (#3)
4. Actors page - Shows a list of all popular actors. Clicking on an actor takes you to the Single actors page (#5)
5. Single actors page - Shows information about the current actor.
   1. The information includes:
      1. Actor picture (If applicable. Some actors have no pics)
      2. Actor name
      3. Gender
      4. Popularity
      5. Birthday
      6. Biography
      7. [BONUS] - List of movies the actor participated in.
6. BONUS - If you finished early, can you also show tv shows as well?

## Aesthetics (Styling)

Styling everything on your website from scratch will take a lot of time. However, there are some libraries that you can use to help you with styling.

### Examples

1. [reactstrap](https://reactstrap.github.io/)
2. [Antd](https://ant.design/)
3. [chakra-ui](https://chakra-ui.com/)
4. [Material UI](https://mui.com/)
5. [tailwindcss](https://tailwindcss.com/)

There are a lot more than those, but these are the famous ones. Open them and check which ones seem easier for you and use them. Also, notice how I listed tailwindcss at the bottom. Thats because it doesn't come with ready components and you will need to develop things from scratch in some cases.

## Code layout

All the code should be put inside the right places. Look at the following example

```text
src/
├─ pages/
│  ├─ index.jsx           // Home page
│  ├─ movies/
│     ├─ index.jsx        // Movies page
│     ├─ [movieId].jsx    // Single movie page
├─ components/
│  ├─ Navbar/
│     ├─ Navbar.jsx
├─ util/
│  ├─ API.js // This is optional, but can help organize your API requests into functions that you import into the right place.
```

All pages should be in the pages folder. All the components should be in the components folder. It's also a good practice to create a separate folder for each component with the same name.

## Project Management **(VERY IMPORTANT)**

All the tasks in the project should be put inside the issues tab in Github. The project should also use the [Git WorkFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), so you have to utilize different branches/task. This way it will reduce the amount of conflicts that could be faced.

This project could be the best, but if it lacks any form of project management then you won't learn anything. So get over your fears, if there are any, and work on your Git work skills. It will help you immensely in the long run.

This will also help you out when you apply to jobs because potential employers will look at this project and be able to surmise what you have done and the fact that you understand Git workflow as well.

**On presentation day we will ask you to show us your Github**

## Git and commits

**Pull Requests**

- Go to the issues board and create a new issue with the task assigned to you.
- Assign the issue to yourself so others know who is working on this issue.
- Create a new pull request from that issue and also assign it to yourself, Github will automatically create a branch for you and give you instructions how to check it out.
- After finishing the work, push your code and assign the team leader on that pull request so they can review the code.

**Commit Message Format**

After you finish wrapping up the Setup of Commitizen inside the setup page, you will have to use `git cz` when you make a new commit to follow this convention.

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type** and a **subject**:

```
<type>: <subject>
<BLANK LINE>
<body>
```

The **header** is mandatory, while the **body** is optional but highly encouraged.

**Type**

Must be one of the following:

- **Build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **CI**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **Doc**: Documentation only changes
- **Feat**: A new feature
- **Fix**: A bug fix
- **Perf**: A code change that improves performance
- **Refactor**: A code change that neither fixes a bug nor adds a feature
- **Style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **Test**: Adding missing tests or correcting existing tests

**Subject**

The subject contains a succinct description of the change:

- use the imperative, present tense: “change” not “changed” nor “changes”
- don’t capitalize the first letter
- no dot (.) at the end

**Body**

Just as in the **subject**, use the imperative, present tense: “change” not “changed” nor “changes”. The body should include the motivation for the change and contrast this with previous behavior.

**All these things will already be handled for you using commitizen and commitlint (See the setup page)**

## Finalizing

After finishing the project, do the following:

1. Deploy the project on netlify so you can have a link to use it in your portfolio. Don't forget to add a link in your website that points to this project.
2. Remove everything from this README.md file and add the following content to it:
   1. A screenshot of the website.
   2. Your project's name.
   3. Description of the project.
   4. Tools used.
   5. Your names.
