const Sqlite3Database = require('better-sqlite3');
const fs = require('fs');
const ClubRepository = require('../clubRepository');
const Club = require('../../../entity/club');
const ClubNotFoundError = require('../../error/clubNotFoundError');
const ClubIdNotDefinedError = require('../../error/clubIdNotDefinedError');

let mockDb;

beforeEach(() => {
  mockDb = new Sqlite3Database(':memory:');
  const migration = fs.readFileSync('./src/config/setup.sql', 'utf-8');
  mockDb.exec(migration);
});

test('Guardar un club nuevo genera un id', () => {
  const repository = new ClubRepository(mockDb);
  const club = repository.save(
    new Club({
      name: 'name',
      tla: 'tla',
      shortName: 'shortName',
      address: 'address',
      clubColors: 'clubColors',
      crestUrl: 'cres.url',
      email: 'e@mail.com',
      founded: 'founded',
      phone: 'phone',
      venue: 'venue',
      website: 'website',
    })
  );

  expect(club.id).toEqual(1);
});

test('Guardar un club existente actualiza los valores', () => {
  const repository = new ClubRepository(mockDb);
  let club = repository.save(
    new Club({
      name: 'name',
      tla: 'tla',
      shortName: 'shortName',
      address: 'address',
      clubColors: 'clubColors',
      crestUrl: 'cres.url',
      email: 'e@mail.com',
      founded: 'founded',
      phone: 'phone',
      venue: 'venue',
      website: 'website',
    })
  );

  expect(club.id).toEqual(1);

  club = repository.save(
    new Club({
      id: 1,
      name: 'name actualizado',
      tla: 'tla',
      shortName: 'shortName',
      address: 'address',
      clubColors: 'clubColors',
      crestUrl: 'cres.url',
      email: 'e@mail.com',
      founded: 'founded',
      phone: 'phone',
      venue: 'venue',
      website: 'website',
    })
  );

  expect(club.id).toEqual(1);
  expect(club.name).toEqual('name actualizado');
});

test('Guardar un club con id que no existe da error', () => {
  const repository = new ClubRepository(mockDb);

  expect(() => {
    repository.save(
      new Club({
        id: 1,
        name: 'name actualizado',
        tla: 'tla',
        shortName: 'shortName',
        address: 'address',
        clubColors: 'clubColors',
        crestUrl: 'cres.url',
        email: 'e@mail.com',
        founded: 'founded',
        phone: 'phone',
        venue: 'venue',
        website: 'website',
      })
    );
  }).toThrowError(ClubNotFoundError);
});

test('Buscar un club con id que no existe da error', () => {
  const repository = new ClubRepository(mockDb);
  expect(() => {
    repository.getById(1);
  }).toThrowError(ClubNotFoundError);
});

test('Buscar un club por id devuelve el club adecuado', () => {
  const repository = new ClubRepository(mockDb);
  const nuevoClub = repository.save(
    new Club({
      name: 'name',
      tla: 'tla',
      shortName: 'shortName',
      address: 'address',
      clubColors: 'clubColors',
      crestUrl: 'cres.url',
      email: 'e@mail.com',
      founded: 'founded',
      phone: 'phone',
      venue: 'venue',
      website: 'website',
    })
  );

  expect(nuevoClub.id).toEqual(1);

  const club = repository.getById(nuevoClub.id);
  expect(club).toEqual(nuevoClub);
});

test('Eliminar club elimina un club existente', () => {
  const repository = new ClubRepository(mockDb);
  const nuevoClub = repository.save(
    new Club({
      name: 'name',
      tla: 'tla',
      shortName: 'shortName',
      address: 'address',
      clubColors: 'clubColors',
      crestUrl: 'cres.url',
      email: 'e@mail.com',
      founded: 'founded',
      phone: 'phone',
      venue: 'venue',
      website: 'website',
    })
  );

  expect(nuevoClub.id).toEqual(1);
  expect(repository.delete(nuevoClub)).toBe(true);
  expect(() => {
    repository.getById(1);
  }).toThrow(ClubNotFoundError);
});

test('Eliminar club sin un id da error', () => {
  const repository = new ClubRepository(mockDb);
  expect(() => {
    repository.delete({});
  }).toThrow(ClubIdNotDefinedError);
});

test('Otener todos los clubes devuelve un array de entidad Club', () => {
  const repository = new ClubRepository(mockDb);
  expect(repository.getAll()).toEqual([]);

  const nuevoClub1 = repository.save(
    new Club({
      name: 'name',
      tla: 'tla',
      shortName: 'shortName',
      address: 'address',
      clubColors: 'clubColors',
      crestUrl: 'cres.url',
      email: 'e@mail.com',
      founded: 'founded',
      phone: 'phone',
      venue: 'venue',
      website: 'website',
    })
  );

  const nuevoClub2 = repository.save(
    new Club({
      name: 'name',
      tla: 'tla',
      shortName: 'shortName',
      address: 'address',
      clubColors: 'clubColors',
      crestUrl: 'cres.url',
      email: 'e@mail.com',
      founded: 'founded',
      phone: 'phone',
      venue: 'venue',
      website: 'website',
    })
  );
  expect(repository.getAll()).toEqual([nuevoClub1, nuevoClub2]);
});
