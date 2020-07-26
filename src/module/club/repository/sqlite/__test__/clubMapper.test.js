const { fromModelToEntity } = require('../clubMapper');
const ClubEntity = require('../../../entity/club');

test('Convierte un modelo a una entidad del dominio', () => {
  expect(
    fromModelToEntity({
      toJSON() {
        return {};
      },
    })
  ).toBeInstanceOf(ClubEntity);
});
