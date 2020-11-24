import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            provider_id: '1',
            user_id: '99',
            date: new Date(),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1');
    });

    it('should not be able to create two appointments in the same date', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            provider_id: '2',
            user_id: '99',
            date: appointmentDate,
        });

        await expect(
            createAppointment.execute({
                provider_id: '3',
                user_id: '99',
                date: appointmentDate,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
