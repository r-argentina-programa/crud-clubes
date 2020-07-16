class ClubController {
  constructor(clubService) {
    this.clubService = clubService;
  }

  index(req, res) {
    res.render('club/view/index.njk', { nombre: 'test' });
  }

  create(req, res) {}

  update(req, res) {}

  delete(req, res) {}
}

module.exports = ClubController;
