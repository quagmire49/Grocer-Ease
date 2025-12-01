# GrocerEase - Simplifying Your Shopping Experience

A modern, full-stack mini e-commerce application for browsing, searching, and purchasing grocery items. Built with React, Vite, Tailwind CSS, and JSON Server.

## 🚀 Features

- **User Authentication**: Demo login system with user management
- **Product Browsing**: Browse through a wide selection of grocery products
- **Search & Filter**: Search products by name/description and filter by category
- **Shopping Cart**: Add, update, and remove items from cart with quantity management
- **Checkout Process**: Complete checkout with shipping and payment information
- **Order Management**: Save orders and cart items for future reference
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Full CRUD Operations**: Create, Read, Update, and Delete operations for all data

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Backend**: JSON Server
- **State Management**: React Context API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/en/download/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/downloads)

## 🏗️ Project Structure

```
grocerease/
├── public/                 # Public assets
├── src/
│   ├── components/         # React components
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── ProductCard.jsx
│   │   └── Products.jsx
│   ├── context/            # Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── App.js              # Main App component
│   ├── App.css             # App styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── scripts/
│   └── fetchGroceryData.js # Script to fetch and populate data
├── db.json                 # JSON Server database
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## 📦 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Fetch Grocery Data

This will fetch product data from an API and populate the `db.json` file:

```bash
npm run fetch-data
```

**Note**: If the API fails, the script will automatically create sample grocery data.

### Step 3: Start JSON Server

Open a **new terminal window** and run:

```bash
npm run server
```

This will start JSON Server on `http://localhost:3001`

### Step 4: Start the React Development Server

In the **original terminal**, run:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🔑 Demo Login Credentials

- **Username**: `demo`
- **Password**: `demo123`

## 📝 Available Scripts

- `npm run dev` - Start the React development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm run server` - Start JSON Server (runs on port 3001)
- `npm run fetch-data` - Fetch grocery data from API and populate db.json

## 🎯 Key Features Explained

### 1. Authentication (Demo Login)
- Simple demo login system
- User data stored in JSON Server
- Session persistence using localStorage

### 2. Product Management
- **Read**: Browse all products with images, prices, and descriptions
- **Search**: Real-time search functionality
- **Filter**: Filter products by category
- Products fetched from JSON Server

### 3. Shopping Cart
- **Create**: Add products to cart
- **Read**: View cart items with quantities
- **Update**: Update item quantities
- **Delete**: Remove items from cart
- Cart saved to JSON Server and localStorage

### 4. Order Management
- **Create**: Place orders through checkout
- **Read**: View order details after checkout
- Orders stored in JSON Server

## 🔄 CRUD Operations

### Products
- ✅ **Create**: Products added via API fetch script
- ✅ **Read**: Browse and search products
- ✅ **Update**: (Admin functionality can be added)
- ✅ **Delete**: (Admin functionality can be added)

### Cart
- ✅ **Create**: Add items to cart
- ✅ **Read**: View cart items
- ✅ **Update**: Update item quantities
- ✅ **Delete**: Remove items from cart

### Orders
- ✅ **Create**: Place new orders
- ✅ **Read**: View order details
- ✅ **Update**: (Can be extended)
- ✅ **Delete**: (Can be extended)

### Users
- ✅ **Create**: Demo user in db.json
- ✅ **Read**: Login authentication
- ✅ **Update**: (Can be extended)
- ✅ **Delete**: (Can be extended)

## 🎨 UI/UX Features

- Modern, clean design with Tailwind CSS
- Responsive layout for all screen sizes
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states and error handling
- Intuitive navigation
- Accessible form inputs and buttons

## 📡 API Endpoints (JSON Server)

The application uses the following JSON Server endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get a specific product
- `GET /users` - Get all users
- `GET /carts?userId=:id` - Get user's cart
- `POST /carts` - Create a new cart
- `PUT /carts/:id` - Update cart
- `POST /orders` - Create a new order
- `GET /orders` - Get all orders

## 🐛 Troubleshooting

### JSON Server not running
- Make sure JSON Server is running on port 3001
- Run `npm run server` in a separate terminal

### Products not loading
- Ensure JSON Server is running
- Run `npm run fetch-data` to populate products
- Check browser console for errors

### Port already in use
- Change the port in `vite.config.js` (for React app)
- Change the port in `package.json` scripts (for JSON Server)

## 📚 Additional Notes

- The application uses localStorage as a backup for cart data
- Cart items are automatically saved to JSON Server when logged in
- All data persists in `db.json` file
- The fetch script attempts to get data from an API, but falls back to sample data if the API fails

## 👥 Team Presentation Tips

1. **Start JSON Server first**: Always run `npm run server` before starting the app
2. **Demo Flow**: 
   - Show home page
   - Browse products
   - Search and filter
   - Login with demo credentials
   - Add items to cart
   - Update quantities
   - Complete checkout
   - Show order success
3. **Highlight Features**:
   - Full CRUD operations
   - JSON Server integration
   - Responsive design
   - State management with Context API
   - API data fetching

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development

Built with ❤️ using React and modern web technologies.

---

**Happy Shopping with GrocerEase! 🛒**

