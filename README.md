<div align="center">

![Diskuti Logo](frontend/resources/logo.svg)

# Diskuti

**Quizz • Discuss • Connect**

An interactive and collaborative quiz platform built to create engaging educational experiences with real-time communication capabilities.

[![PHP Version](https://img.shields.io/badge/PHP-8.3-777BB4?style=flat-square&logo=php)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-5.7+-005C87?style=flat-square&logo=mysql)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Project Architecture](#project-architecture)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

---

## Overview

**Diskuti** is a modern web-based platform designed to revolutionize online learning and collaboration. It combines interactive quiz-taking with real-time discussion features, creating a dynamic environment where users can create quizzes, share them with others, and engage in meaningful conversations around educational content.

The platform emphasizes user engagement through:
- **Interactive Quiz Creation**: Intuitive tools to build quizzes with multiple question types
- **Real-Time Communication**: Live chat functionality powered by Pusher
- **Community Discovery**: Search and explore trending quizzes
- **User Profiles**: Personalized accounts with quiz management capabilities

---

## Features

### 🎯 Quiz Management
- **Create Custom Quizzes**: Build quizzes with multiple question types (Text, Multiple Choice, Checkboxes)
- **Quiz Publishing**: Publish quizzes to share with the community
- **Quiz Discovery**: Browse and search for quizzes by name
- **My Quizzes**: Manage and track your created quizzes
- **Trending Quizzes**: Discover popular quizzes in the community

### 👥 User System
- **User Authentication**: Secure login and account creation system
- **User Profiles**: Personalized user accounts with profile management
- **Account Settings**: Customize user preferences

### 💬 Real-Time Communication
- **Live Messaging**: Real-time chat powered by Pusher
- **Chat Management**: Create and manage conversations with other users
- **Message History**: Access previous conversations

### 🎨 User Interface
- **Responsive Design**: Mobile-friendly interface using Montserrat font
- **Modern UX**: Intuitive navigation with icon-based menus
- **Professional Styling**: Clean and consistent design system

### 🔒 Security
- **Session Management**: Secure session handling
- **Database Security**: Prepared statements to prevent SQL injection
- **CORS Support**: Proper cross-origin resource handling

---

## Project Structure

```
Diskuti/
├── index.php                 # Main application entry point
├── frontend/                 # Client-side files
│   ├── account-creation.php  # Registration page
│   ├── login.php            # Login page
│   ├── my-quizzes.php       # User's quiz management
│   ├── quiz-creation.php    # Quiz builder interface
│   ├── quiz-submission.php  # Quiz taking interface
│   ├── scripts/             # JavaScript files
│   │   ├── main.js          # Main application logic
│   │   ├── login.js         # Authentication handlers
│   │   ├── account-creation.js
│   │   ├── quiz-creation.js # Quiz builder logic
│   │   ├── chat.js          # Chat functionality
│   │   ├── entire-quiz.js
│   │   ├── get-quizzes.js
│   │   ├── search-quiz.js
│   │   ├── trending-quizzes.js
│   │   └── user-logout.js
│   ├── styles/              # CSS stylesheets
│   │   ├── reset.css        # CSS reset
│   │   ├── styles.css       # Base styles
│   │   ├── main.css         # Main layout
│   │   ├── login.css        # Auth pages styling
│   │   ├── quiz-creation.css
│   │   ├── quiz-submission.css
│   │   ├── my-quizzes.css
│   │   ├── search-quiz.css
│   │   ├── footer.css
│   │   └── footer.php       # Footer component
│   └── resources/           # Images and assets
│       ├── logo.svg         # Main logo (color)
│       ├── logo-black.svg   # Black variant
│       ├── logo-dark.svg    # Dark variant
│       ├── diskuti-icon.png # Favicon
│       ├── banner-img.svg   # Marketing banner
│       └── [icons & images]
├── backend/                 # Server-side files
│   ├── config.php          # Database configuration
│   ├── user-login.php      # Authentication endpoint
│   ├── user-logout.php     # Logout handler
│   ├── add-user.php        # User registration
│   ├── add-chat.php        # Create chat session
│   ├── get-chats.php       # Retrieve chat list
│   ├── get-messages.php    # Fetch chat messages
│   ├── send-message.php    # Send message handler
│   ├── quiz-publish.php    # Publish quiz endpoint
│   ├── get-quizzes.php     # Retrieve quizzes
│   ├── entire-quizzes.php  # Full quiz data
│   ├── search-quiz.php     # Search functionality
│   ├── search-users.php    # User search
│   ├── trending-quizzes.php # Popular quizzes
│   ├── composer.json       # PHP dependencies
│   ├── vendor/             # Composer packages
│   └── banners/            # Quiz banner uploads
└── README.md               # This file
```

---

## Technology Stack

### Backend
- **Language**: PHP 8.3
- **Database**: MySQL 5.7+
- **Package Manager**: Composer
- **Real-Time**: Pusher PHP Server SDK v7.2+

### Frontend
- **Markup**: HTML5
- **Styling**: CSS3
- **Scripting**: JavaScript (Vanilla)
- **Icons**: Font Awesome (v6.x)
- **Typography**: Google Fonts (Montserrat)
- **Real-Time**: Pusher JavaScript Client v8.0.1+

### Dependencies
```json
{
  "pusher/pusher-php-server": "^7.2"
}
```

---

## Requirements

Before installation, ensure you have:

- **PHP 8.3** or higher
- **MySQL 5.7** or higher
- **Composer** (latest version)
- **Web Server** (Apache with mod_rewrite or Nginx)
- **Node.js** (optional, for frontend build tools)
- **Pusher Account** (for real-time messaging)
- **Git** (for version control)

---

## Installation

### Step 1: Clone the Repository

```bash
cd /var/www
git clone <repository-url> Diskuti
cd Diskuti
```

### Step 2: Install Backend Dependencies

```bash
cd backend
composer install
cd ..
```

### Step 3: Create Database

```bash
mysql -u root -p

CREATE DATABASE diskuti_db;
CREATE USER 'diskuti'@'localhost' IDENTIFIED BY 'd1sk_t1#Db';
GRANT ALL PRIVILEGES ON diskuti_db.* TO 'diskuti'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Import Database Schema

Create the database tables in your MySQL client:

```sql
USE diskuti_db;

-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quizzes table
CREATE TABLE quizzes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  banner VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Chat sessions table
CREATE TABLE chats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users(id),
  FOREIGN KEY (user2_id) REFERENCES users(id)
);

-- Messages table
CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  chat_id INT NOT NULL,
  user_id INT NOT NULL,
  text TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chat_id) REFERENCES chats(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Step 5: Configure Web Server

**Apache (.htaccess)**:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /Diskuti/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.php?/$1 [L]
</IfModule>
```

**Nginx**:
```nginx
location /Diskuti/ {
  if (!-e $request_filename){
    rewrite ^(.*)$ /Diskuti/index.php break;
  }
}
```

---

## Configuration

### Backend Configuration

Edit `backend/config.php` with your database credentials:

```php
<?php
    $host = "localhost";
    $username = "diskuti";
    $password = "d1sk_t1#Db";
    $database = "diskuti_db";

    $connection = new mysqli($host, $username, $password, $database);
?>
```

### Pusher Configuration

Add your Pusher credentials to your configuration:

1. Sign up at [pusher.com](https://pusher.com)
2. Create a new app and get your keys
3. Add to your configuration files where real-time features are initialized

---

## Database Setup

The application uses the following database structure:

### Tables Overview

| Table | Purpose |
|-------|---------|
| `users` | Stores user account information |
| `quizzes` | Stores quiz metadata and ownership |
| `chats` | Manages chat sessions between users |
| `messages` | Stores individual chat messages |

For a complete schema dump, run:
```bash
mysqldump -u diskuti -p diskuti_db > backup.sql
```

---

## Usage

### Starting the Application

1. **Ensure web server is running**
   ```bash
   sudo systemctl start apache2  # or nginx
   ```

2. **Navigate to the application**
   ```
   http://localhost/Diskuti/
   ```

3. **Create an Account**
   - Click "Create Account" on the login page
   - Fill in your details
   - You'll be redirected to the main dashboard

### Creating a Quiz

1. Click the **Create Quiz** button (+) in the navigation
2. Enter a quiz name
3. Add questions using the sidebar tools:
   - **Text**: Open-ended questions
   - **Checkbox**: Multiple correct answers
   - **Radio**: Single correct answer
   - **Upload**: Add quiz banner image
4. **Publish** or **Share** your quiz

### Taking a Quiz

1. Use the **Search** feature to find quizzes
2. Click on a quiz to start
3. Answer all questions
4. Submit your responses

### Real-Time Chat

1. Navigate to **My Chats**
2. Start a new conversation or select an existing one
3. Messages update in real-time
4. View chat history anytime

### Discovering Content

- **Trending**: See popular quizzes on the home page
- **Search**: Use the search bar to find specific quizzes or users
- **My Quizzes**: View and manage your created quizzes

---

## Project Architecture

### Frontend Architecture

**Single Page Application** with modular JavaScript:
- Event-driven interactions
- Local storage for temporary data
- AJAX for server communication
- Real-time updates via Pusher

### Backend Architecture

**RESTful API** endpoints:
- Separate endpoints for each feature (chat, quizzes, users)
- JSON request/response format
- CORS support for cross-origin requests
- Database abstraction with MySQLi prepared statements

### Data Flow

```
Client (JavaScript)
  ↓
HTTP Request (AJAX)
  ↓
PHP Endpoint (Backend)
  ↓
Database Query (MySQLi)
  ↓
Database Response
  ↓
JSON Response
  ↓
Client Processing
  ↓
DOM Update
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/backend/user-login.php` | User login |
| POST | `/backend/add-user.php` | User registration |
| POST | `/backend/user-logout.php` | User logout |

### Quizzes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/backend/quiz-publish.php` | Publish a quiz |
| GET | `/backend/get-quizzes.php` | Retrieve all quizzes |
| POST | `/backend/search-quiz.php` | Search quizzes |
| GET | `/backend/trending-quizzes.php` | Get trending quizzes |
| GET | `/backend/entire-quizzes.php` | Get full quiz data |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/backend/add-chat.php` | Create chat session |
| GET | `/backend/get-chats.php` | Retrieve chat list |
| GET | `/backend/get-messages.php` | Fetch messages |
| POST | `/backend/send-message.php` | Send message |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/backend/search-users.php` | Search for users |

**Note**: All endpoints expect `application/json` responses and support CORS with proper OPTIONS handling.

---

## Security Considerations

### Implemented Features
- ✅ Session-based authentication
- ✅ Prepared statements (prevent SQL injection)
- ✅ CORS headers management
- ✅ Password hashing (recommended)
- ✅ Input validation

### Recommendations
1. **Use HTTPS** in production
2. **Implement rate limiting** on API endpoints
3. **Add CSRF tokens** to forms
4. **Regularly update** dependencies via Composer
5. **Use environment variables** for sensitive config
6. **Enable MySQL SSL** for database connections
7. **Implement proper password hashing** (bcrypt/Argon2)

---

## Troubleshooting

### Common Issues

**Issue**: "Database connection failed"
- **Solution**: Check database credentials in `backend/config.php`
- Verify MySQL service is running: `sudo systemctl status mysql`

**Issue**: "Session not set" / Redirected to login
- **Solution**: Ensure cookies are enabled in browser
- Clear browser cache and cookies
- Check `session.save_path` permissions

**Issue**: "Pusher not working" / No real-time updates
- **Solution**: Verify Pusher credentials are configured
- Check Pusher connection in browser console
- Verify network requests in Developer Tools

**Issue**: "Images not uploading"
- **Solution**: Check `backend/banners/` directory permissions (755)
- Verify file upload size limits in `php.ini`
- Check server disk space

---

## Contributing

We welcome contributions! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Guidelines
- Follow PSR-12 PHP coding standards
- Write meaningful commit messages
- Test your changes thoroughly
- Document new features in this README

---

## File Permissions

Ensure proper file permissions for production:

```bash
# Web server files
chmod 755 /var/www/Diskuti
chmod 755 /var/www/Diskuti/frontend
chmod 755 /var/www/Diskuti/backend
chmod 755 /var/www/Diskuti/backend/banners

# Web server writable directories
chmod 775 /var/www/Diskuti/backend/banners

# Config files (be careful with permissions)
chmod 600 /var/www/Diskuti/backend/config.php
```

---

## Performance Optimization

### Recommendations
- Enable **PHP OPcache** for better performance
- Use **MySQL query caching** where applicable
- Implement **CSS/JavaScript minification**
- Use **browser caching** headers
- Consider **CDN** for static assets
- Enable **GZIP compression** on web server

---

## License

This project is proprietary and confidential. All rights reserved.

---

## Support

For issues, questions, or suggestions:
- 📧 Email: support@diskuti.local
- 🐛 Report bugs: Create an issue in the repository
- 💬 Discussions: Use the repository discussions feature

---
