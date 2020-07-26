module.exports = class AbstractController {
  getSessionErrors(session) {
    return Array.isArray(session.errors) ? session.errors : [];
  }
};
