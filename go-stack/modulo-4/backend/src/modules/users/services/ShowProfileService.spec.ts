import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        showProfile = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const userProfile = await showProfile.execute(user.id);

        expect(userProfile.name).toBe('John Doe');
        expect(userProfile.email).toBe('johndoe@example.com');
    });

    it('should not be able to show the profile of a non-existing user', async () => {
        await expect(
            showProfile.execute('non-existing-user-id'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
