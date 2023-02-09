const { Op } = require("sequelize");
const { sequelize } = require('../model')

const getContracts = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { Contract } = req.app.get('models')
        const contract = await Contract.findAll({ where: { status: { [Op.notLike]: 'terminated', } } })
        if (!contract) return res.status(401).end()
        res.json(contract)
        await t.commit();
    }
    catch (error) {
        console.log(error)
        await t.rollback();
    }
}
module.exports = { getContracts }