# Webpack Kickstart

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![gitmoji](https://img.shields.io/badge/gitmoji-%F0%9F%98%9C%F0%9F%98%8D-yellow.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)
![license](https://img.shields.io/npm/l/express.svg)

A basic template kickstarter for Webpack projects

## Getting Started

These instructions will get you a copy of this repo up and running on your local machine, and then use it to kickstart a new project.

### Prerequisites

*   [Node.js](https://nodejs.org)
*   [yarn](https://yarnpkg.com/)

```shell
# On macOS, with [Homebrew](https://brew.sh/)
brew install node
brew install yarn
```

### Installing

1.  Download this repo by clicking the "Clone or download" button in the upper right, then click "Download ZIP" (or clone it if you prefer).
2.  Unzip the repo
3.  `cd` into the repo in your [favorite terminal emulator](https://www.iterm2.com)
4.  Install the dependencies:

```shell
yarn install
```

5.  Run the kickstart script:

```shell
yarn kickstart
```

6.  Follow along with the prompts to generate your new project!

    *   If you want the easiest setup possible, select "webpack-dev-server" for your server.
    *   If you're planning on adding something like [socket.io](https://socket.io) or [Johnny-Five](http://johnny-five.io/) to the server, use "express".

7.  To start your server:

```shell
yarn start
```

## Authors

*   **John Mars** - _Initial work_ - [m4r5.io](http://m4r5.io)

## License

This project is licensed under the MIT License.

## Acknowledgments

*   Idea & basic kickstarting code: [lifenautjoe/webpack-starter-basic](https://github.com/lifenautjoe/webpack-starter-basic)
