// queries.js - All MongoDB queries for the PLP Bookstore assignment

// Connect to the plp_bookstore database
use('plp_bookstore');

print("=== TASK 2: BASIC CRUD OPERATIONS ===\n");

// 1. Find all books in a specific genre (Fantasy)
print("1. Find all books in Fantasy genre:");
db.books.find({ genre: "Fantasy" }).forEach(printjson);
print("\n");

// 2. Find books published after a certain year (2000)
print("2. Find books published after 2000:");
db.books.find({ published_year: { $gt: 2000 } }).forEach(printjson);
print("\n");

// 3. Find books by a specific author (J.R.R. Tolkien)
print("3. Find books by J.R.R. Tolkien:");
db.books.find({ author: "J.R.R. Tolkien" }).forEach(printjson);
print("\n");

// 4. Update the price of a specific book
print("4. Update the price of 'The Great Gatsby' to $15.99:");
const updateResult = db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 15.99 } }
);
print("Update result:", updateResult);
print("Updated book:");
db.books.find({ title: "The Great Gatsby" }).forEach(printjson);
print("\n");

// 5. Delete a book by its title
print("5. Delete 'Brave New World':");
const deleteResult = db.books.deleteOne({ title: "Brave New World" });
print("Delete result:", deleteResult);
print("Remaining books count:", db.books.countDocuments());
print("\n");

print("=== TASK 3: ADVANCED QUERIES ===\n");

// 1. Find books that are both in stock and published after 2010
print("1. Books in stock and published after 2010:");
db.books.find({
  $and: [
    { in_stock: true },
    { published_year: { $gt: 2010 } }
  ]
}).forEach(printjson);
print("\n");

// 2. Use projection to return only title, author, and price fields
print("2. Books with projection (title, author, price only):");
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).forEach(printjson);
print("\n");

// 3. Sorting by price (ascending)
print("3. Books sorted by price (ascending):");
db.books.find(
  {},
  { title: 1, price: 1, _id: 0 }
).sort({ price: 1 }).forEach(printjson);
print("\n");

// 4. Sorting by price (descending)
print("4. Books sorted by price (descending):");
db.books.find(
  {},
  { title: 1, price: 1, _id: 0 }
).sort({ price: -1 }).forEach(printjson);
print("\n");

// 5. Pagination - First page (5 books per page)
print("5. Pagination - Page 1 (first 5 books):");
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).limit(5).forEach(printjson);
print("\n");

// 6. Pagination - Second page (skip 5, limit 5)
print("6. Pagination - Page 2 (next 5 books):");
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).skip(5).limit(5).forEach(printjson);
print("\n");

print("=== TASK 4: AGGREGATION PIPELINE ===\n");

// 1. Calculate average price of books by genre
print("1. Average price by genre:");
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { averagePrice: -1 }
  }
]).forEach(printjson);
print("\n");

// 2. Find the author with the most books
print("2. Author with the most books:");
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 },
      books: { $push: "$title" }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 1
  }
]).forEach(printjson);
print("\n");

// 3. Group books by publication decade
print("3. Books grouped by publication decade:");
db.books.aggregate([
  {
    $addFields: {
      decade: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } },
          10
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 },
      books: { $push: { title: "$title", year: "$published_year" } }
    }
  },
  {
    $sort: { _id: 1 }
  }
]).forEach(printjson);
print("\n");

print("=== TASK 5: INDEXING ===\n");

// 1. Create index on title field
print("1. Creating index on 'title' field:");
const titleIndexResult = db.books.createIndex({ title: 1 });
print("Title index result:", titleIndexResult);
print("\n");

// 2. Create compound index on author and published_year
print("2. Creating compound index on 'author' and 'published_year':");
const compoundIndexResult = db.books.createIndex({ author: 1, published_year: 1 });
print("Compound index result:", compoundIndexResult);
print("\n");

// 3. List all indexes
print("3. All indexes on the books collection:");
db.books.getIndexes().forEach(printjson);
print("\n");

// 4. Performance analysis using explain()
print("4. Query performance analysis:");

print("Query without index (finding by genre):");
const explainWithoutIndex = db.books.find({ genre: "Fiction" }).explain("executionStats");
print("Execution time:", explainWithoutIndex.executionStats.executionTimeMillis, "ms");
print("Documents examined:", explainWithoutIndex.executionStats.totalDocsExamined);
print("Documents returned:", explainWithoutIndex.executionStats.totalDocsReturned);
print("\n");

print("Query with index (finding by title):");
const explainWithIndex = db.books.find({ title: "The Great Gatsby" }).explain("executionStats");
print("Execution time:", explainWithIndex.executionStats.executionTimeMillis, "ms");
print("Documents examined:", explainWithIndex.executionStats.totalDocsExamined);
print("Documents returned:", explainWithIndex.executionStats.totalDocsReturned);
print("Index used:", explainWithIndex.executionStats.executionStages.indexName || "None");
print("\n");

print("Compound index query (author and year):");
const explainCompoundIndex = db.books.find({ 
  author: "J.R.R. Tolkien", 
  published_year: 1954 
}).explain("executionStats");
print("Execution time:", explainCompoundIndex.executionStats.executionTimeMillis, "ms");
print("Documents examined:", explainCompoundIndex.executionStats.totalDocsExamined);
print("Documents returned:", explainCompoundIndex.executionStats.totalDocsReturned);
print("\n");

print("=== ADDITIONAL USEFUL QUERIES ===\n");

// Additional useful queries for the bookstore

// 1. Find most expensive books
print("1. Top 3 most expensive books:");
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
  .sort({ price: -1 })
  .limit(3)
  .forEach(printjson);
print("\n");

// 2. Count books by stock status
print("2. Books count by stock status:");
db.books.aggregate([
  {
    $group: {
      _id: "$in_stock",
      count: { $sum: 1 }
    }
  }
]).forEach(printjson);
print("\n");

// 3. Find books with more than 400 pages
print("3. Books with more than 400 pages:");
db.books.find(
  { pages: { $gt: 400 } },
  { title: 1, pages: 1, _id: 0 }
).sort({ pages: -1 }).forEach(printjson);
print("\n");

// 4. Price range analysis
print("4. Price range analysis:");
db.books.aggregate([
  {
    $group: {
      _id: null,
      minPrice: { $min: "$price" },
      maxPrice: { $max: "$price" },
      avgPrice: { $avg: "$price" },
      totalBooks: { $sum: 1 }
    }
  }
]).forEach(printjson);

print("\n=== QUERIES COMPLETED ===");