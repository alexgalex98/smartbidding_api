const handleOnTimeExpired = (req, res, knex) => {
  const { item } = req.params;
  console.log("INTRARE ON EXPIRED", req.params);
  knex("product")
    .select("secondsleft")
    .where({ id: item })
    .then((prod) => {
      //res.json(prod);
      console.log(prod[0].secondsleft, "1");
      if (prod[0].secondsleft == 0) {
        knex("item_user")
          .select()
          .where({ id_item: item })
          .then((exist) => {
            // console.log(exist[0].price);
            if (exist[0]) {
              //console.log(exist, "EXIST");
              knex("item_user")
                .select("price", "id_user")
                .orderBy("price", "desc")
                .where({ id_item: item })
                .limit(1)
                .then((price) => {
                  if (price) {
                    //res.json(price);
                    console.log(price[0].id_user, "USER");
                    knex("buy_item")
                      .insert({
                        id_user: price[0].id_user,
                        id_item: item,
                      })
                      .then(() => {
                        knex("product")
                          .where("id", item)
                          .update({ status: "sold" })
                          .then((product) => {
                            res.json({ product });
                          });
                      });
                  } else {
                    console.log("NO BID");
                  }
                });
            } else {
              console.log("NOO EXIST");
              knex("product")
                .where("id", item)
                .update({ status: "expired" })
                .then((product) => {
                  console.log(product);
                  res.json({ product });
                });
            }
          });
      } else {
        console.log("NIEE");
      }
    });
};
module.exports = {
  handleOnTimeExpired: handleOnTimeExpired,
};
