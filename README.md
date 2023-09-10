# e-StudyStore

e-StudyStore is a specialized web application meticulously crafted to cater specifically to the unique needs of RGUKT Basar campus students. It has been designed with the primary goal of streamlining and enhancing the process of buying and selling books within the close-knit campus community.

-## Purpose

At RGUKT Basar, academic resources such as textbooks play a pivotal role in a student's education journey. However, acquiring the right textbooks can often be a cumbersome and expensive task. Recognizing this challenge, e-StudyStore emerges as a valuable solution, offering a user-friendly platform dedicated to facilitating book transactions among campus students.

## Features

- **User Authentication**: Users can register and log in to the application securely.

- **User Registration**: New users can create an account with their email and password.

- **Buy Books**: Users can browse a catalog of books, select items, and make purchases securely.

- **Sell Books**: Users can list their own books for sale, including book details and pricing information.

- **Update Profile**: Users can update their profile information, including changing their password and profile picture.

- **Logout**: Users can log out of their accounts securely.

- **View Orders**: Users can view their order history, including details of purchased books.
  
## Connecting Buyer and Seller via Email

- **Contacting Seller and Buyer**: When a user places an order to buy a book, the application will automatically send an email to the seller who listed the book. The email will include the contact details of the buyer, such as their email and contact information.

This feature ensures that buyers and sellers can easily connect and arrange the details of the book transaction. It facilitates communication between parties interested in a book.


## Running the Application

### Running the Front End

To run the front end of the application, follow these steps:

1. Navigate to the `front` directory:

    cd front

2. Install the required dependencies:

    npm install

3. Start the development server:

    npm start

4. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the front end.

### Running the Back End

To run the back end of the application, follow these steps:

1. Navigate to the `backend` directory:

    cd backend

2. Install the required dependencies:

    npm install

3. Start the development server with the following command:

    npm run dev

The back end will run on [http://localhost:9002](http://localhost:9002)

### Connecting to the MongoDB Database

By default, the back end is configured to connect to a local MongoDB database. If you need to specify a different MongoDB connection string or credentials, you can do so by editing the configuration in the `backend/index.js` file.

Feel free to modify and extend this project to suit your needs. Happy coding!

