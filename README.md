# Drone Challenge


## Part 1

Bigdatr has an aerial drone which it uses to take photographs of billboards. Instructions are sent to the drone in a simple language that tells the drone which direction to move and when to take a photo. Moves are always exactly 1 km to the north (^), south (v), east (>) or west (<) or take a photograph (x).

Unfortunately the instruction processor is not perfect yet so the drone may photograph the same billboard multiple times.

_How many billboards are photographed at least once?_

For example:
- `x^xv` takes photos of 2 billboards and ends up back at the starting location
- `x^^x>>xvvx<<x` takes photos of 4 billboards, including 2 photos of the same billboard at the starting location

## Part 2
Using the same input as Part 1 - Bigdatr acquires a second drone to help speed up the process of photographing billboards. The drones both take off from the same location and then take turns moving based on the same instructions.

_How many billboards are photographed at least once?_

For example:
- `x^xv` takes 2 photos of the same billboard, because the 1st drone stays in place and takes 2 photos and the 2nd drone moves 1 km north and then 1 km south to end up in the starting location
- `x^^x>>xvvx<<x` takes photos of 4 different billboards and both drones still end up back at the starting location


## Requirements
Fork or download this project to answer the questions in part 1 & 2.
The project consists of an express route in `api.js` and a react client in `client.js`.

1. Use `src/api.js` to build an api that can process drone instructions and return an answer.
2. Use `src/client.js` to build a front end that can send instructions to the api and render the response.
3. We will use sample-input.txt to validate your api.

* If you are a back-end developer we will mostly look at your work in `api.js`
* If you are a front-end developer we will assess the UI built in `client.js`


## Getting Started

```sh
# install dependencies
yarn install

# Run the api and client
yarn watch

# open the app
open http://localhost:4000
```
