const getBids = require("./getBids");

const handleBidForItem = (req, res, knex) => {
  const { user } = req.params;
  const { item } = req.params;
  const { price } = req.body;
  console.log("body", price);
  console.log("bacckkk", user, item);
  knex
    .select()
    .from("item_user")
    .where("id_user", user)
    .where("id_item", item)
    .then((bid) => {
      if (bid.length) {
        console.log(bid[0].price);
        knex("item_user")
          .where("id_user", user)
          .where("id_item", item)
          .update({ price: price })
          .returning("price")
          .then(() => {
            // res.json({ price });
            console.log("UPDATE PRODUCT");
            console.log(item, price);
            return knex("product")
              .where("id", item)
              .update({ currentprice: price });
          });
        console.log("update");
      } else {
        knex("item_user")
          .insert({
            id_user: user,
            id_item: item,
            price: price,
          })
          .then(() => {
            // res.json({ price });
            return knex("product")
              .where("id", item)
              .update({ currentprice: price });
          });
        console.log("insert");
      }
    });
};

module.exports = {
  handleBidForItem: handleBidForItem,
};
