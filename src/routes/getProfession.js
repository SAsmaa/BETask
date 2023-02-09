const {sequelize} = require('../model')

const getBestProf = async (req, res) => {
    const [results, metadata] = await sequelize.query(
        "select profession,max(total) from (SELECT p.profession as profession, sum(price) as total FROM Jobs j, Contracts c,Profiles p where j.paymentDate between " + req.params.start+" and "+ req.params.end + " and p.id = c.ContractorId and j.ContractId = c.id and j.paid = 1 group by ContractId)"
      );
    if(!results) return res.status(401).end()
    res.json (results)
}
module.exports = {getBestProf}