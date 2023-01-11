const {exec} = require('../databse/mysql')
const saveImage = async (imageData) => {
    console.log("imageData", imageData)
    let sql = `insert into images(createtime, image) VALUES(
        '${new Date().getTime()}',
        '${imageData.files}'
    )`
    const insertData = await exec(sql)
    console.log("insertData.insertId", insertData.insertId)
    return {
        id: insertData.insertId
    }
}

module.exports = {
    saveImage
}