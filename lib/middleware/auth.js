const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
  const token = req.header('x-auth-token');
  if(!token){
    return res.status(401).json({status:"unauthorized access"});
  }

  try{
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.body.user = decoded.user;
    next();
  } catch(err){
    console.log({err});
    return res.status(401).json({status:err});
  }

}
