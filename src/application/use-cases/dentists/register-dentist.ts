import { Dentist } from '@application/entities/dentist';
import { Email } from '@application/entities/value-objects/email';
import { DentistsRepository } from '@application/repositories/dentists-repository';
import { DentistAlreadyExists } from './errors/dentist-already-exists';

interface RegisterDentistRequest {
  name: string;
  email: string;
}

export class RegisterDentist {
  constructor(private dentistsRepository: DentistsRepository) {}

  private async validate(request: RegisterDentistRequest) {
    const { email } = request;

    const dentistExists = await this.dentistsRepository.findByEmail(email);

    if (dentistExists) throw new DentistAlreadyExists();
  }

  async execute(request: RegisterDentistRequest) {
    await this.validate(request);

    const { name, email } = request;

    const dentist = new Dentist({
      name,
      email: new Email(email),
    });

    await this.dentistsRepository.create(dentist);

    return { dentist };
  }
}
