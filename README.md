# todo-backend-restify

An implementation of Todo Backend using Restify.

Or at least it started out that way.

Over time, I'm making this project more opinionated by adding different npm scripts, packages, build tools, deployment, and other functionality. These will serve as sensible defaults and save a tremendous amount of time. Using these defaults, a developer can build any kind of app, and start with a combination of some well-researched quality tools in one convenient place.

This will eventually evolve into a fantastic skeleton project for any new Javascript API project that agrees with the philisophy of this repo.

A [meatier](https://github.com/mattkrick/meatier) alternative. Like meatier, but vegan-er.

## Contents

* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Directory Structure](#directory-structure)
* [Developing](#developing)
* [Testing](#testing)
* [Deployment](#deployment)
* [Documentation](#documentation)
* [Contributing](#contributing)

## Tech Stack

### API

Category | Name                                             | Comments
-------- | ------------------------------------------------ | --------
Routing  | [Restify](http://www.restify.com/)               | The fastest API router, and pleasantly minimalist
Testing  | [Dredd](http://dredd.readthedocs.org/en/latest/) | Very useful tool for testing your API endpoints from your existing API Blueprint specs
Docs     | [Aglio](https://github.com/danielgtaylor/aglio)  | Convenient API doc generator using your existing API Blueprint specs
Specs    | [API Blueprint](https://apiblueprint.org/)       | Portable API spec format using Markdown, supported by Apiary, Aglio, and more

### Application

Category                      | Name                                               | Comments
----------------------------- | -------------------------------------------------- | --------
Process manager in production | [forever](https://github.com/foreverjs/forever)    | The best tool for keeping your node server running
Process manager on dev        | [nodemon](http://nodemon.io/)                      | The best tool for restarting your node process every time you make a code change
Configuration                 | [config](https://github.com/lorenwest/node-config) | Has everything we need: auto-loads based on environment name, applies the chosen config file over a default config file, performs a deep merge, and doesn't allow accidental or intentional config overriding in code

### Libraries

Category           | Name                                                     | Comments
------------------ | -------------------------------------------------------- | --------
Utility library    | [lodash](https://lodash.com/)                            | Fantastic functional Javascript library; arguably the best Javascript utility library around
HTTP requests      | [SuperAgent](http://visionmedia.github.io/superagent/)   | The most popular client/server agnostic HTTP request library
Markdown previewer | [Markdown Live](https://github.com/mobily/markdown-live) | Hot reload a live preview page showing the markdown file you're editing, like the README

## Installation

### Prerequisites

* Node.js >= 5.6.0
* npm >= 3.6.0

If you don't have Node.js and npm, download Homebrew, download nvm,
and then install node using that, which also comes with npm.

### Instructions

Install packages

```bash
npm install
```

Make sure the local server runs properly

```bash
npm start
```

Go to http://127.0.0.1:3000/ and make sure you see something.
If you see something, it's working :)

## Directory Structure

Path        | Comments
----------- | --------
/           | Root directory. Contains .gitignore, api-spec.apib, LICENSE, package.json, README.md, and server.js.
/public     | Public directory for static files that might need to come from the API. Contains nothing, unless you need to serve static files.
/src        | Where all your source code lives. Contains other folders.
/src/api    | API routes. Contains files which each represent a set of routes.
/src/models | Database models. Contains files which usually each represent a database table.

## Developing

Update packages each time you pull new code from Github

```bash
npm install
```

Run the local server at the beginning of each coding session

```bash
npm start
```

View your app here: http://127.0.0.1:3000/

Static files are available under this path: http://127.0.0.1:3000/static/

Every time you save your code, the server gets restarted because we use nodemon

## Testing

Run Dredd to check the API against the spec

```bash
npm run test-api-spec
```

## Deployment

### Code

#### Setup

Set up Heroku

```bash
brew install heroku
```

Run Heroku once to log in

```bash
heroku
```

Link your local repo to Heroku (the last arg is the name of your heroku app)

```bash
heroku git:remote todo-backend-restify
```

#### Releasing

Deployment is handled automatically by Heroku.
Make sure the "GitHub Connected" deployment option is enabled.

Whenever master gets updated, Heroku updates itself.

Deploy manually if you aren't using connected repos

```bash
git push heroku master
```

#### Debugging

Check the Heroku logs

```bash
heroku logs
```

## Documentation

Run Aglio to preview the API docs as you edit the spec, with hot reloading

```bash
npm run preview-api-docs
```

Run Markdown Preview to preview the README file as you edit it,
with hot reloading

```bash
npm run preview-readme
```

## Contributing

Do you know of other packages that you think would be useful for a general
purpose but very useful Javascript API skeleton project?

Do you think any of these defaults can be improved with alternate packages?

Did you find a bug?

Or just want to tell say that you found this useful?

...then reach out! :)

Please feel free to create issues on GitHub and/or fork the repo and make pull
requests.
