import { User } from "../models/user.model.js";
import { Worker } from "../models/worker.model.js";
import { Appointment } from "../models/appointment.model.js";
import moment from "moment";

export const fetchWorkers = async() => {
  const workers = await Worker.find()
      .populate({
        path: "userId", // Populates user data (firstName, lastName, address, status).
        select: "firstName lastName address status",
      })
      .select("serviceCategory totalEarnings"); // Selects only specified fields from Worker.

    // console.log(JSON.stringify(workers, null, 2)); // Debugging: Print worker list for readability.
      if(!workers){
        throw new Error("Workers not Found");
      }

  return workers;
};