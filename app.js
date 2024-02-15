// 定義名稱
const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');
const path = require('path');
const app = express();
// 設定資料庫
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12311108',
    database: 'lc_image'
});

app.set('view engine', 'ejs'); // ejs模板
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));  // 提供靜態檔案位置
app.use('/static', express.static(__dirname + '/public')); // 設置虛擬路徑/static

// 取得資料庫資料
app.get('/', (req, res) => {
    const query = `
    SELECT ark.*, 
    CASE WHEN ark.ark_s1_type = 'skill' THEN skill1.skill_name ELSE magic1.magic_name END AS skill_name_s1,
    CASE WHEN ark.ark_s1_type = 'skill' THEN skill1.skill_image ELSE magic1.magic_image END AS skill_image_s1,
    CASE WHEN ark.ark_s1_type = 'skill' THEN skill1.skill_descript ELSE magic1.magic_descript END AS skill_descript_s1,
    CASE WHEN ark.ark_s1_type = 'skill' THEN skill1.skill_sc ELSE magic1.magic_sc END AS skill_sc_s1,
    
    CASE WHEN ark.ark_s2_type = 'skill' THEN skill2.skill_name ELSE magic2.magic_name END AS skill_name_s2,
    CASE WHEN ark.ark_s2_type = 'skill' THEN skill2.skill_image ELSE magic2.magic_image END AS skill_image_s2,
    CASE WHEN ark.ark_s2_type = 'skill' THEN skill2.skill_descript ELSE magic2.magic_descript END AS skill_descript_s2,
    CASE WHEN ark.ark_s2_type = 'skill' THEN skill2.skill_sc ELSE magic2.magic_sc END AS skill_sc_s2,
    
    CASE WHEN ark.ark_s3_type = 'skill' THEN skill3.skill_name ELSE magic3.magic_name END AS skill_name_s3,
    CASE WHEN ark.ark_s3_type = 'skill' THEN skill3.skill_image ELSE magic3.magic_image END AS skill_image_s3,
    CASE WHEN ark.ark_s3_type = 'skill' THEN skill3.skill_descript ELSE magic3.magic_descript END AS skill_descript_s3,
    CASE WHEN ark.ark_s3_type = 'skill' THEN skill3.skill_sc ELSE magic3.magic_sc END AS skill_sc_s3,
    
    CASE WHEN ark.ark_s4_type = 'skill' THEN skill4.skill_name ELSE magic4.magic_name END AS skill_name_s4,
    CASE WHEN ark.ark_s4_type = 'skill' THEN skill4.skill_image ELSE magic4.magic_image END AS skill_image_s4,
    CASE WHEN ark.ark_s4_type = 'skill' THEN skill4.skill_descript ELSE magic4.magic_descript END AS skill_descript_s4,
    CASE WHEN ark.ark_s4_type = 'skill' THEN skill4.skill_sc ELSE magic4.magic_sc END AS skill_sc_s4,
    
    CASE WHEN ark.ark_s5_type = 'skill' THEN skill5.skill_name ELSE magic5.magic_name END AS skill_name_s5,
    CASE WHEN ark.ark_s5_type = 'skill' THEN skill5.skill_image ELSE magic5.magic_image END AS skill_image_s5,
    CASE WHEN ark.ark_s5_type = 'skill' THEN skill5.skill_descript ELSE magic5.magic_descript END AS skill_descript_s5,
    CASE WHEN ark.ark_s5_type = 'skill' THEN skill5.skill_sc ELSE magic5.magic_sc END AS skill_sc_s5,
    
    CASE WHEN ark.ark_s6_type = 'skill' THEN skill6.skill_name ELSE magic6.magic_name END AS skill_name_s6,
    CASE WHEN ark.ark_s6_type = 'skill' THEN skill6.skill_image ELSE magic6.magic_image END AS skill_image_s6,
    CASE WHEN ark.ark_s6_type = 'skill' THEN skill6.skill_descript ELSE magic6.magic_descript END AS skill_descript_s6,
    CASE WHEN ark.ark_s6_type = 'skill' THEN skill6.skill_sc ELSE magic6.magic_sc END AS skill_sc_s6
FROM ark
LEFT JOIN skill AS skill1 ON ark.ark_s1 = skill1.skill_id AND ark.ark_s1_type = 'skill'
LEFT JOIN magic AS magic1 ON ark.ark_s1 = magic1.magic_id AND ark.ark_s1_type = 'magic'

LEFT JOIN skill AS skill2 ON ark.ark_s2 = skill2.skill_id AND ark.ark_s2_type = 'skill'
LEFT JOIN magic AS magic2 ON ark.ark_s2 = magic2.magic_id AND ark.ark_s2_type = 'magic'

LEFT JOIN skill AS skill3 ON ark.ark_s3 = skill3.skill_id AND ark.ark_s3_type = 'skill'
LEFT JOIN magic AS magic3 ON ark.ark_s3 = magic3.magic_id AND ark.ark_s3_type = 'magic'

LEFT JOIN skill AS skill4 ON ark.ark_s4 = skill4.skill_id AND ark.ark_s4_type = 'skill'
LEFT JOIN magic AS magic4 ON ark.ark_s4 = magic4.magic_id AND ark.ark_s4_type = 'magic'

LEFT JOIN skill AS skill5 ON ark.ark_s5 = skill5.skill_id AND ark.ark_s5_type = 'skill'
LEFT JOIN magic AS magic5 ON ark.ark_s5 = magic5.magic_id AND ark.ark_s5_type = 'magic'

LEFT JOIN skill AS skill6 ON ark.ark_s6 = skill6.skill_id AND ark.ark_s6_type = 'skill'
LEFT JOIN magic AS magic6 ON ark.ark_s6 = magic6.magic_id AND ark.ark_s6_type = 'magic';
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('資料庫錯誤', err);
            return res.status(500).send('伺服器錯誤');
        }
        res.render('index', { images: results });
    });
});

app.listen(3000, () => {
    console.log('伺服器運行在 http://localhost:3000/');
});