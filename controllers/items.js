const handleItems = (req, res, knex) => {
  console.log("MILL1");
  return knex
    .select()
    .from("product")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("No data");
    });
};

module.exports = {
  handleItems: handleItems,
};
