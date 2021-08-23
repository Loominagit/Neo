# Neo
an open source discord bot written in JavaScript.

## Starting the bot
- The first step, create a file named `.env` in the root folder.
- Then, open that using any text editor, and put this in the file:
  ```
  TOKEN="YOUR-BOT-TOKEN-HERE"
  CLIENT_ID="YOUR-CLIENT-ID-HERE"
  ```
- Next, open Terminal / Command Prompt and install required dependencies by running `npm ci`.
- After it's done, register the commands by running `node deploy-cmd.js`.
  Make sure you put the correct token and client ID to the `.env` file, otherwise the command will not register properly!
- After that, you can safely start the bot by typing `node .` or `node index.js`.

## Contributing
Before creating an issue, please ensure that it hasn't already been reported / suggested.

See the [contribution guide](https://github.com/Loominagit/Neo/blob/main/.github/CONTRIBUTING.md) if you'd like to submit a PR instead.