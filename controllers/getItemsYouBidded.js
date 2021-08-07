const handleGetItemsYouBidded = (req, res, knex) => {
  const { id } = req.params;
  console.log("ONBIDDED");
  knex
    .select()
    .from("item_user")
    .join("product", "item_user.id_item", "product.id")
    .where("id_user", id)
    .then((bid) => {
      if (bid.length) {
        res.json(bid);
      } else {
        res.status(400).json("NOT FOUND");
      }
    })
    .catch((err) => res.status(400).json("error getting product"));
};
module.exports = {
  handleGetItemsYouBidded: handleGetItemsYouBidded,
};
