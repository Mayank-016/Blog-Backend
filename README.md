# Blog Backend API

This repository contains the code for a Blog Backend API implemented using Node.js and MySQL. The API provides endpoints to handle user authentication and blog management.

## Prerequisites

Before running the API, make sure you have the following installed:

- Node.js
- MySQL

## Getting Started

1. Clone the repository to your local machine:

```
git clone https://github.com/your-username/blog-backend.git
```

2. Install the dependencies:

```
cd blog-backend
npm install
```

3. Set up the database by creating a `.env` file in the root directory with the following contents:

```
host=<your_mysql_host>
user=<your_mysql_user>
password=<your_mysql_password>
database=<your_mysql_database>
sql_port=<your_mysql_port>
JWT_Secret_Key=<your_secret_key_for_jwt>
```

4. Start the server:

```
npm start
```

The server will be running at http://localhost:3000 by default.

## Endpoints


### **Register a User**
- **Endpoint**: `/api/users`
- **Method**: POST
- **Description**: Create a new user account.
- **Parameters**:
  - `name` (string, required): User's name.
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.
- **Response**:
  - 200: User account created successfully. The response includes the newly created user ID and a JWT for authentication.

### **Login**
- **Endpoint**: `/api/users/login`
- **Method**: POST
- **Description**: Authenticate the user and generate a JWT for future requests.
- **Parameters**:
  - `email` (string, required): User's registered email.
  - `password` (string, required): User's password.
- **Response**:
  - 200: Login successful. The response includes a JWT for authentication.

### **Update Password**
- **Endpoint**: `/api/users/password`
- **Method**: PUT
- **Description**: Update the user's password.
- **Parameters**:
  - `email` (string, required): User's registered email.
  - `oldPassword` (string, required): User's current password.
  - `newPassword` (string, required): User's new password.
- **Response**:
  - 200: Password updated successfully.

## Blogs

### **Create Blog**
- **Endpoint**: `/api/blogs/create`
- **Method**: POST
- **Description**: Create a new blog post.
- **Authentication**: Required (JWT in 'x-auth-token' header).
- **Parameters**:
  - `title` (string, required): Blog title.
  - `content` (string, required): Blog content.
  - `is_active` (boolean, required): Blog status (active or inactive).
- **Response**:
  - 200: Blog created successfully. The response includes the newly created blog ID.

### **Update Blog**
- **Endpoint**: `/api/blogs/update`
- **Method**: PUT
- **Description**: Update an existing blog post.
- **Authentication**: Required (JWT in 'x-auth-token' header).
- **Parameters**:
  - `blog_id` (integer, header, required): ID of the blog to update.
  - `title` (string, required): Updated blog title.
  - `content` (string, required): Updated blog content.
  - `is_active` (boolean, required): Updated blog status (active or inactive).
- **Response**:
  - 200: Blog updated successfully.

### **Delete Blog**
- **Endpoint**: `/api/blogs/delete`
- **Method**: DELETE
- **Description**: Delete an existing blog post.
- **Authentication**: Required (JWT in 'x-auth-token' header).
- **Parameters**:
  - `blog_id` (integer, header, required): ID of the blog to delete.
- **Response**:
  - 200: Blog deleted successfully.

### **Get User's Blogs**
- **Endpoint**: `/api/blogs/get`
- **Method**: GET
- **Description**: Get all blogs created by the authenticated user.
- **Authentication**: Required (JWT in 'x-auth-token' header).
- **Response**:
  - 200: List of blogs created by the user.

### **Get All Active Blogs**
- **Endpoint**: `/api/blogs/getall`
- **Method**: GET
- **Description**: Get all active blogs.
- **Authentication**: Required (JWT in 'x-auth-token' header).
- **Response**:
  - 200: List of all active blogs.

## Error Responses

- 400: Bad Request. Invalid input data or missing parameters.
- 401: Unauthorized. Authentication token not provided or invalid.
- 404: Not Found. The requested resource does not exist.
- 500: Internal Server Error. An unexpected error occurred on the server.

## Dependencies

- bcrypt: ^5.1.0
- lodash: ^4.17.21
- mysql2: ^3.5.2
- winston: ^3.10.0

## License

This project is licensed under the ISC License.

Feel free to use this API as a starting point for your blog backend or any other similar projects. Happy coding!
