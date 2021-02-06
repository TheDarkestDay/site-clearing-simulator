# Site clearing simulator

## Overview

This is the repo for web-based Construction Site Clearing Simulator. This application main purpose is to perform a 
simple modelling of a construction site clearing.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tech stack

The primary tech stack for this project consists of the following libraries and frameworks:

- [React](https://reactjs.org/) for UI layer
- [Redux](https://redux.js.org/) for centralized state management
- [Redux Toolkit](https://redux-toolkit.js.org/) for having some convenient tools for reducing Redux boilerplate
- [React Material UI](https://material-ui.com/) -  a UI framework with ready-made components which address concerns of fancy appearance and a11y
- [TypeScript](https://www.typescriptlang.org/) - a strongly-typed super-set of JavaScript
- [Create React App](https://create-react-app.dev/) - a CLI tool for quickly spinning up build toolchain for React applications

## Design

On a high-level this application is structured in application-feature fashion, where each folder corresponds to some specific application concern.

In particular, we have the following folders inside `src` folder:

- `app` - the application folder. This folder is supposed to hold root component along with some configuration and routes 
information. You should compose your application by including several features into your app
- `site-clearing-simulator` - the only feature of this app. Contains all of the components and logic related to site clearing simulation.
- `store` - a special folder for holding the root Redux store of the application as well as some data structures which might be required for all of the features
- `utils` - a module for other small highly-focused functions which can be potentially used across multiple features

## How to run

Make sure that you have current LTS release (14.15.3) of Node.js installed.

1. Install dependencies with `npm install`
2. Start project dev server with `npm start`

Developer server will be available at [http://localhost:3000](http://localhost:3000).

## Other available scripts

You are free to use any other CRA included NPM scripts including the ones below.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
