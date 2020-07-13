// import AppError from '@shared/errors/AppError';

import ListProviderMonthAvaliabilityService from '@modules/appointments/services/ListProviderMonthAvaliabilityService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let listProviderMonthAvaliabilityService: ListProviderMonthAvaliabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvaliabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvaliabilityService = new ListProviderMonthAvaliabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to llist hte month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '123456',
      date: new Date(2020, 4, 22, 8, 0, 0),
    });

    const availability = await listProviderMonthAvaliabilityService.execute({
      provider_id: '123456',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: false },
      ]),
    );
  });
});
