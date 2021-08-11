const handleWonItems = (req, res, knex) => {
  const { id } = req.params;
  console.log("WON ITEMS");
  knex
    .select()
    .from("product")
    .join("buy_item", "buy_item.id_item", "product.id")
    .where({ "product.status": "sold", "buy_item.id_user": id })
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
  handleWonItems: handleWonItems,
};
