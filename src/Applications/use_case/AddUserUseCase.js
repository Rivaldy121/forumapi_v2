const NewUser = require('../../Domains/users/entities/NewUser');

class AddUserUseCase {
  constructor({ userRepository, passwordHash }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const newUser = new NewUser(useCasePayload);
    await this._userRepository.verifyAvailableUsername(newUser.username);
    newUser.password = await this._passwordHash.encryptPassword(newUser.password);
    return this._userRepository.addUser(newUser);
  }
}

module.exports = AddUserUseCase;
