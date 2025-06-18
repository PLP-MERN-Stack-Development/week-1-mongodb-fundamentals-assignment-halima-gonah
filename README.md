[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19811312&assignment_repo_type=AssignmentRepo)

# MongoDB Fundamentals Assignment

This assignment focuses on learning MongoDB fundamentals including setup, CRUD operations, advanced queries, aggregation pipelines, and indexing.

## Assignment Overview

You will:

1. Set up a MongoDB database
2. Perform basic CRUD operations
3. Write advanced queries with filtering, projection, and sorting
4. Create aggregation pipelines for data analysis
5. Implement indexing for performance optimization

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install MongoDB locally or set up a MongoDB Atlas account
4. Run the provided `insert_books.js` script to populate your database
5. Complete the tasks in the assignment document

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all tasks in the assignment
2. Add your `queries.js` file with all required MongoDB queries
3. Include a screenshot of your MongoDB database
4. Update the README.md with your specific setup instructions

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)

# PLP Bookstore - MongoDB Assignment

This repository contains the MongoDB assignment for Week 1, focusing on database fundamentals and advanced techniques using a bookstore database.

## 📁 Project Structure

```
├── insert_books.js    # Script to populate the database with sample books
├── queries.js         # All MongoDB queries for the assignment tasks
└── README.md          # This file
```

## 🚀 Setup Instructions

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Edition**

   - Download from [MongoDB Official Website](https://www.mongodb.com/try/download/community)
   - Follow the installation guide for your operating system

2. **Start MongoDB Service**

   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community

   # On Windows
   net start MongoDB

   # On Linux (Ubuntu/Debian)
   sudo systemctl start mongod
   ```

3. **Connect to MongoDB Shell**
   ```bash
   mongosh
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Connect using mongosh:
   ```bash
   mongosh "mongodb+srv://your-connection-string"
   ```

## 📊 Database Setup

1. **Create the Database and Collection**

   ```javascript
   use plp_bookstore
   db.createCollection("books")
   ```

2. **Populate the Database**

   ```bash
   # Load and execute the insert script
   mongosh --file insert_books.js
   ```

3. **Run All Queries**
   ```bash
   # Execute all assignment queries
   mongosh --file queries.js
   ```

## 📋 Assignment Tasks Completed

### ✅ Task 1: MongoDB Setup

- [x] Database `plp_bookstore` created
- [x] Collection `books` created
- [x] 15 sample books inserted with all required fields

### ✅ Task 2: Basic CRUD Operations

- [x] Find books by genre
- [x] Find books published after a specific year
- [x] Find books by author
- [x] Update book price
- [x] Delete book by title

### ✅ Task 3: Advanced Queries

- [x] Complex filtering with multiple conditions
- [x] Projection to return specific fields
- [x] Sorting (ascending and descending)
- [x] Pagination with limit and skip

### ✅ Task 4: Aggregation Pipeline

- [x] Average price calculation by genre
- [x] Author with most books
- [x] Books grouped by publication decade

### ✅ Task 5: Indexing

- [x] Single field index on `title`
- [x] Compound index on `author` and `published_year`
- [x] Performance analysis using `explain()`

## 🔍 Key Features

### Sample Data Structure

Each book document contains:

- `title` (string): Book title
- `author` (string): Author name
- `genre` (string): Book genre
- `published_year` (number): Publication year
- `price` (number): Book price
- `in_stock` (boolean): Availability status
- `pages` (number): Number of pages
- `publisher` (string): Publisher name

### Indexes Created

1. **Single Index**: `{ title: 1 }` - For fast title searches
2. **Compound Index**: `{ author: 1, published_year: 1 }` - For author and year queries

### Sample Queries

```javascript
// Find all fantasy books
db.books.find({ genre: "Fantasy" });

// Books published after 2000 with projection
db.books.find(
  { published_year: { $gt: 2000 } },
  { title: 1, author: 1, price: 1, _id: 0 }
);

// Average price by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
    },
  },
]);
```

## 📈 Performance Analysis

The assignment includes performance comparison between:

- Queries without indexes (collection scans)
- Queries with single field indexes
- Queries with compound indexes

Use `explain("executionStats")` to analyze:

- Execution time
- Documents examined vs. returned
- Index usage

## 🛠️ Technologies Used

- **MongoDB**: Document database
- **MongoDB Shell (mongosh)**: Command-line interface
- **JavaScript**: Query and aggregation language

## 📸 Database Visualization

When using MongoDB Compass or Atlas, you can visualize:

- Collection structure
- Document samples
- Index performance
- Query results

## 🎯 Learning Outcomes

This assignment demonstrates:

- MongoDB installation and setup
- CRUD operations (Create, Read, Update, Delete)
- Advanced querying techniques
- Aggregation pipeline usage
- Index creation and performance optimization
- Database design best practices

## 🔧 Troubleshooting

### Common Issues:

1. **Connection Error**: Ensure MongoDB service is running
2. **Database Not Found**: Use `use plp_bookstore` to switch to the correct database
3. **Index Creation Failed**: Check if the collection exists and has data
4. **Query Syntax Error**: Verify JavaScript syntax in query files

### Verification Commands:

```javascript
// Check if database exists
show dbs

// Check collections in current database
show collections

// Count documents
db.books.countDocuments()

// List all indexes
db.books.getIndexes()
```

## 📝 Notes

- All queries are saved in `queries.js` for easy execution
- The database contains 15 diverse books across multiple genres
- Indexes significantly improve query performance on large datasets
- Aggregation pipelines provide powerful data analysis capabilities

## 🎉 Completion Status

- ✅ All tasks completed successfully
- ✅ Database populated with sample data
- ✅ All required queries implemented
- ✅ Performance optimization with indexes
- ✅ Comprehensive documentation provided
