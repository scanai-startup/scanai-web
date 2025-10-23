import { TankWithDetails } from '@/features/tanks/types/tankWithDetails';
import { faker } from '@faker-js/faker';

export function createDepositWithData(): TankWithDetails {
	return {
		idDeposito: faker.number.int(),
		numeroDeposito: faker.location.buildingNumber(),
		tipoDeposito: faker.commerce.product(),
		volumeConteudo: faker.number.int({ min: 100, max: 1000 }),
		capacidadeDeposito: faker.number.int({ min: 100, max: 1000 }),
		temperatura: faker.number.float({
			fractionDigits: 2,
			min: 0,
			max: 100,
		}),
		densidade: faker.number.float({
			fractionDigits: 2,
			min: 0,
			max: 100,
		}),
		pressao: faker.number.float({
			fractionDigits: 2,
			min: 0,
			max: 100,
		}),
		idConteudo: faker.number.int(),
		conteudo: faker.commerce.product(),
	};
}

export const fakeDepositsWithData = faker.helpers.multiple(
	createDepositWithData,
	{
		count: 10,
	}
);
