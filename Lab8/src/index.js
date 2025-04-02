/** @format */

import { app } from "./app.js";
import {
  connectDB,
  deleteUser,
  selectUsers,
  selectUserByEmail,
  dropUsersTable,
} from "./db/index.js";

connectDB()
  .then((connection) => {
    // ✅ Store the connection
    const PORT = 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port: ${PORT}`);
    });

    // Route to get all users
    app.get("/api/v1/users", async (req, res) => {
      try {
        const users = await selectUsers(connection);
        res.json({ success: true, users });
      } catch (error) {
        res.status(500).json({ error: "Database query failed" });
      }
    });

    // Route to get a unique user
    app.get("/api/v1/users/:email", async (req, res) => {
      try {
        const user = await selectUserByEmail(connection, req.params.email);
        res.json({ success: true, user });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch unique user" });
      }
    });

    // Route to delete a user
    app.delete("/api/v1/users/:email", async (req, res) => {
      try {
        await deleteUser(connection, req.params.email);
        res.json({ success: true, message: "User deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
      }
    });

    // Route to drop the Users table
    app.delete("/api/v1/table", async (req, res) => {
      try {
        await dropUsersTable(connection);
        res.json({ success: true, message: "Table dropped successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to drop table" });
      }
    });
  })
  .catch((error) => {
    console.error("❌ MySQL connection failed:", error); // ✅ Corrected error message
  });

// Default route
app.get("/api/v1", (req, res) => {
  res.send("Welcome to FSWD");
});
