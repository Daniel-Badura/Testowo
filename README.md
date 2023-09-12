# Testowo - MERN Stack Multiple Choice Test Application

## Overview

Testowo is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack that allows users to create and enroll in multiple choice tests. It is a user-friendly platform designed to facilitate the creation and participation in various tests, making it ideal for educational purposes, training, or simply for fun.

## Features

- **User Registration and Authentication**: Users can create accounts and log in securely to access the application's features.

- **Test Creation**: Registered users can create multiple choice tests by providing questions, answer options, and marking the correct answer.

- **Test Enrollment**: Users can browse and enroll in tests created by others, allowing them to test their knowledge in various subjects.

- **Real-time Feedback**: After completing a test, users receive instant feedback, including their score and correct answers.

- **User Profiles**: Users can view their test history, including tests they've created and tests they've taken.

- **Search and Filter**: A search and filter system enables users to find specific tests easily.

- **Responsive Design**: Testowo is designed to work seamlessly on both desktop and mobile devices.

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/testowo.git
```

2. Install server dependencies:

```
npm install
```

3. Install client dependencies:

```
cd frontend
npm install
```

4. Create a .env file in the server directory with the following content and replace the values with your own:

MONGODB_URI=your_mongodb_uri
SECRET_KEY=your_secret_key

5. Start server and client in dev mode:

```
npm run dev
```

6. Open your web browser and access the application at http://localhost:3000.

## Usage

1. Register for an account or log in if you already have one.

2. Once logged in, you can create a new test by clicking the "Create Test" button.

3. Fill in the details of your test, including questions, answer options, and the correct answer.

4. After creating a test, you can browse and enroll in tests created by other users from the homepage.

5. To take a test, click on the test card, and it will guide you through the questions.

6. After completing a test, you will receive instant feedback on your performance.

7. You can view your test history and scores on your profile page.

## Contributing

We welcome contributions to Testowo! If you'd like to add new features, fix bugs, or improve the application in any way, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

```
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them:

```
git commit -m "Add your feature or fix description"
```

4. Push your changes to your fork:

```
git push origin feature/your-feature-name
```

5. Create a pull request on the original repository, explaining your changes and their benefits.

6. Your pull request will be reviewed, and once approved, it will be merged into the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Thank you for using Testowo! We hope you find it useful and enjoy using it as much as we enjoyed building it. Happy testing!
