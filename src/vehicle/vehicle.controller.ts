import { Request, Response } from "express";
import Vehicle from "./vehicle.model";
import * as vehicleServices from "./vehicle.services";

export async function fetchVehicle(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const vehicle = await vehicleServices.getVehicleById(id)
        res.status(200).json({data: vehicle})
    } catch (error) {
        res.status(500).json({message: "Unable to fetch vehicles"})
    }
}

export async function fetchVehicles(req: Request, res: Response) {
    try {
        const vehicles = await vehicleServices.retrieveVehicles()
        res.status(200).send(vehicles)
    } catch (error) {
        res.status(500).json({message: "Unable to fetch vehicles"})
    }
}


export async function deleteVehicle(req: Request, res: Response) {
    try {
        const {id} = req.params;
        await vehicleServices.removeVehicle(id)
        res.status(200).json({message: "Vehicle deleted successfully"})
    } catch (error) {
        res.status(500).json({message: ""})
    }
}


export async function createVehicle(req: Request, res: Response) {
    try {
        const vehicle = await vehicleServices.addVehicle(req.body)
        res.status(201).json({data: vehicle, message: "New vehicle created"}) 
    } catch (error) {
        res.status(500).json({message: ""})
    }
}


export async function updateVehicle(req: Request, res: Response) {
    try {
        const {id} = req.params
        await vehicleServices.editVehicleData(id, req.body)
        res.status(204).json({message: "Vehicle updated successfully"})
    } catch (error) {
        res.status(500).json({message: ""})
    }
}
