# API Documentation

## Variables

- **API URL**: `http://localhost:4001`

## User Routes

### 1. Create a New User

- **Description**: This endpoint creates a new user and returns a token.
- **Method**: `POST`
- **URL**: `{{apiurl}}/user/signup`
- **Headers**:
  - Content-Type: `application/json`
- **Body**:
  ```json
  {
    "username": "otário",
    "email": "otr@gmail.om",
    "password": "admin123"
  }
  ```

### 2. Login user

- **Description**: This endpoint make a login in user account .
- **Method**: `POST`
- **URL**: `{{apiurl}}/user/login`
- **Headers**:
  - Content-Type: `application/json`
- **Body**:
  ```json
  {
    "email": "otr@gmail.om",
    "password": "admin123"
  }
  ```

### 3. Get User Information

- **Description**: This endpoint returns all the user's information.
- **Method**: `GET`
- **URL**: `{{apiurl}}/user/informations`
- **Headers**:
  - Content-Type: `application/json`
  - Authorization: `Bearer <token>`
- **Example Authorization Token**:

### 4. Add Favorite Movie

- **Description**: This endpoint allows the user to favorite a movie.
- **Method**: `POST`
- **URL**: `{{apiurl}}/favorite/add`
- **Headers**:
  - Content-Type: `application/json`
  - Authorization: `Bearer <token>`
- **Body**:
  ```json
  {
    "movieId": 220
  }
  ```
- **response**:
  ```json
  {
    "message": "movie favorited",
    "favorite": 220
  }
  ```
