const reqBodyExtractor = req =>
  req && isNotNull(req.body) ? { ...req.body } : null;

module.exports = { reqBodyExtractor };
