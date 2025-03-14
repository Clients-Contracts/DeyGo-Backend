import Driver from "../driver/driver.model";
import Vehicle, { IVehicle } from "./vehicle.model";

export const getVehicleById = async (vehicleId: string) => {
  const vehicle = await Vehicle.findById(vehicleId).populate("driver");
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }
  return vehicle;
};

export const removeVehicle = async (vehicleId: string) => {
  const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }
  return { message: "Vehicle deleted successfully" };
};

export const addVehicle = async (data: IVehicle) => {
  const driver = await Driver.findById(data.driver);
  if (!driver) throw new Error("Driver not found");

  const newVehicle = await Vehicle.create(data);
  return newVehicle;
};

export const editVehicleData = async (id:string, data: IVehicle) => {
    const updatedVehicle = await Vehicle.findByIdAndUpdate({id, data});
    if (!updatedVehicle) {
        throw new Error("Vehicle not found")
    }
    return updatedVehicle;
  };

export const retrieveVehicles = async () => {
  const vehicles = await Vehicle.find();
  return vehicles;
};
