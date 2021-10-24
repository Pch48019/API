import oracledb from 'oracledb';
import dotenv from 'dotenv';
import { logger } from './logger.js';

let flag = false;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
dotenv.config()
  
export const run = async (sql, res) => {

  console.log("sql DAL:", sql);

  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.USER,
      password: process.env.PASSWORD,
      connectionString: process.env.CONNECTIONSTRING
    });
    try{
    const result = await connection.execute(sql, [], { outFormat: oracledb.OBJECT, autoCommit: true })
    return res(result);
    }
    catch(err){
      logger.error(err.status);
      return err.status
    }

  } catch (err) {
    logger.error(err);
    return res(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        logger.error(err);
      }
    }
  }
}


