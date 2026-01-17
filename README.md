# Easy-Travel Backend API

A comprehensive **RESTful API** backend for a travel accommodation platform similar to Airbnb, built with Node.js, Express, and MongoDB. This project showcases full CRUD operations, JWT authentication, and scalable API design.

## 🎯 Features

✅ **User Management**

- User registration and login with JWT authentication
- User profile management (create, read, update, delete)
- Watchlist functionality
- Likes/favorites system

✅ **Properties Management**

- Short-term stays (normal stays)
- Long-term stays (rentals)
- Featured destinations
- Complete CRUD operations for all properties

✅ **Booking System**

- Create and manage bookings
- Booking status tracking (pending, confirmed, completed, cancelled)
- Detailed pricing breakdown
- Check-in/check-out date management

✅ **Reviews & Ratings**

- User reviews for properties
- Star ratings (1-5)
- Detailed review metrics (cleanliness, communication, location, accuracy)
- Review management

✅ **Amenities**

- Property amenities management
- Categorized amenities
- Popular amenities tracking

✅ **Security**

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- CORS support

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Environment Variables:** dotenv

## 📁 Project Structure

```
easy-travel-backend/
├── config/
│   └── db.js                    # MongoDB connection
├── middleware/
│   └── auth.js                  # JWT verification middleware
├── models/
│   ├── User.js                  # User schema
│   ├── Rent.js                  # Long-term stay schema
│   ├── RentShort.js             # Short-term stay schema
│   ├── Destination.js           # Destination schema
│   ├── Review.js                # Review schema
│   ├── Booking.js               # Booking schema
│   └── Amenity.js               # Amenity schema
├── routes/
│   ├── auth.js                  # Authentication routes
│   ├── users.js                 # User CRUD routes
│   ├── destinations.js          # Destination routes
│   ├── normalStays.js           # Short-term stay routes
│   ├── longTermStays.js         # Long-term stay routes
│   ├── reviews.js               # Review routes
│   ├── bookings.js              # Booking routes
│   └── amenities.js             # Amenity routes
├── .env                         # Environment variables
├── .env.example                 # Example environment file
├── .gitignore                   # Git ignore file
├── package.json                 # Project dependencies
├── server.js                    # Main entry point
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/easy-travel-backend.git
cd easy-travel-backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```bash
cp .env.example .env
```

4. **Configure environment variables:**

```
PORT=3030
MONGODB_URI=mongodb://localhost:27017/travel-app
JWT_SECRET=your_super_secret_key_change_this_in_production
NODE_ENV=development
```

5. **Start the server:**

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The server will run on `http://localhost:3030`

## 🔑 Authentication

This API uses JWT (JSON Web Tokens) for authentication.

### Register User

```
POST /api/auth/register
Body: {
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Login User

```
POST /api/auth/login
Body: {
  "username": "john_doe",
  "password": "securePassword123"
}
Response: {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com"
}
```

### Using Token in Protected Routes

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token expiration:** 7 days

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)
- `POST /api/users/:id/watchlist` - Add to watchlist (protected)
- `DELETE /api/users/:id/watchlist/:itemId` - Remove from watchlist (protected)
- `POST /api/users/:id/likes` - Like property (protected)
- `DELETE /api/users/:id/likes/:propertyId` - Unlike property (protected)
- `GET /api/users/:id/watchlist` - Get watchlist (protected)
- `GET /api/users/:id/likes` - Get likes (protected)

### Destinations

- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination by ID
- `POST /api/destinations` - Create destination
- `PUT /api/destinations/:id` - Update destination
- `DELETE /api/destinations/:id` - Delete destination
- `POST /api/destinations/:id/like` - Like destination
- `DELETE /api/destinations/:id/unlike/:userId` - Unlike destination

### Short-term Stays

- `GET /api/normal-stays` - Get all short-term stays
- `GET /api/normal-stays/recent` - Get 5 recent stays
- `GET /api/normal-stays/:id` - Get stay by ID
- `POST /api/normal-stays` - Create stay
- `PUT /api/normal-stays/:id` - Update stay
- `DELETE /api/normal-stays/:id` - Delete stay
- `POST /api/normal-stays/:id/like` - Like stay
- `DELETE /api/normal-stays/:id/unlike/:userId` - Unlike stay

### Long-term Stays

- `GET /api/long-term-stays` - Get all long-term stays
- `GET /api/long-term-stays/recent` - Get 5 recent stays
- `GET /api/long-term-stays/:id` - Get stay by ID
- `POST /api/long-term-stays` - Create stay
- `PUT /api/long-term-stays/:id` - Update stay
- `DELETE /api/long-term-stays/:id` - Delete stay
- `POST /api/long-term-stays/:id/like` - Like stay
- `DELETE /api/long-term-stays/:id/unlike/:userId` - Unlike stay

### Reviews

- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/property/:propertyId` - Get reviews for property
- `GET /api/reviews/user/:userId` - Get reviews by user
- `GET /api/reviews/:id` - Get review by ID
- `POST /api/reviews` - Create review (protected)
- `PUT /api/reviews/:id` - Update review (protected)
- `DELETE /api/reviews/:id` - Delete review (protected)
- `POST /api/reviews/:id/helpful` - Mark review as helpful

