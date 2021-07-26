const handleItem=(req,res,knex)=>{
    const{id}=req.params;
    let found=false;
    knex.select().from('product').where({id})
    .then(prod=>{
        if(prod.length){
            res.json(prod[0])
        }else{
            res.status(400).json('NOT FOUND')
        }
    })
    .catch(err=>res.status(400).json('error getting product'))
}

module.exports={
    handleItem: handleItem
}