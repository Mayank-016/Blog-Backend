# Blog-Backend
This is a Node.js/Express application that connects to a MySQL database and handles user authentication and blog post creation. The app uses the bcrypt library to hash passwords, the multer library to handle file uploads, and the express-session library to maintain user sessions.

The app defines a few helper functions to generate a secret key for sessions and to check whether a user is logged in.

The /signup endpoint creates a new user in the database with a hashed password.

The /login endpoint retrieves a user from the database and compares the password hash with the supplied password to authenticate the user. If the user is authenticated, the app sets a session variable to indicate that the user is logged in.

The /blog endpoint creates a new blog post in the database, associating it with the user ID stored in the session. The endpoint checks that the user ID exists in the database before creating the post. The endpoint also accepts file uploads for the post's image and thumbnail.

There are a few error handling blocks in the code to catch any errors that might occur during database operations or other parts of the code. Overall, the app provides a basic framework for user authentication and blog post creation.
