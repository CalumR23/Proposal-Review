exports.loginAuth = (req, res, next)=> {
  if (req.user) {
    next();
  } else {
    let err = new Error("NOT SIGNED IN");
    err.status = 404;
    next(err);
  }
}
