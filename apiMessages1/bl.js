import { run } from './dal.js';
import crypto from 'crypto';
import { logger } from './logger.js';
import pkg from 'moment';
const  moment = pkg;

export const getListOfMessages = async (fromName, toName, createdAt, order, res) => {

    let sql = 'SELECT * FROM MESSAGES';
    // concat the params from client
    let paramsArr = [fromName, toName, createdAt]
    let fieldsArr = ['From_name', 'To_Name', 'Created_at'];
    if (!paramsArr.every((val, i, arr) => val === arr[0])) {
        sql += ' where'
        let ifAnd
        for (let i = 0; i < 3; i++) {
            if (paramsArr[i] != undefined) {
                console.log(111);
                if (ifAnd) {
                    sql += ' AND';
                    ifAnd = false;
                }
                sql += ` ${fieldsArr[i]} = '${paramsArr[i]}'`
                ifAnd = true;
            }
        }
    }

    if (!order || order != "Key" && order != "From_name" && order != "To_name" && order != "Message" && order != "Created_at" && order != "Updated_at") {
        order = 'Id'
    }
    sql += ` ORDER BY ${order}`

    let result;

    try {
        await run(sql, (res) => { result = res; });
        return result;
    }
    catch (err) {
        logger.error('The get faild');
        return res.status(500).json({ 'The get faild': err })
    }

};



export const addMessage = async (fromName, toName, message, res, err) => {

    let key = crypto.randomBytes(2).toString('hex');
    let created = moment().format("DD-MMMM-YYYY hh:mm:ss.mmmmmmmm");
    let updated = moment().format("DD-MMMM-YYYY hh:mm:ss.mmmmmmmm");
    const sql = `INSERT INTO MESSAGES(Key,From_name,To_name,Message,Created_at,Updated_at)VALUES('${key}','${fromName}','${toName}','${message}','${created}','${updated}')`;
    let result;
    try {
        await run(sql, (res, err) => { result = res; });
        return result;
    }
    catch (err) {
        logger.error('The post faild');
        return res.status(500).json({ 'The post faild': err })
    }
}




export const getMessageById = async (id, res) => {

    const sql = `SELECT * FROM MESSAGES WHERE Id = ${id}`;
    let result
    try {
        await run(sql, (res, err) => { result = res; });
        return result;
    }
    catch (err) {
        logger.error('The get message by id faild');
        return res.status(500).json({ 'The get message by id faild': err })
    }
}



export const deleteMessageById = async (id, res) => {
    const sql = `DELETE FROM MESSAGES WHERE Id = ${id}`;
    let result;

    try {
        await run(sql, (res/*, err*/) => { result = res; });
        return result;
    }
    catch (err) {
        logger.error('The delete faild');
        return res.status(500).json({ 'The delete faild': err })

    }

}
