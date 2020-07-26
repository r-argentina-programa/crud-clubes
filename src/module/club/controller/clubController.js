const { fromDataToEntity } = require('../mapper/clubMapper');
const ClubIdNotDefinedError = require('./error/clubIdNotDefinedError');
const AbstractController = require('../../abstractController');

module.exports = class ClubController extends AbstractController {
  /**
   * @param {import('../service/clubService')} clubService
   */
  constructor(clubService) {
    super();
    this.clubService = clubService;
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const clubs = await this.clubService.getAll();
    const { errors, messages } = req.session;
    res.render('club/view/index.html', { data: { clubs }, messages, errors });
    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async create(req, res) {
    res.render('club/view/form.html');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async edit(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new ClubIdNotDefinedError();
    }

    try {
      const club = await this.clubService.getById(id);
      res.render('club/view/form.html', { data: { club } });
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/club');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    try {
      const club = fromDataToEntity(req.body);
      const savedClub = await this.clubService.save(club);
      if (club.id) {
        req.session.messages = [`El club con id ${club.id} se actualizó exitosamente`];
      } else {
        req.session.messages = [`Se creó el club con id ${savedClub.id} (${savedClub.name})`];
      }
      res.redirect('/club');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/club');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const club = await this.clubService.getById(id);
      await this.clubService.delete(club);
      req.session.messages = [`Se eliminó el club ID: ${id} (${club.name})`];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/club');
  }
};
