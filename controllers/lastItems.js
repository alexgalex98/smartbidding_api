const handleLastItems = (req, res, knex) => {
  console.log("NEWEST");
  return knex
    .select()
    .from("product")
    .where("product.secondsleft", ">", 0)
    .orderBy("created", "desc")
    .limit(6)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("No data");
    });
};

module.exports = {
  handleLastItems: handleLastItems,
};
