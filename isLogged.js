module.exports = IsLogged = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(403).json('you must be signed in first')
    }
    next();
}

