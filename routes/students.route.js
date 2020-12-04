const express = require('express');
const router = express.Router();
const studentsModel = require('../models/students.module');

router.get('/',async (req, res) => {
    const data = await studentsModel.getAllAccounts();
    // data.forEach((account) => {
    //     bcrypt.hash('12345678',10, (e, hash) => {
    //         db.query(`UPDATE ACCOUNT_HOC_SINH SET MAT_KHAU = '${hash}' WHERE ID_HOC_SINH = '${account['ID_HOC_SINH']}'`);
    //         console.log(`insert into ACCOUNT_HOC_SINH (ID_HOC_SINH,MAT_KHAU) values ('${account['ID_HOC_SINH']}','${hash}');`)
    //     })
    // })
    res.render('students/students');
});

module.exports = router;