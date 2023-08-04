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

### User Endpoints

- **POST /api/users**: Create a new user account.
- **GET /api/users**: Get a list of all users.
- **POST /api/users/login**: Authenticate a user and generate a JWT token.
- **PUT /api/users/password**: Update a user's password.

### Blog Endpoints

- **POST /api/blogs/create**: Create a new blog post.
- **PUT /api/blogs/update**: Update an existing blog post.
- **DELETE /api/blogs/delete**: Delete a blog post.
- **GET /api/blogs/get**: Get all blog posts for a specific user.
- **GET /api/blogs/getall**: Get all active blog posts.

## Validation and Security

The API uses Joi for request data validation and bcrypt for password encryption. It also employs JWT for user authentication to secure sensitive endpoints.

## Database Connection

The database connection details are stored in the `db.js` file. Make sure to set the appropriate values in the `.env` file to establish a successful connection.

## Dependencies

- bcrypt: "^5.1.0"
- lodash: "^4.17.21"
- mysql2: "^3.5.2"
- jwt: "^8.5.1"

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

Feel free to use this API as a starting point for your blog backend or any other similar projects. Happy coding!
