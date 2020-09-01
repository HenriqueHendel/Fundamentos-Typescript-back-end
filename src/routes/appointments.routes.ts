import {Router} from "express";
import {parseISO} from "date-fns";
import  AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const AppointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response)=>{  
    const appoitments = AppointmentRepository.all();

    return response.json(appoitments);
});

appointmentsRouter.post("/", (request,response)=>{
    try{
        const {provider, date} = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(AppointmentRepository); 

        const appointment = createAppointment.execute({provider, date:parsedDate})
        
        return response.json(appointment);
    }catch(err) {
        return response.status(400).json({message: err.message});
    }
});

export default appointmentsRouter;