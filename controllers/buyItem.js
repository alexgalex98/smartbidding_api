const handleBuyItem = (req, res, knex) => {
  const { user } = req.params;
  const { item } = req.params;
  //   console.log("body", price);
  //   console.log("bacckkk", user, item);

  knex("buy_item")
    .insert({
      id_user: user,
      id_item: item,
    })
    .then((data) => {
      return knex("product")
        .where("id", item)
        .update({ status: "sold" })
        .then((product) => {
          res.json({ product });
          console.log("PRODUCT");
        });
    });
  console.log("bought");
};

module.exports = {
  handleBuyItem: handleBuyItem,
};
