const handleMostPopularItems = (req, res, knex) => {
  console.log("MOSTPOPULAR");
  return knex
    .select(
      "id_item",
      "prodname",
      "category",
      "startprice",
      "buynowprice",
      "description",
      "condition_",
      "secondsleft",
      "image",
      "created_by",
      "status",
      "currentprice",
      "created"
    )
    .from("product")
    .count("id_item")
    .join("item_user", "product.id", "item_user.id_item")
    .groupBy(
      "id_item",
      "product.prodname",
      "product.category",
      "product.description",
      "product.startprice",
      "product.buynowprice",
      "product.condition_",
      "product.secondsleft",
      "product.image",
      "product.status",
      "product.currentprice",
      "product.created",
      "product.created_by"
    )
    .where("product.secondsleft", ">", 0)
    .where("status", "approved")
    .orderBy("count", "desc")
    .limit(6)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("No data");
    });
};

module.exports = {
  handleMostPopularItems: handleMostPopularItems,
};
