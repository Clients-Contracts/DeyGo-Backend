import express from "express";
import {} from "../controllers/driver.controller";
import {
  approveDriver,
  fetchAdminData,
  fetchDrivers,
  getDriver,
  loginAdmin,
  registerAdmin,
  rejectDriver,
  updateAdminData,
} from "controllers/admin.controller";

const router = express.Router();

// Authentication Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Profile Management Routes
router.get("/profile/:id", fetchAdminData);
router.put("/profile/:id", updateAdminData);

// Drivers Management Routes
router.get("/drivers", fetchDrivers);
router.get("/driver/:id", getDriver);
router.patch("/driver/application/accept", approveDriver);
router.patch("/driver/application/reject", rejectDriver);


// Disputes Management Routes
router.put("/");
router.put("/");

// Pricing Management Routes
router.get("/");
router.put("/");

export default router;
