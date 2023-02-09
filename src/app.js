const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const {getContracts} = require('./routes/getContract.js')
const{getUnpaidJobs} = require('./routes/getJobs')
const{getBestProf} = require('./routes/getProfession.js')
const{getBestClient} = require('./routes/getBestClients.js')
const payJob = require('./routes/payJob')
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id',getProfile ,async (req, res) =>{
    const {Contract} = req.app.get('models')
    const {id} = req.params
    const contract = await Contract.findOne({where: {id}})
    if(!contract) return res.status(404).end()
    res.json(contract)
})

app.get('/contracts/:id' ,async (req, res,next) =>{
    const {Contract} = req.app.get('models')
    const {id} = req.params
    const contract = await Contract.findOne({where: {id}})
    if(!contract) return res.status(404).end()
    req.profile_id = contract.ClientId
    next();
},getProfile)

app.get('/contracts',getContracts )

app.get('/jobs/unpaid',getUnpaidJobs)

app.get('/admin/best-profession/:start&:end',getBestProf)

app.get('/admin/best-clients/:start&:end&:limit',getBestClient)

app.post('/jobs/:job_id/pay',[payJob.hasBalance,payJob.creditContrBalance,payJob.debitClientBalance,payJob.updateJob], async(req,res) =>{
    res.send("Paid Successfully")
} )

module.exports = app;
