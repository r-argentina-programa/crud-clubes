const { fromDataToEntity } = require('../mapper/areaMapper');
const AreaIdNotDefinedError = require('./error/areaIdNotDefinedError');
const AbstractController = require('../../abstractController');

module.exports = class AreaController extends AbstractController {
  /**
   * @param {import('../service/areaService')} areaService
   */
  constructor(areaService) {
    super();
    this.areaService = areaService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = '/area';

    // Nota: el `bind` es necesario porque estamos atando el callback a una función miembro de esta clase
    // y no a la clase en si.
    // Al hacer `bind` nos aseguramos que "this" dentro de `create` sea el controlador.
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const areas = await this.areaService.getAll();
    const { errors, messages } = req.session;
    res.render('area/view/index.html', { data: { areas }, messages, errors });
    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async create(req, res) {
    res.render('area/view/form.html');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new AreaIdNotDefinedError();
    }

    try {
      const area = await this.areaService.getById(id);
      res.render('area/view/form.html', { data: { area } });
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/area');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    try {
      const area = fromDataToEntity(req.body);
      const savedArea = await this.areaService.save(area);
      if (area.id) {
        req.session.messages = [`El area con id ${area.id} se actualizó exitosamente`];
      } else {
        req.session.messages = [`Se creó el area con id ${savedArea.id} (${savedArea.name})`];
      }
      res.redirect('/area');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/area');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const area = await this.areaService.getById(id);
      await this.areaService.delete(area);
      req.session.messages = [`Se eliminó el area ID: ${id} (${area.name})`];
    } catch (e) {
      req.session.errors = [e.message];
    }
    res.redirect('/area');
  }
};
