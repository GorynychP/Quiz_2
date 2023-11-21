# Quiz

An application for creating tests and taking them. Users can take both their own tests and tests created by others.
Приложения для создания тестов и их прохождения. Можно проходить как свои тесты, так и чужие.
## Technologies

### Frontend
- React
- TypeScript
- Redux Toolkit
- React-Router 6
- Tailwind CSS
- Bootstrap
- Axios

### Backend
- Node.js
- Express.js
- MongoDB

## Functionality

- **Authentication and Registration:**
  - Log in using email and password.
  - Register with name, surname, email, and password.

- **User Profile:**
  - View and edit personal information.
  - Save the history of test completions.

- **Unregistered Users:**
  - Ability to take tests created by others.

- **Registered Users:**
  - Create, edit, and delete their own tests.
  - Take both their own and others' tests.
  - Edit the user profile.

## Pages

1. **Home Page:**
   - Login / Registration (if not logged in)
   - My Tests (if logged in)
   - My Account (if logged in)
   - Logout (if logged in)

2. **Login:**
   - Form with fields: Email, Password, "Login" button.

3. **Registration:**
   - Form with fields: Name, Surname, Email, Password, "Register" button.

4. **Home Page:**
   - List of all tests with brief information.
   - "Open" button for each test.

5. **Test Page:**
   - Information about the test and its completion history.
   - "Start Test" button.

6. **Test Completion Page:**
   - Questions with answer options.
   - Buttons "Previous Question", "Next Question", and "Finish" (replaced with "Finish" on the last question).

7. **My Tests:**
   - "Create Test" button.
   - List of created tests with the ability to edit and delete.

8. **Test Constructor:**
   - Editing the test title, questions, and answers.
   - "Save" and "Back" buttons.

9. **My Account:**
   - View and edit personal information.


