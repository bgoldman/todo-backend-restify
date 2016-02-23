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

### Primary

* Node.js (backend langauge)
* Restify (backend framework)
* nodemon (process manager)
* Dredd (API testing)
* API Blueprint (API spec)

### Everything

Category          | Name                                             | Comments
----------------- | ------------------------------------------------ | --------
Routing           | [Restify](http://www.restify.com)                | The fastest API router, and pleasantly minimalist
Process manager   | [nodemon](http://nodemon.io/)                    | The best tool for keeping your node server running, and restarting your node process every time you make a code change
API testing       | [Dredd](http://dredd.readthedocs.org/en/latest/) | Very useful tool for testing your API endpoints from your existing API Blueprint specs
API docs          | [Aglio](https://github.com/danielgtaylor/aglio)  | Convenient API doc generator using your existing API Blueprint specs
API specs         | [API Blueprint](https://apiblueprint.org/)       | Fantastic API spec format using Markdown
Markdown          | [Markdwon Live](https://github.com/mobily/markdown-live) | Helpful tool to hot reload a live preview page showing the markdown file you're editing, we use this for the README

## Installation

### Prerequisites

* Node.js >= 5.5.0
* npm >= 3.7.3

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

Link your local repo to Heroku

```bash
heroku git:remote todo-backend-restify # the last arg is the name of your heroku app
```

#### Releasing

Deployment is handled automatically by Heroku. Make sure the "GitHub Connected" deployment option is enabled.

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

Run Algio to preview the API spec as you edit it, with hot reloading as you edit it

```bash
npm run preview-api-spec
```

Run Markdown Preview to preview the README file as you edit it, with hot reloading as you edit it

```bash
npm run preview-readme
```

## Contributing

Do you know of other packages that you think would be useful for a general purpose but very useful Javascript API skeleton project?

Do you think any of these defaults can be improved with alternate packages?

Did you find a bug?

Or just want to tell say that you found this useful?

...then reach out! :)

Please feel free to create issues on GitHub and/or fork the repo and make pull requests.