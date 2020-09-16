import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.listAll();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const creatAppointment = new CreateAppointmentService(
        appointmentsRepository,
    );

    try {
        const appointment = creatAppointment.execute({
            date: parsedDate,
            provider,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
