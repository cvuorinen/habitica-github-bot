# habitica-github-bot

Serverless function that post info about GitHub issues to Habitica

Runs as a serverless lambda function on [Netlify](https://www.netlify.com/docs/functions/).

## Setup

- GitHub Webhook needs to be set up and pointed to the URL of the function

## Features

- When `help wanted` label is added to an issue, post the issue description & link to Habitica Aspiring Blacksmiths Guild
