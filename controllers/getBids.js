const handleGetBids=(req,res,knex)=>{
    const {id}=req.params
    knex.select('name','price').from('item_user')
    .join('users','item_user.id_user','users.id')
    .where('item_user.id_item',id)
    .then(bid=>{
        if(bid.length){
            res.json(bid)
        
        }else{
            res.status(400).json('NOT FOUND')
        }
    })
    .catch(err=>res.status(400).json('error getting product'))
}
module.exports={
    handleGetBids: handleGetBids
}