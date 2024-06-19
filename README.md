# Socialify: Fullstack MERN Application

## Overview

Socialify is a comprehensive web-based social media platform that enables users to document and share their lifestyle experiences. Built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js), it offers a robust and interactive user experience.

## Features

- **User Authentication:** Secure sign-up and login functionalities.
- **Profile Management:** Users can create and manage their profiles.
- **Post Creation:** Users can create, edit, and delete posts.
- **Like and Comment:** Interactive features allowing users to like and comment on posts.
- **Feed:** A dynamic feed showing posts from all users.
- **Search:** Functionality to search for users and posts.

## Technologies Used

- **Frontend:** React.js, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS, Bootstrap

## Prerequisites

- **Node.js:** Ensure Node.js is installed.
- **MongoDB:** Ensure MongoDB is installed and running.
- **Git:** Version control system to clone the repository.

## Setup Instructions

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/YashNawale26/MERN-Social-Media.git
   ```

2. **Backend Setup:**
   - Navigate to the backend directory:
     ```sh
     cd MERN-Social-Media/backend
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Create a `.env` file and add your MongoDB URI and JWT secret:
     ```
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
   - Start the backend server:
     ```sh
     npm start
     ```

3. **Frontend Setup:**
   - Navigate to the frontend directory:
     ```sh
     cd ../frontend
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the frontend development server:
     ```sh
     npm start
     ```

4. **Access the Application:**
   - Open your browser and go to `http://localhost:3000`

## Usage

- **Sign Up:** Create a new account.
- **Login:** Access your account using your credentials.
- **Create Posts:** Share your experiences by creating new posts.
- **Interact:** Like and comment on posts by other users.
- **Profile Management:** Update your profile information.

## Screenshots

*Add screenshots of the application to showcase the interface and features.*

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For any questions or suggestions, please open an issue or contact the repository owner.

---

Replace the placeholder values in the `.env` file instructions with your actual values, and add relevant screenshots in the "Screenshots" section to make the README more engaging and informative.
