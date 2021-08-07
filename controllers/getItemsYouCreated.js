const handleGetItemsYouCreated = (req, res, knex) => {
  const { id } = req.params;
  // console.log(id, "IEEIIEI");
  knex
    .select()
    .from("product")
    .where("created_by", id)
    .then((data) => {
      if (data.length) {
        res.json(data);
      } else {
        res.status(400).json("NOT FOUND");
      }
    })
    .catch((err) => res.status(400).json("error getting product"));
};
module.exports = {
  handleGetItemsYouCreated: handleGetItemsYouCreated,
};
