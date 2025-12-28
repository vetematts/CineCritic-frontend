# About
CineCritic is a full-stack web application that allows users to browse films and share reviews and ratings. This repository is the web application for generating the front end views and connects with the database through API contracts.

# Dependencies
|Name|Description|
|----|-----------|
|[NPM](https://www.npmjs.com/)|Node package manager handles all the integration of import packages used in this project|
|[Vite](https://www.npmjs.com/package/vite)|Frontend build tool|
|[React](https://react.dev/)|Framework to build the web application|
|[React-Router](https://reactrouter.com/)|Add routing capability to the React application|
|[ESLint](https://eslint.org/)|Highlights potential errors in the code and formatting issues.|
|[Prettier](https://prettier.io/)|Code formatter to keep our code formatted to our preferred style guide.|
|[ESLint-Config-Google](https://www.npmjs.com/package/eslint-config-google)|Google style guide that prettier and eslint use to format the code.|
|[Vitest](https://www.npmjs.com/package/vitest)|Unit testing for the web application. It is compatible with [Jest](https://jestjs.io/) libraries.|
|[@testing-library/react](https://www.npmjs.com/package/@testing-library/react)|Vitest library with React testing features.|
|[@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)|Library that tests the state of the DOM.|
|[@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event)|Library with testing features that simulate users interacting with the web application.|
|[Styled-Components](https://styled-components.com/)|Adds styling capabilities to React Components.|

## Setting up
    npm install vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event --save-dev

Notes:
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported