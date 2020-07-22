const { fromDataToEntity } = require('../mapper/clubMapper');

module.exports = class ClubController {
  /**
   * @param {import('../service/clubService')} clubService
   */
  constructor(clubService) {
    this.clubService = clubService;
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const clubs = await this.clubService.getAll();
    res.render('club/view/index.html', { data: { clubs } });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  view(req, res) {
    res.render('club/view/form.html');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    try {
      await this.clubService.save(fromDataToEntity(req.body));
      res.redirect('/club');
    } catch (e) {
      console.error(e);
      res.end();
      // res.render('club/view/form.html', { error: e });
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  delete(req, res) {
    this.clubService.delete(req.body.id);
    res.redirect('/club');
  }
};