### Bookings

- `GET /api/bookings` - Get all bookings (protected)
- `GET /api/bookings/guest/:guestId` - Get guest's bookings (protected)
- `GET /api/bookings/host/:hostId` - Get host's bookings (protected)
- `GET /api/bookings/:id` - Get booking by ID (protected)
- `POST /api/bookings` - Create booking (protected)
- `PUT /api/bookings/:id` - Update booking (protected)
- `POST /api/bookings/:id/confirm` - Confirm booking (protected)
- `POST /api/bookings/:id/complete` - Complete booking (protected)
- `POST /api/bookings/:id/cancel` - Cancel booking (protected)
- `DELETE /api/bookings/:id` - Delete booking (protected)

### Amenities

- `GET /api/amenities` - Get all amenities
- `GET /api/amenities/category/:category` - Get amenities by category
- `GET /api/amenities/popular/true` - Get popular amenities
- `GET /api/amenities/:id` - Get amenity by ID
- `POST /api/amenities` - Create amenity
- `PUT /api/amenities/:id` - Update amenity
- `DELETE /api/amenities/:id` - Delete amenity
- `POST /api/amenities/:id/popular` - Mark as popular
- `POST /api/amenities/:id/unpopular` - Unmark as popular

### Utility

- `GET /` - Welcome message
- `GET /health` - Health check

## 🧪 Testing with Postman

1. **Import the API collection** (create from endpoints above)
2. **Register a user:**
    - POST `/api/auth/register`
    - Username: `john_doe`
    - Email: `john@example.com`
    - Password: `Password123@`

3. **Login:**
    - POST `/api/auth/login`
    - Save the returned token

4. **Use token in Authorization header:**
    - Type: Bearer Token
    - Token: Your JWT token

See `POSTMAN_TEST_DATA.md` for sample test data.

## 📦 Database Models

### User

- Username, email, password
- Profile information (firstName, lastName, phone, bio, profilePicture)
- Address details
- Host features (isHost, hostRating, isVerified, isSuperhost)
- Watchlist and likes
- Bookings and reviews

### Rent (Long-term Stay)

- Host ID, title, description
- Location details
- Property specifications (bedrooms, bathrooms, maxGuests, squareFootage)
- Property type (apartment, house, villa, condo, room)
- Check-in/check-out times
- Amenities and house rules
- Pricing, rating, likes
- Availability calendar
- Bookings and reviews

### RentShort (Short-term Stay)

- Same structure as Rent model
- Optimized for shorter bookings

### Review

- Property and user references
- Rating (1-5)
- Detailed metrics (cleanliness, communication, location, accuracy)
- Comments and photos
- Helpful votes

### Booking

- Property, guest, and host references
- Check-in/check-out dates
- Number of guests and nights
- Status tracking (pending, confirmed, completed, cancelled)
- Detailed pricing breakdown
- Cancellation and refund information

### Amenity

- Name and category
- Icon and description
- Popular flag

### Destination

- Name, country, description
- Photos and cover image
- Price, rating, discount
- Guide and overview
- Likes and comments

## 🔐 Security Features

✅ **Password Security**

- Passwords hashed with bcrypt (10 salt rounds)
- Never stored in plain text

✅ **JWT Authentication**

- Secure token-based authentication
- Token expiration (7 days)
- Token verification on protected routes

✅ **CORS Support**

- Prevents unauthorized cross-origin requests
- Configurable origins

✅ **Input Validation**

- Required field validation
- Email format validation
- Rating range validation

## 🚀 Deployment

This project is ready to deploy on platforms like:

- **Render**
- **Heroku**
- **Railway**
- **AWS**
- **DigitalOcean**

### Deploy on Render

1. Push code to GitHub
2. Connect GitHub repository to Render
3. Set environment variables in Render dashboard
4. Deploy

**Important:**

- Use a strong `JWT_SECRET` in production
- Set `NODE_ENV=production`
- Use MongoDB Atlas for cloud database

## 📖 Documentation

- [JWT Authentication Guide](./JWT_GUIDE.md)
- [JWT Setup Instructions](./JWT_SETUP_GUIDE.md)
- [Postman Test Data](./POSTMAN_TEST_DATA.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**

- GitHub: [@BayryamB](https://github.com/BayryamB)
- Email: bayryambashchoban@gmail.com

## 🎓 Learning Outcomes

This project demonstrates:

- RESTful API design principles
- Express.js framework expertise
- MongoDB and Mongoose ODM usage
- JWT authentication implementation
- Middleware usage and creation
- Error handling and validation
- Folder structure and project organization
- CORS and security best practices

## ⭐ Future Enhancements

- [ ] Implement refresh tokens
- [ ] Add role-based access control (RBAC)
- [ ] Email verification for new accounts
- [ ] Password reset functionality
- [ ] Rate limiting
- [ ] Advanced search and filtering
- [ ] Image upload functionality
- [ ] Real-time notifications
- [ ] Payment processing (Stripe integration)
- [ ] API documentation with Swagger/OpenAPI

## 📞 Support

For issues and questions, please open an [issue](https://github.com/yourusername/easy-travel-backend/issues) on GitHub.

---

**Made with ❤️ for travelers and hosts everywhere**
