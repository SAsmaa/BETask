const { Op } = require("sequelize");

const getContracts = async (req, res) => {
    const {Contract} = req.app.get('models')
    const contract = await Contract.findAll({where:{status: {[Op.notLike]: 'terminated',}}} )
    if(!contract) return res.status(401).end()
    res.json (contract)
}
module.exports = {getContracts}