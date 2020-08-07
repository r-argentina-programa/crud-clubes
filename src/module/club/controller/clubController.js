const { fromDataToEntity } = require('../mapper/clubMapper');
const ClubIdNotDefinedError = require('./error/clubIdNotDefinedError');
const AbstractController = require('../../abstractController');

module.exports = class ClubController extends AbstractController {
  /**
   * @param {import('../service/clubService')} clubService
   */
  constructor(uploadMiddleware, clubService) {
    super();
    this.ROUTE_BASE = '/club';
    this.uploadMiddleware = uploadMiddleware;
    this.clubService = clubService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    // Nota: el `bind` es necesario porque estamos atando el callback a una función miembro de esta clase
    // y no a la clase en si.
    // Al hacer `bind` nos aseguramos que "this" dentro de `create` sea el controlador.
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.uploadMiddleware.single('crest-url'), this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
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
  async view(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new ClubIdNotDefinedError();
    }

    try {
      const club = await this.clubService.getById(id);
      res.render('club/view/form.html', { data: { club } });
    } catch (e) {
      req.session.errors = [e.message, e.stack];
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
      if (req.file) {
        const { path } = req.file;
        club.crestUrl = path;
      }
      const savedClub = await this.clubService.save(club);
      if (club.id) {
        req.session.messages = [`El club con id ${club.id} se actualizó exitosamente`];
      } else {
        req.session.messages = [`Se creó el club con id ${savedClub.id} (${savedClub.name})`];
      }
      res.redirect('/club');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
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
      req.session.errors = [e.message, e.stack];
    }
    res.redirect('/club');
  }
};
