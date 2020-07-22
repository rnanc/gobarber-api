import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

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
      date: new Date(),
      provider_id: '1232131',
      user_id: '654321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1232131');
  });

  it('should not be able to create 2 appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1232131',
      user_id: '654321',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1232131',
        user_id: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
