import { Router } from "express";
import { deleteVehicle, fetchVehicle, fetchVehicles, updateVehicle } from "./vehicle.controller";

const router = Router()

router.get("/fetch/:id", fetchVehicle)
router.delete("/delete/:id", deleteVehicle)
router.get("/all", fetchVehicles)
router.put("/update/:id", updateVehicle)
router.post("/create")

export default router;