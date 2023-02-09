# BETask

this api is not implemented
. **_POST_** `/balances/deposit/:userId` 
should be the same as other post api

for unit tests no enough time to write.


according to this point to fix this one
**_GET_** `/contracts/:id`

i know how but leave it also for time but the solution somthing similar to call multiple method depends on each other same as in post api i did



if you need to test: 

1.`/contracts`
http://localhost:3001/contracts


2. `/jobs/unpaid`
http://localhost:3001/jobs/unpaid


3.**_POST_** `/jobs/:job_id/pay`
using postman http://localhost:3001/jobs/6/pay
make sure the job id in request url is unpaid


4.`/admin/best-profession?start=<date>&end=<date>`
http://localhost:3001/admin/best-profession/'2020-08-16'&'2020-08-20'

2.`/admin/best-clients?start=<date>&end=<date>&limit=<integer>`
http://localhost:3001/admin/best-clients/'2020-08-16'&'2020-08-20&limit=2'

