const handleApproveItem = (req, res, knex) => {
  const { id } = req.params;
  console.log(id);
  // knex("product").where(id, 1).update({ status: "hi@example.com" });
  knex("product")
    .where("id", id)
    .update({ status: "approved" })
    .returning("*")
    .then((prod) => {
      res.json(prod);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  handleApproveItem: handleApproveItem,
};
