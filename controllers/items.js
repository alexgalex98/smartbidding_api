const handleItems=(req,res,knex)=>{
    return knex.select().from('product').then(data=>{
            res.json(data)
    })
}

module.exports={
    handleItems: handleItems
}