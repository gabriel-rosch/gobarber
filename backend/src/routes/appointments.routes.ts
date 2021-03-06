import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRoutes = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentRepository.all();
  return response.json(appointments);
});

appointmentsRoutes.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    );
    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRoutes;
