const authenticate = () => (req, res, next) => {
  console.log("Abey chal na havee chaapli...");
  next();
};

module.exports = authenticate;
