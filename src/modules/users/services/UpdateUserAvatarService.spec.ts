import AppError from '@shared/errors/AppError';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: '123456.jpg',
    });

    expect(user.avatar).toBe('123456.jpg');
  });

  it('should delete old avatar when updating', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: '123456.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: '654321.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('123456.jpg');
    expect(user.avatar).toBe('654321.jpg');
  });

  it('should not be able to update avatar of non existing user', async () => {
    expect(
      updateUserAvatar.execute({
        user_id: 'null',
        avatarFileName: '123456.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
