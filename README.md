# Gameify
Welcome to Gameify! Gamify is already a legitimate company so we're rolling with the tastefully mispelled version. This project is intended to be a sandbox for me to explore new concepts, frameworks, or libraries, and to show off what I've learned by game-ifying them!

## Heroku
This project is deployed on Heroku. [Check it out!](https://jerry-gameify.herokuapp.com/)

https://jerry-gameify.herokuapp.com/

## Installation
Execute:
```
$ bundle i
$ rails db:migrate db:seed
$ npm i --prefix client
```

## Local Initialization
Run in the main directory to initialize API: `$ rails s`

Run in a separate terminal in the main directory to initialize client: `$ npm start --prefix client`

Go to `http://localhost:4000/` in your web browser to view the application.

## Usage
If you are a new user, create an account to be granted access to additional features like submitting and tracking your scores and performance. If you don't want to be bothered creating one, worry not. You can still view leaderboards along with other user profiles and have fun messing around with the games!


## Features and Implementations
### Backend API:
The API was built using Ruby, Ruby on Rails, Active Record, and PostGreSQL. I utilized the BCrypt password hashing algorithm to securely store encrypted passwords, and saved usernames as a citext data type to ensure case-insensitive uniqueness of usernames.

As for the relational database, I designed a standard many-to-many relation between `Users` and `Games`, with `Scores` as the join table. Validations are applied to `Users` and `Scores` to ensure the uniqueness and presence of select data and to handle error messages sent through the controllers to the client. Custom serializers, such as `/app/serializers/leaderboards_serializer.rb`, are used to carry specifically organized data to lessen workload/calculations on the client side.

The seed data was implemented by creating fake `Users` with randomly generated usernames and emails using the Ruby Faker gem. The `Games` are created with a name and description whenever I make a new game. The `Scores` are created between each `User` and `Game` multiple times to generate enough data for the leaderboards, and they're created with percentiles of the average user score in mind.

### Client
The client was created with JavaScript, React, Context API, HTML, CSS, Bootstrap, and ReactRouterDOM. The ReactChartJS2 library was implemented to visually showcase a user's linear progression on their profile page. I separated functional components based on reusability and readability and isolated each game's components into its own subfolder for better organization. React hooks and UseContext are used throughout the application for clean and restructurable code.

CSS animations and frames were explored in this project and can be seen on the titles of games on the homepage, on the user profile pages, and particularly when Dijkstra's algorithm runs in the *Pathfinder* game. When a user submits a game score, their recent attempt is asynchronously appended to the database, and then fetched and rendered on the scoreboard page post-game. The pagination also automatically redirects to the page the score is highlighted on. Most of the web app is also responsive and operates on mobile, but the *Pathfinder* grid has proven to be a challenge I can not better as of yet. If you have any advice on how I can make my grid of divs responsive, [please shoot me a message!](https://www.linkedin.com/in/jerry-tong/)

### Pathfinder and Dijkstra's Algorithm
The *Pathfinder* game compares the length of a user's input path vs the length of Dijkstra's shortest path. As a general overview, Dijkstra's algorithm starts on a grid where all nodes have a distance value of infinity as all nodes can never possibly be reached until a starting point is declared. When we decide on a start node, the algorithm will set the distance on that node to 0, mark it as visited, and pick the closest unvisited node to visit next. It does this by grabbing the current (starting) node's closest unvisited neighbors (North, South, East, West) and updating each of those neighboring nodes with the current distance value (0) + 1. It then sets the neighboring nodes' `previousNode` property to the current (start) node, marks them as visited, and the process repeats for each node we just visited until it reaches the finish node. Once the finish node is found, we can backtrack through each node's `previousNode` to find the shortest path from the start node.

The grid of *Pathfinder* is set up with a loop to create rows and a nested loop to create columns for each row. Each of the columns in each row creates a `<div>` with a `className` equal to its row and column numbers. Start and finish nodes are assigned a boolean value of `true` for their `isStart` and `isFinish` respectively, and the `className` is altered respectively to render the CSS. Dijkstra's algorithm also updates each `className` based on `isVisited`, and the user input does the same respectively based on the `isUser` property.

User input logic is handled so that a user can only draw a path from the start node until the finish node and can only backtrack in the same order the path was drawn.

## Number Memory
The *Number Memory* game dynamically renders different pages based on the state of the game. The random number is created as a *Number* data type using `(Math.random() * (9 - 1) + 1)` to set the possible random number between 1 - 9. A multiplier is then added to determine how many decimal points are kept, and then the entire value is wrapped in `parseInt()` to remove decimals and display it as a whole integer. On the first iteration, the multiplier is 1 to dictate 1 digit. For each successful user input after, the multiplier is multiplied by 10 to increment the place value of the decimal, thus increasing the number of digits by 1 each time.

Unfortunately, JavaScript's *Number* data type can not accurately contain numbers with over 21 digits, so the game broke when my brother cheated his way beyond 21 digits (the number can't even be copy-pasted, so I think he took photos with his phone). I may have to do some conversion between the *Number* and *BigInt* data types to fix this in the future.