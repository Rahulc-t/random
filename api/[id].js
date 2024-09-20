const MetaData =require("../Metadata.json");
module.exports=(req,res)=>{
    const {id}=req.query;
    res.json(JSON.parse(JSON.stringify(MetaData[id])))
}