# Frontend TEST

- [Frontend TEST](#frontend-test)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Code location](#code-location)
    - [Development](#development)
    - [Compatible engines](#compatible-engines)
    - [TODO](#todo)

## Requirements
- Gulp
- Git

## Installation

- npm install

## Code location

All the code is inside the  [src](./src) folder. When code is compiled, then is copied and executed from app folder.

## Development

- `npm start` or `gulp`

## Compatible engines

- Webkit , Gecko, EdgeHTML

## TODO

- Create a shared controller for navbars
- Create s shared controller for general behaviours (change background also when you refresh the chat view)
- Add behaviour to the status-user elements ( online | busy | offline )
- Add a better folder structure for improving maintenability when the project grows
- Add better compatibility with IE 10
- Add a "load more" button to render more than 20 messages in the chat view
- Create a Gulp task for to create and optimized distribution package of the app
- Improve the function goBottom when page is loaded (only load fution when chat view is enabled);