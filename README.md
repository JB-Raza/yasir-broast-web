Yasir Broast - Restaurant Website
Project README.md
markdown
# Yasir Broast - Official Restaurant Website

A modern, responsive restaurant website for Yasir Broast, one of Lahore's premier dining destinations with 20+ branches across the city. This project is built with the MERN stack and focuses on showcasing the menu, branches, and brand identity while solving operational pain points identified through customer feedback.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Components](#pages--components)
- [Design System](#design-system)
- [Key Features](#key-features)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Maintenance Guide](#maintenance-guide)
- [Future Enhancements](#future-enhancements)

## 🎯 Project Overview

Yasir Broast is a well-established restaurant chain in Lahore with 20+ branches, known for its broasted chicken, karahi, and traditional Pakistani cuisine. Customer reviews indicate several pain points:

- **Wrong orders** - Customers receiving different items than ordered [citation:1]
- **Missing items** - Naan, sauces, or sides not included in delivery [citation:1][citation:7]
- **Long wait times** - Poor order management during peak hours [citation:1]
- **Inconsistent quality** - Food temperature and taste vary by branch [citation:4]
- **No centralized web presence** - Previous domain (yasirbroast.com) is no longer active [citation:1]

This website addresses these issues by providing:
- Clear, accurate menu display with prices
- Online ordering with order confirmation
- Branch locator with contact information
- Kitchen display system integration (future phase)
- Customer feedback collection

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks and functional components
- **React Router DOM** - For navigation and routing
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Swiper JS** - Touch slider for banners and image galleries
- **React Icons** - Icon library (especially FaGoogle, FaFacebook for social links)
- **React Helmet Async** - SEO management
- **React Hot Toast** - Toast notifications for user feedback

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database for menu items, orders, branches
- **Mongoose** - ODM for MongoDB schema management
- **JWT** - Authentication for admin panel
- **bcryptjs** - Password encryption
- **Multer** - File upload for menu images
- **Express Validator** - Input validation

### Additional Libraries
- **date-fns** - Date formatting
- **react-google-maps** - Branch location maps
- **react-share** - Social media sharing buttons
- **react-helmet-async** - SEO management
yasir-broast-website/
│
├── 📂 client/                               # React frontend
│   ├── 📂 public/
│   │   ├── 📄 index.html
│   │   ├── 📄 manifest.json
│   │   └── 📄 robots.txt
│   │
│   ├── 📂 src/
│   │   ├── 📂 assets/
│   │   │   ├── 📂 images/                   # Static images
│   │   │   ├── 📂 fonts/                     # Custom fonts
│   │   │   └── 📂 styles/                     # Global CSS
│   │   │
│   │   ├── 📂 components/
│   │   │   ├── 📂 common/
│   │   │   │   ├── ⚛️ Navbar.jsx
│   │   │   │   ├── ⚛️ Footer.jsx
│   │   │   │   ├── ⚛️ Loader.jsx
│   │   │   │   ├── ⚛️ ErrorBoundary.jsx
│   │   │   │   └── ⚛️ ScrollToTop.jsx
│   │   │   │
│   │   │   ├── 📂 home/
│   │   │   │   ├── ⚛️ HeroBanner.jsx
│   │   │   │   ├── ⚛️ FeaturedItems.jsx
│   │   │   │   ├── ⚛️ Branches.jsx
│   │   │   │   ├── ⚛️ Testimonials.jsx
│   │   │   │   └── ⚛️ CTASection.jsx
│   │   │   │
│   │   │   ├── 📂 menu/
│   │   │   │   ├── ⚛️ MenuCategories.jsx
│   │   │   │   ├── ⚛️ MenuItemCard.jsx
│   │   │   │   ├── ⚛️ CategoryFilter.jsx
│   │   │   │   └── ⚛️ PriceDisplay.jsx
│   │   │   │
│   │   │   ├── 📂 order/
│   │   │   │   ├── ⚛️ OrderForm.jsx
│   │   │   │   ├── ⚛️ Cart.jsx
│   │   │   │   ├── ⚛️ Checkout.jsx
│   │   │   │   └── ⚛️ OrderConfirmation.jsx
│   │   │   │
│   │   │   ├── 📂 branches/
│   │   │   │   ├── ⚛️ BranchLocator.jsx
│   │   │   │   ├── ⚛️ BranchCard.jsx
│   │   │   │   ├── ⚛️ BranchMap.jsx
│   │   │   │   └── ⚛️ BranchHours.jsx
│   │   │   │
│   │   │   ├── 📂 admin/
│   │   │   │   ├── ⚛️ AdminDashboard.jsx
│   │   │   │   ├── ⚛️ MenuManager.jsx
│   │   │   │   ├── ⚛️ OrderManager.jsx
│   │   │   │   └── ⚛️ BranchManager.jsx
│   │   │   │
│   │   │   └── 📂 shared/
│   │   │       ├── ⚛️ SEO.jsx
│   │   │       ├── ⚛️ SocialShare.jsx
│   │   │       └── ⚛️ WhatsAppButton.jsx
│   │   │
│   │   ├── 📂 pages/
│   │   │   ├── ⚛️ HomePage.jsx
│   │   │   ├── ⚛️ MenuPage.jsx
│   │   │   ├── ⚛️ BranchesPage.jsx
│   │   │   ├── ⚛️ AboutPage.jsx
│   │   │   ├── ⚛️ ContactPage.jsx
│   │   │   ├── ⚛️ OrderPage.jsx
│   │   │   ├── ⚛️ CartPage.jsx
│   │   │   ├── ⚛️ CheckoutPage.jsx
│   │   │   ├── ⚛️ OrderSuccessPage.jsx
│   │   │   ├── ⚛️ PrivacyPolicyPage.jsx
│   │   │   ├── ⚛️ TermsPage.jsx
│   │   │   ├── ⚛️ FAQPage.jsx
│   │   │   └── ⚛️ AdminPage.jsx
│   │   │
│   │   ├── 📂 hooks/
│   │   │   ├── 🪝 useCart.js
│   │   │   ├── 🪝 useMenu.js
│   │   │   ├── 🪝 useBranches.js
│   │   │   ├── 🪝 useOrders.js
│   │   │   └── 🪝 useAuth.js
│   │   │
│   │   ├── 📂 context/
│   │   │   ├── 🔄 CartContext.jsx
│   │   │   ├── 🔄 AuthContext.jsx
│   │   │   └── 🔄 ThemeContext.jsx
│   │   │
│   │   ├── 📂 services/
│   │   │   ├── 📡 api.js                    # API service layer
│   │   │   ├── 📡 menuService.js
│   │   │   ├── 📡 orderService.js
│   │   │   └── 📡 branchService.js
│   │   │
│   │   ├── 📂 utils/
│   │   │   ├── 🔧 constants.js
│   │   │   ├── 🔧 helpers.js
│   │   │   ├── 🔧 validators.js
│   │   │   └── 🔧 formatters.js
│   │   │
│   │   ├── 📂 routes/
│   │   │   └── 🧭 AppRoutes.jsx
│   │   │
│   │   ├── ⚛️ App.jsx
│   │   ├── ⚛️ index.js
│   │   └── ⚙️ config.js
│   │
│   ├── 📦 package.json
│   ├── 🎨 tailwind.config.js
│   └── 🔐 .env
│
├── 📂 server/                               # Node.js backend
│   ├── 📂 controllers/
│   │   ├── 🎮 menuController.js
│   │   ├── 🎮 orderController.js
│   │   ├── 🎮 branchController.js
│   │   ├── 🎮 userController.js
│   │   └── 🎮 adminController.js
│   │
│   ├── 📂 models/
│   │   ├── 📦 MenuItem.js
│   │   ├── 📦 Order.js
│   │   ├── 📦 Branch.js
│   │   ├── 📦 User.js
│   │   └── 📦 Category.js
│   │
│   ├── 📂 routes/
│   │   ├── 🛣️ menuRoutes.js
│   │   ├── 🛣️ orderRoutes.js
│   │   ├── 🛣️ branchRoutes.js
│   │   ├── 🛣️ userRoutes.js
│   │   └── 🛣️ adminRoutes.js
│   │
│   ├── 📂 middleware/
│   │   ├── 🛡️ auth.js
│   │   ├── 📤 upload.js
│   │   ├── ✅ validate.js
│   │   └── ❌ errorHandler.js
│   │
│   ├── 📂 config/
│   │   ├── 🗄️ db.js
│   │   └── ☁️ cloudinary.js
│   │
│   ├── 📂 utils/
│   │   ├── 🔑 generateToken.js
│   │   └── 📧 sendEmail.js
│   │
│   ├── 🚀 server.js
│   ├── 📦 package.json
│   └── 🔐 .env
│
├── 📄 .gitignore
└── 📖 README.md

text

## 📄 Pages & Components

### Page 1: Home Page (`/`)

**Purpose:** First impression, showcase brand identity, highlight popular items, drive engagement.

**Components:**
- **Navbar** - Logo (Yasir Broast text/icon), navigation links, cart icon, mobile menu
- **Hero Banner (Swiper Slider)** - 3-4 slides with:
  - High-quality food photography
  - Tagline: "Lahore's Finest Broast Since 1995" (or similar)
  - CTA buttons: "Order Now" | "View Menu"
  - Ramadan/Iftar special offers (if applicable) [citation:1]
- **Featured Items** - Grid of 4-6 best-selling items with images, names, prices
- **Our Branches Preview** - Cards showing 3 main branches with addresses and "View All" link
- **Testimonials Section** - Carousel of customer reviews (from Google reviews) [citation:4]
- **Special Deals** - Current promotions (family platter for 3000 PKR, etc.) [citation:10]
- **CTA Section** - "Hungry? Order Online" with direct link to order page
- **Footer** - Contact info, social links (Facebook/Instagram), quick links, copyright

### Page 2: Menu Page (`/menu`)

**Purpose:** Display all food items with categories, prices, and descriptions.

**Components:**
- **Page Header** - Title + brief description
- **Category Tabs** - Filter by category:
  - Broast (Chicken Broast, Full/Half)
  - Karahi (Chicken, Mutton)
  - BBQ (Seekh Kabab, Malai Boti, Reshmi Kabab)
  - Handi (Chicken Changezi, etc.)
  - Rice (Biryani, Pulao)
  - Fast Food (Burgers, Sandwiches)
  - Soups
  - Drinks & Desserts
  - Family Platters [citation:4][citation:10]
- **Menu Items Grid** - Each card includes:
  - Food image
  - Item name
  - Description (brief)
  - Price (PKR)
  - "Add to Cart" button
  - Popular/Spicy indicators
- **Search Bar** - Search by item name
- **Cart Summary** - Floating cart showing item count (optional)

### Page 3: Branches Page (`/branches`)

**Purpose:** Help customers find nearest location with contact details and hours.

**Components:**
- **Page Header** - "Our Locations"
- **Branch Cards** - For each branch (at least 5):
  - Branch name (e.g., "Johar Town", "Thokar Niaz Baig", "Allama Iqbal Town")
  - Full address
  - Phone numbers (multiple if available) [citation:1]
  - Opening hours (10:00 AM - 2:00 AM daily) [citation:4]
  - "Get Directions" link (Google Maps)
  - "Call Now" button
- **Map Integration** - Google Maps showing all branch locations
- **Branch Highlights** - Special notes (e.g., "Rooftop dining available", "Family section")

### Page 4: About Us (`/about`)

**Purpose:** Build trust and tell the brand story.

**Components:**
- **Hero Section** - Restaurant interior photo
- **Our Story** - History, mission, values
- **Quality Commitment** - Fresh ingredients, hygiene standards
- **Team Section** - Management/staff photos (optional)
- **Achievements** - Awards, years in business, customer count
- **Photo Gallery** - Swiper gallery of restaurant ambiance and food

### Page 5: Contact Us (`/contact`)

**Purpose:** Allow customers to reach out for inquiries, feedback, or complaints.

**Components:**
- **Contact Form** - Name, email, phone, message
- **Branch Contact List** - Quick reference of all branch phones
- **Social Media Links** - Facebook, Instagram
- **WhatsApp Button** - Click to chat (using WhatsApp Business API)
- **FAQ Link** - Redirect to FAQ page
- **Map** - Headquarters location

### Page 6: Order Online (`/order`)

**Purpose:** Enable customers to place orders for pickup or delivery.

**Components:**
- **Menu Browser** (similar to Menu page but with ordering focus)
- **Cart Sidebar** - Shows added items, quantities, subtotal
- **Branch Selection** - Choose pickup branch or enter delivery address
- **Special Instructions** - Text field for custom requests
- **Checkout Button** - Proceed to payment

### Page 7: Cart Page (`/cart`)

**Purpose:** Review items before checkout.

**Components:**
- **Cart Items List** - Each item with image, name, quantity, price
- **Quantity Adjusters** - Increase/decrease items
- **Remove Item** - Delete button
- **Subtotal** - Running total
- **Delivery/Pickup Toggle**
- **Promo Code Field** (optional)
- **Proceed to Checkout Button**

### Page 8: Checkout Page (`/checkout`)

**Purpose:** Collect customer details and payment.

**Components:**
- **Customer Information Form**:
  - Name
  - Phone (required)
  - Email (optional)
  - Delivery address (if delivery selected)
- **Order Summary** - Recap of items and total
- **Payment Method**:
  - Cash on Delivery
  - Card (future integration)
- **Place Order Button**
- **Terms Agreement** Checkbox

### Page 9: Order Success (`/order-success`)

**Purpose:** Confirm order receipt and provide next steps.

**Components:**
- **Success Message** - "Thank you! Your order has been received"
- **Order Number** - Display for reference
- **Order Details** - Items, total, pickup/delivery info
- **Estimated Time** - When to expect food
- **Track Order Button** (future)
- **Social Share** - Share order (Facebook/WhatsApp)

### Page 10: Admin Dashboard (`/admin`)

**Purpose:** Manage menu, orders, and branches (password protected).

**Components:**
- **Login Page** - Admin authentication
- **Dashboard Overview** - Stats (orders today, revenue, etc.)
- **Menu Manager**:
  - Add new items (image upload)
  - Edit existing items
  - Delete items
  - Update prices
  - Manage categories
- **Order Manager**:
  - View all orders
  - Update order status (Pending → Confirmed → Preparing → Ready → Delivered)
  - Cancel orders
  - View order details
- **Branch Manager**:
  - Add/edit branch details
  - Update hours
  - Manage branch-specific offers

## 🎨 Design System

### Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Red | `#C41E3A` | Headers, buttons, accents - matches typical broast branding |
| Secondary Gold | `#FFD700` | Highlights, special offers, icons |
| Dark Charcoal | `#2D2D2D` | Body text, footers |
| Light Gray | `#F5F5F5` | Backgrounds, cards |
| White | `#FFFFFF` | Text on dark backgrounds, clean sections |
| Success Green | `#28A745` | Order confirmation, available items |
| Warning Orange | `#FF8C00` | Special deals, limited time offers |

### Typography

- **Headings:** Montserrat (Bold, 700) - Modern, clean, readable
- **Body Text:** Open Sans (Regular, 400) - Highly legible on all devices
- **Accents:** Playfair Display (for special sections like testimonials)

### Logo & Branding

- **Logo:** "Yasir Broast" in bold, custom typography (can be recreated in CSS/font)
- **Style:** Modern Pakistani restaurant aesthetic - warm, inviting, family-oriented
- **Tone:** Professional yet approachable, emphasizing quality and tradition

### UI Components

- **Buttons:**
  - Primary: Red background, white text, rounded corners
  - Secondary: Outline, gold border, dark text
  - CTA: Large, gold background, bold text
- **Cards:** White background, subtle shadow, rounded corners, hover elevation
- **Navigation:** Sticky header, transparent to solid on scroll
- **Icons:** Font Awesome 6 (via React Icons) - consistent style throughout
- **Loading States:** Skeleton loaders for async content

## ✨ Key Features

### 1. Responsive Design
- Mobile-first approach (70%+ users on mobile) [citation:8]
- Hamburger menu for mobile
- Touch-friendly buttons and cards
- Optimized images for all screen sizes

### 2. SEO Optimization
- Semantic HTML structure
- Meta tags for each page (React Helmet)
- Schema markup for:
  - Restaurant (LocalBusiness) [citation:8]
  - Menu (Menu, MenuItem)
  - Reviews (aggregate rating from Google) [citation:4]
- Sitemap generation
- robots.txt configuration

### 3. Performance
- Image optimization (WebP format, lazy loading)
- Code splitting for routes
- Caching strategy for API responses
- Minified CSS/JS

### 4. Accessibility
- ARIA labels for interactive elements
- Keyboard navigation support
- Sufficient color contrast
- Alt text for all images

### 5. Order Management
- Cart persists in localStorage
- Real-time validation
- Order confirmation page
- Email/SMS notification (future)

### 6. Admin Panel
- Secure authentication
- CRUD operations for menu
- Order status tracking
- Branch management

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/yasir-broast-website.git
cd yasir-broast-website/client

# Install dependencies
npm install

# Create .env file (see Environment Variables section)

# Start development server
npm start
Backend Setup
bash
# Navigate to server directory
cd ../server

# Install dependencies
npm install

# Create .env file (see Environment Variables section)

# Start development server
npm run dev
🔐 Environment Variables
Frontend (.env in /client)
text
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_FACEBOOK_PAGE_ID=your_facebook_page_id
Backend (.env in /server)
text
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yasirbroast
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:3000
🔌 API Endpoints
Menu Routes
GET /api/menu - Get all menu items

GET /api/menu/:id - Get single menu item

GET /api/menu/category/:category - Get items by category

POST /api/menu - Create new item (admin)

PUT /api/menu/:id - Update item (admin)

DELETE /api/menu/:id - Delete item (admin)

Order Routes
POST /api/orders - Create new order

GET /api/orders/:id - Get order by ID

GET /api/orders/user/:userId - Get user orders

PUT /api/orders/:id/status - Update order status (admin)

GET /api/orders/admin/all - Get all orders (admin)

Branch Routes
GET /api/branches - Get all branches

GET /api/branches/:id - Get single branch

POST /api/branches - Add branch (admin)

PUT /api/branches/:id - Update branch (admin)

DELETE /api/branches/:id - Delete branch (admin)

User Routes
POST /api/users/register - Register admin

POST /api/users/login - Login

GET /api/users/profile - Get user profile

PUT /api/users/profile - Update profile

🌐 Deployment
Frontend Deployment (Vercel)
bash
# Install Vercel CLI
npm i -g vercel

# Build project
npm run build

# Deploy
vercel --prod
Backend Deployment (Render/Heroku)
Push code to GitHub repository

Connect to Render/Heroku

Set environment variables in dashboard

Deploy

Database
Use MongoDB Atlas for production

Create dedicated cluster

Whitelist deployment IP addresses

🔧 Maintenance Guide
For Future Developers
This project follows standard MERN conventions. Key areas to maintain:

1. Menu Updates

Admin panel allows easy updates

Images should be optimized before upload

Keep prices current with restaurant

2. Order Processing

Monitor orders daily

Update status promptly

Handle cancellations

3. Branch Information

Verify hours regularly

Update phone numbers if changed

Add new branches as they open

4. Customer Feedback

Monitor contact form submissions

Respond to inquiries within 24 hours

Address complaints professionally

5. Performance Monitoring

Check Google PageSpeed Insights monthly

Monitor API response times

Update dependencies quarterly

Common Issues & Solutions
Issue	Solution
Images not loading	Check Cloudinary URLs, file permissions
Orders not saving	Verify MongoDB connection, check schema validation
Cart not persisting	Clear localStorage, check browser console
Admin login failing	Reset JWT secret, check user credentials
Slow page load	Optimize images, implement lazy loading, check API response times
📈 Future Enhancements
Phase 2 (Post-Launch)
Online payment integration (Stripe/JazzCash)

Order tracking system (real-time updates)

Customer accounts (order history, favorites)

Loyalty program (points system)

SMS notifications for order updates

Phase 3 (2026)
Kitchen Display System integration

Multi-language support (Urdu/English)

Mobile app (React Native)

Table reservation system

Integration with Foodpanda API

Phase 4 (2027)
AI-powered recommendations

Voice ordering

Inventory management system

Staff management portal

Analytics dashboard for business insights

📝 Notes for Developer
Yasir Broast Specific Details from Research:

Branches: At least 20 locations including Johar Town, Thokar Niaz Baig, Allama Iqbal Town, DHA 

Hours: 10:00 AM - 2:00 AM (varies slightly by branch) 

Phone Numbers: 042-35316605, 042-35316606 (Thokar), 042-35312350-54 (Johar Town) 

Popular Items: Chicken Broast, Chicken Karahi, Family Platter (3000 PKR), Chicken Malai Boti, Chicken Changezi 

Customer Pain Points: Wrong orders, missing items, inconsistent quality, long wait times 

Competitors: Foodpanda (high commission), other local restaurants

Unique Selling Point: Established brand with loyal customer base, multiple locations

Design Inspiration:

Use warm, appetizing food photography

Red and gold color scheme evokes traditional Pakistani hospitality

Clean, modern layout that's easy to navigate

Mobile-first design (most users will access via phone)

Development Priority:

Home page with hero banner and featured items

Menu page with categories

Branches page with contact info

Ordering system (simplified)

Admin panel

Happy Coding! 🍗

For questions or support, contact: [your-email@example.com]

text

This README provides everything you need to start building the Yasir Broast website manually. It includes:

1. **Complete project structure** with all folders and files organized
2. **10 pages** with detailed component breakdowns
3. **Color scheme** based on brand identity (red/gold from research)
4. **API endpoints** for all functionality
5. **Specific details** from your research about Yasir Broast (branches, hours, menu items, customer complaints)
6. **Future phases** showing how this can scale

Start with the Home page and Menu page - those are the most critical. Build them manually, component by component. By the time you finish, you'll have a solid template you can reuse for other restaurants.
