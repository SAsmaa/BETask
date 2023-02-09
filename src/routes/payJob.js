const { sequelize } = require('../model')

const hasBalance = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const [results, metadata] = await sequelize.query(
      "select count(*),c.ClientId,c.ContractorId,j.id,j.price,p.firstName,p.balance from jobs j , Contracts c,"
      + " Profiles p where j.ContractId = c.id and c.ClientId = p.id and j.id =" + req.params.job_id
      + " and p.balance >= j.price and j.paid is NULL"
    )

    if (!results[0].ClientId) return res.status(401).send("Not Enough Balance or Job already paid")
    req.result = results
    await t.commit();
  }
  catch (error) {
    console.log(error)
  }
  next()
}
//******* update contractor balance */
const creditContrBalance = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const [results, metadata] = await sequelize.query(
      "update Profiles  set balance = balance + " + req.result[0].price + " where id = " + req.result[0].ContractorId
    ).catch(function (err) {
      console.log(err)
      return res.status(501).end;
    });
    console.log("credit contractor id " + req.result[0].ContractorId + "with amount = " + req.result[0].price)
    await t.commit();
  }
  catch (error) {
    console.log(error)
    await t.rollback();
  }
  next()
}

//************* update client balance  */
const debitClientBalance = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const clientBalance = req.result[0].balance - req.result[0].price;

    const [results, metadata] = await sequelize.query(
      "update Profiles set balance =" + clientBalance + " where id = " + req.result[0].ClientId
    ).catch(function (err) {
      console.log(err)
      return res.status(501).end;
    });

    console.log("debit client id = " + req.result[0].ClientId + " with amount =" + req.result[0].price)
    await t.commit();
  } catch (error) {
    console.log(error)
    await t.rollback();
  }
  next()
}

// ******** convert paid flag to 1
const updateJob = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const [results, metadata] = await sequelize.query(
      "update jobs set paid = 1,paymentDate = datetime('now') where id = " + req.result[0].id
    ).catch(function (err) {
      console.log(err)
      return res.status(501).end;
    });

    console.log(metadata)
    console.log("update job id = " + req.result[0].id + " to paid ")
    await t.commit();
  } catch (error) {
    console.log(error)
    await t.rollback();
  }
  next()
}

module.exports = {
  hasBalance,
  creditContrBalance,
  debitClientBalance,
  updateJob
}