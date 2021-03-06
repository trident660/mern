# MERN Project

## Setup

Start a new VS Code Project - create new folder
Ctrl ` to open a terminal - ensure node, npm and git are installed.

Initialize the npm project: npm init -y - this creates the package.json file and node_modules folder
Install the following dependencies with npm init

## Code dependencies

1. brcrpytjs - provides password hashing tools
2. config - provides configuration settings for different environments
3. express - back-end web application framework
4. express-validator - validation for form data
5. jest - testing framework
6. jsonwebtoken - jwt tools
7. mongoose - wrapper for mongodb

## Development dependencies

Installing with npm i -D

1. concurrently - allows multiple commands to run concurrently - lets you start front and back-end together
2. nodemon - monitors for changes and restarts the server

Make some changes to the package.json file:

Change the index.js entry point to server.js, add a project description if required.
We'll replace the scripts section and add the server as "server":"nodemon"
Next add a repository as a git location as:
``"repository": {
    "type": "git",
    "url":"https://github.com/trident660/mern.git"
  }``

## Server setup

In the root of the app folder create a new server.js file.
A basic startup server is as follows:
``const express=require("express");
const app=express();

// lets heroku get the port
const PORT= process.env.PORT || 5000;

// just a test route for now
app.get('/', (req,res) => res.send('API Running'));

app.listen(PORT, () => console.log(`Server stated on port ${PORT}`));``

This will start a server on port 5000 unless the port is specified in the env.

At this point you can test the backend API with postman, Katalon or similar.

## MongoDb Atlas Cloud Setup

Setup a cloud instance of MongoDb.
Go to www.mongodb.com and setup an account if you dont have one.

Create a free cluster on AWS once logged in and verified.
Create a user for your cluster. E.g. trident660/ThisIsAnInsecurePassword

Once the cluster is up (with appropriate IP whitelisting), setup a connection and select "Connect your application"

You will get a connection string you can now use for your application.

## Connecting to Mongo

Create a new config folder under the project root. In this folder create db.js and default.json files.
Add the mongoDb_URI value to default.json.
In the db.js we'll add the connection info to connect using mongoose.
You can check these files for their current values.

Modify server.js to add the new connectDB and add the call to connectDb().

## Build data model

Create a new models folder and a User.js under that folder. Note: Uppercase first letter for the model name and singular name.
Check the User.js file for details

## Build API routes

Create a routes folder under root with an api folder and a users.js route file.

Once the users.js route is defined then the server.js needs to be updated to add the new /api/users route
Note: check that the default.json database connection is connecting to a database called 'test' or similar.

Once you have this done and the server restarted you can test the API using your favourite tool.
In the course it uses getSalt from brcyptjs but this appears to have changed. Using genSalt instead worked ok.

You can post and see the results in the mongoDb using the collection explorer.

## Validating the request body

In the users.js route we'll add check and validation entries.
Check the check and validationResult code in the users route.

## Configure JWT Authentication

Add the config and jsonwebtoken pakcages to users.js
We can add additional info the the payload as necessary.

## Creating and using middleware

Create a new middleware folder and new auth.js file unser routes/api
This will auth file that extracts the x-auth-token header and decodes it

## Unit tests

We'll use jest to run some unit tests.
The dependency should be moved to a development dependency as its not a runtime requirement.
We'll also add cross-env that allows for platform changes (dev/prod)
``npm uninstall jest
npm i -D jest cross-env``

Add a new tests folder and add an auth.test.js file within it.
Tests can end in test.js or be in a tests folder.
Update the package.json to add in a test script ``"test":"jest"``

Run the tests by calling ``npm run test``

## Preparing front-end dependencies

We'll use NPX and create React app. (npm installs/runs , npx executes packages)

``npx create-react-app client``

Change into the client folder and install the following

``npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension``

We can remove the .gitignore and .git folder if we're not working with git.
We'll add a couple more scripts to package.json for running client/server concurrently and for running the client from the client folder with --prefix
We'll also add a proxy to package.json for the client so we dont need fully qualified hostname for axios requests.

If we run `npm run dev` we'll start everything and the browser should show the default page.

## Build the home page and nav components

Added a simple script link to fontawesome.
Remove the src files and start clean in the client.
Add the App.js, App.css and the components for layouts: Home and Navbar
Check the client folders for the details.
The page will appear but no links will work until we add the router.

## Configure the React router

Had to make some tweaks here to change the router options due to updates in react. 
The Switch is replaced with Routes.
The react-router-dom pakcage takes care of most of the routing.
We also added a form to both Login and Register components. THe onChange handler with the spread operator and useState function is capturing the data.

## Configure the redux store

The sample was using redux - I'll try and convert to using Hooks instead.
I'll start with redux and then try to swap over.
Redux basically uses a provider and store. The entire app needs to be wrapped with the provider. This way all components will have access to the app-level state.
In this section the store was setup but wasnt actually told to do anything.

## Working with reducers and actions

The type.js file was added that indicated the action response types, in our case REG_PASS and REG_FAIL for registration.
The auth.js file under actions is responsible for the registration action that is then plugged into the Register component on the form submit.

In React 18 I think we can do all this without the need for redux.
One other minor change was adding the PropTypes to auth.js to indicate whats expected input.

## Configure authentication

We'll add a bunch of new action types in types.js
This gets a little tricker with mapping state to properties but basically we have a bunch of actions for login, logout and they fire dispatch requests.

## Deploying to the cloud

Use a free Heroku account. You'll also need a github account and git installed.
Create a new repo in guthub and upload your project.
Install the Heroku CLI tool from Documentation, CLI on the Heroku site

```heroku login
heroku create
heroku git:remote -a nameless-sands-96705
git push heruko main
```