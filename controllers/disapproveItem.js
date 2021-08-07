const handleDisApproveItem = (req, res, knex) => {
  const { id } = req.params;
  console.log("DISAPPPROVE", id);
  knex("product")
    .where("id", id)
    .update({ status: "not_approved" })
    .returning("*")
    .then((prod) => {
      res.json(prod);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  handleDisApproveItem: handleDisApproveItem,
};
