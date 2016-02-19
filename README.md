# todo-backend-restify

An implementation of Todo Backend using Restify.

## Tech Stack

* Node.js (backend langauge)
* Restify (backend framework)
* API Blueprint (API spec)
* Dredd (API testing framework)

## Prerequisites

* Node.js >= 5.5.0
* npm >= 3.7.3

### If you don't have these

Install Homebrew

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Install nvm

```bash
brew install nvm
```

Install Node.js v5.5.0 and npm

```bash
nvm install 5.5
```

Update npm
```bash
npm update -g npm
```

## Installation

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

## Developing

Update packages each time you pull new code from Github

```bash
npm install
```

Run the local server

```bash
npm start
```

### Localhost

URL: http://127.0.0.1:3000/

## Testing

Run Dredd to check the API against the spec

```bash
npm run dredd
```
