const handleSimilarItems = (req, res, knex) => {
  const { id } = req.params;
  console.log("WON ITEMS");
  const subquery = knex("product").select("category").where({ id: id });
  knex
    .select()
    .from("product")
    .where({ category: subquery })
    .whereNot({ id: id })
    .then((prod) => {
      if (prod.length) {
        res.json(prod);
      } else {
        res.status(400).json("NOT FOUND");
      }
    })
    .catch((err) => res.status(400).json("error getting product"));
};
module.exports = {
  handleSimilarItems: handleSimilarItems,
};
