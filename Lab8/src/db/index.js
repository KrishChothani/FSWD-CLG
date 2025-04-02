/** @format */

import mysql from "mysql2/promise";

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Krish@259", 
      database: "fswd", 
    });

    console.log(
      `✅ MySQL Connected Successfully! DB HOST: ${connection.config.host}\n`,
      `✅ MySQL Connected Successfully! DB HOST: ${connection.threadId}`
    );

    // 1. Create Database
    await connection.query("CREATE DATABASE IF NOT EXISTS fswd");
    console.log("✅ Database created");

    // Switch to the database
    await connection.query("USE fswd");

    // 2. Create Table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE
      )
    `;
    await connection.query(createTableQuery);
    console.log("✅ Table created");

    return connection;
  } catch (error) {
    console.error("❌ MySQL Connection Error:", error);
    throw error;
  }
};

// Function to insert a new user
const insertUser = async (connection, name, email) => {
  const [existingUsers] = await connection.query(
    "SELECT * FROM Users WHERE email = ?",
    [email]
  );

  if (existingUsers.length === 0) {
    const [insertResult] = await connection.query(
      "INSERT INTO Users (name, email) VALUES (?, ?)",
      [name, email]
    );
    console.log("✅ User inserted, ID:", insertResult.insertId);
  } else {
    console.log("⚠️ User already exists, skipping insertion.");
  }
};

// Function to update a user's name
const updateUser = async (connection, name, email) => {
  const [result] = await connection.query(
    "UPDATE Users SET name = ? WHERE email = ?",
    [name, email]
  );
  console.log("✅ User updated:", result.affectedRows);
};

// Function to delete a record
const deleteUser = async (connection, email) => {
  const [result] = await connection.query("DELETE FROM Users WHERE email = ?", [
    email,
  ]);
  console.log("✅ User deleted:", result.affectedRows);
};

// Function to select all users
const selectUsers = async (connection) => {
  const [rows] = await connection.query("SELECT * FROM Users");
  console.log("✅ Selected Users:", rows);
  return rows;
};

// Function to select a specific user by email
const selectUserByEmail = async (connection, email) => {
  const [result] = await connection.query(
    "SELECT * FROM Users WHERE email = ?",
    [email]
  );
  console.log("✅ User Found:", result);
  return result;
};

// Function to drop the Users table
const dropUsersTable = async (connection) => {
  await connection.query("DROP TABLE IF EXISTS Users");
  console.log("✅ Users table dropped");
};

export {
  connectDB,
  insertUser,
  updateUser,
  deleteUser,
  selectUsers,
  selectUserByEmail,
  dropUsersTable,
};
