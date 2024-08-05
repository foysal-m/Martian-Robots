### How to Run

- Clone the Repository

  `git clone <https://github.com/foysal-m/red-badger-martian-robots.git>`

- Install Dependencies: `npm install`

- Build the Project: `npm run build`

- Start the Development Server: `npm start`

- Run Unit Tests: `npm test`

### How to run on docker desktop:

- Install docker desktop locally and login
- Create an image from the dockerfile: run `docker build -t <username>/martian-robot:latest .` This command will build a Docker image from the Dockerfile and tag it as latest
- Use the following command to start a container from the built image: `docker run -p 3000:3000 <username>/martian-robot`
- This command will start the container and map port 3000 on your local machine to port 3000 in the container
- Once the container is running, open your web browser and go to http://localhost:3000 to view the application.
  This approach allows you to run the app without needing to install npm or run it locally.

### How to see test coverage:

- Run npm test coverage
- After running the command, a coverage directory will be generated in the root folder of the project
- Inside the coverage directory, you’ll find an `index.html` file. Open this file in a web browser to view the detailed test coverage report.

### Technologies used:

- `Docker`: Utilized for containerizing the application to ensure consistent and portable deployment across different environments. Docker simplifies the process of managing dependencies and configurations, enabling seamless deployment and scaling of the app
- `TypeScript`: Provides strict type checking to enhance code quality and maintainability
- `React`: Facilitates the creation of the board and streamlines app development with its component-based architecture
- `Jest & React Testing Library`: Used for unit testing to ensure component functionality and reliability
- `SCSS`: Utilized for styling the board, offering advanced features and a more maintainable CSS structure
- `i18next`: For localizing content

### Next steps

#### Implement End-to-End (E2E) Tests:

- Set up E2E tests using Cypress to visually verify the robot's behavior in the browser, providing a more intuitive testing experience compared to manual testing or unit tests.

#### Enhance the User Interface:

- Implement design enhancements to improve the overall visual appeal.

- Ensure that the "Current Position" indicator accurately tracks and follows the robot's location, positioning it just outside the board for better visibility.

- Adapt the board layout to ensure responsiveness across various devices, providing a consistent user experience on both desktop and mobile platforms.

### Problem: Martian Robots

The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth. You are to write a program that determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by y-coordinate) and an orientation (N, S, E, W for north, south, east, and west). A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the instructions:

Left : the robot turns left 90 degrees and remains on the current grid point.
Right : the robot turns right 90 degrees and remains on the current grid point.
Forward : the robot moves forward one grid point in the direction of the current orientation and maintains the same orientation.
The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1). There is also a possibility that additional command types may be required in the future and provision should be made for this.

Since the grid is rectangular and bounded (…yes Mars is a strange planet), a robot that moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that prohibits future robots from dropping off the world at the same grid point. The scent is left at the last grid position the robot occupied before disappearing over the edge. An instruction to move “off” the world from a grid point from which a robot has been previously lost is simply ignored by the current robot.

### The Input

The first line of input is the upper-right coordinates of the rectangular world, the lower-left coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines per robot). A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a string of the letters “L”, “R”, and “F” on one line.

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the next robot begins execution.

The maximum value for any coordinate is 50.

All instruction strings will be less than 100 characters in length.

### The Output

For each robot position/instruction in the input, the output should indicate the final grid position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST” should be printed after the position and orientation.

## Sample Input

5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL

## Sample Output

1 1 E
3 3 N LOST
2 3 S
