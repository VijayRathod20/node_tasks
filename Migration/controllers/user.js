const getUser = async (req, res) => {
  res.send("this is user one");
};

const testUser = async (req, res) => {
  res.send("test User");
};

module.exports = { getUser ,testUser};
