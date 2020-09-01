import {startOfHour} from "date-fns";

import Appointment from "../models/Appointment";
import AppointmentRepository from "../repositories/AppointmentsRepository";

interface Request {
    provider: string;
    date: Date;
}

class CreateAppoitmentService {
    private appoitmentsRepository: AppointmentRepository;

    constructor(appointmentRepository: AppointmentRepository){
        this.appoitmentsRepository = appointmentRepository;
    }

    public execute({provider, date}: Request): Appointment {

        const appointmentDate = startOfHour(date);
    
        const findAppointmentInSameDate = this.appoitmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate) {
            throw Error('This appointment is already booked.');
        }

        const appointment = this.appoitmentsRepository.create({provider, date:appointmentDate}); 

        return appointment;

    }

}

export default CreateAppoitmentService;