const {Sequelize} = require("sequelize");

const {sequelize} = require('../model')

const getBestClient = async (req, res) => {
    const [results, metadata] = await sequelize.query(
        "SELECT p.id,(p.firstName || ' ' || p.lastName) as fullName,p.profession as profession, sum(price) as total"
       + " FROM Jobs j, Contracts c,Profiles p "
       +"where j.paymentDate between "+ req.params.start+ " AND " + req.params.end 
       + " and  p.id = c.ClientId "
       +"and j.ContractId = c.id and j.paid = 1 group by ContractId order by total desc limit " + 
       req.params.limit || 2
      );
    if(!results) return res.status(401).end()
    res.json (results)
}
module.exports = {getBestClient}