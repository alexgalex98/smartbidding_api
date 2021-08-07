const handleNewBid = (req, res, knex) => {
  console.log("BACKEND");
  const {
    name,
    category,
    description,
    condition,
    startPrice,
    buyNowPrice,
    bidDuration,
    image,
    created_by,
  } = req.body;
  if (
    !name ||
    !category ||
    !description ||
    !condition ||
    !startPrice ||
    !buyNowPrice ||
    !bidDuration ||
    !image ||
    !created_by
  ) {
    return res.status(400).json("incorrect form submission");
    console.log("jdnf");
  }
  // knex.transaction(trx=>{
  //     trx.insert({
  //         prodname: name,
  //         category: category,
  //         startprice: startPrice,
  //         buynowprice: buyNowPrice,
  //         description: description,
  //         condition_: condition,
  //         secondsleft: bidDuration,
  //         image: 'images/philips1.jpg'
  //     })
  //     .into('product')
  //     .returning('name')
  //     .then(trx.commit)
  //     .catch(trx.rollback)
  // })
  knex("product")
    .insert(
      {
        prodname: name,
        category: category,
        startprice: startPrice,
        buynowprice: buyNowPrice,
        description: description,
        condition_: condition,
        secondsleft: bidDuration,
        image: image,
        created_by: created_by,
        status: "pending",
      },
      "prodname"
    )
    .then((productName) => {
      res.json({ productName });
    })
    .catch((err) => res.status(400).json("Unable to add into DB"));
  console.log("pulaf");
};

module.exports = {
  handleNewBid: handleNewBid,
};
