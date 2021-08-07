const handleUpdateItem = (req, res, knex) => {
  const { id } = req.params;
  const {
    prodname,
    category,
    startprice,
    buynowprice,
    description,
    condition,
    secondsleft,
  } = req.body;
  console.log(id, "UPDATEEEE");
  // knex("product").where(id, 1).update({ status: "hi@example.com" });
  knex("product")
    .where("id", id)
    .update({
      prodname: prodname,
      category: category,
      startprice: startprice,
      buynowprice: buynowprice,
      description: description,
      condition_: condition,
      secondsleft: secondsleft,
    })
    .returning("*")
    .then((prod) => {
      res.json(prod);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  handleUpdateItem: handleUpdateItem,
};
