import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
        );
    });
    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2020, 4, 10, 13),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider-id');
    });

    it('should not be able to create two appointments in the same date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointmentDate = new Date(2020, 4, 10, 13);

        await createAppointment.execute({
            date: appointmentDate,
            user_id: 'user-id',
            provider_id: 'provider-id',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: 'user-id',
                provider_id: 'provider-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to creat an appointment in the past', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                provider_id: 'provider-id',
                user_id: 'user-id',
                date: new Date(2020, 4, 10, 11),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to creat an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                provider_id: 'same-user',
                user_id: 'same-user',
                date: new Date(2020, 4, 10, 13),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to creat an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                provider_id: 'provider-id',
                user_id: 'user-id',
                date: new Date(2020, 4, 11, 7),
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                provider_id: 'provider-id',
                user_id: 'user-id',
                date: new Date(2020, 4, 11, 18),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
