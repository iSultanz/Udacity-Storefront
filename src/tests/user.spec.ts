import { UserRetrieve, UserSignUp } from '../interface/user';
import {
  getUserById,
  getUsers,
  signUp,
  validateSignUp,
} from '../models/user.model';

describe('testing for all user models', () => {
  it('test for signUp model to make sure it work perfect', async () => {
    const body: UserSignUp = {
      email: 'userTest@test.com',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      password: 'SuperPassword',
    };
    const result = await signUp(body);
    expect(result).toBe('User Created Successfully ..');
  });

  it('test for signUp validation to be not empty', async () => {
    const body: UserSignUp = {
      email: 'testingEmail@test.com',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      password: 'SuperPassword',
    };
    const validate = await validateSignUp(body);
    expect(validate).toBe(true);
  });
});
it('test get all user model', async () => {
  const result: UserRetrieve[] = await getUsers();
  expect(result.length).toBeGreaterThan(0);
});
it('test get user by id model', async () => {
  const result: UserRetrieve = await getUserById(1);
  expect(result.email.length).toBeGreaterThanOrEqual(1);
});
