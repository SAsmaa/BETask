const {sequelize} = require('../model')

const getUnpaidJobs = async (req, res) => {
    const [results, metadata] = await sequelize.query(
        "SELECT * FROM Jobs j JOIN Contracts c ON j.ContractId = c.id and c.status = 'in_progress' and j.paid is NULL"
      );
    if(!results) return res.status(401).end()
    res.json (results)
}
module.exports = {getUnpaidJobs}