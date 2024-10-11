import dotenv from 'dotenv';

dotenv.config();

import { MongoConn } from './conn';
import { logError, logInfo } from './logger';

const start = async () => {
  const sourceUrl = process.env.SOURCE_URL;
  const sourceDbname = process.env.SOURCE_DBNAME;
  const sourceColl = process.env.SOURCE_COLL;
  const targetUrl = process.env.TARGET_URL;
  const targetDbname = process.env.TARGET_DBNAME;
  const targetColl = process.env.TARGET_COLL;

  logInfo(
    'Checking args',
    `sourceUrl: ${!!sourceUrl}
      sourceDbname: ${!!sourceDbname}
      targetUrl: ${!!targetUrl}
      targetDbname: ${!!targetDbname}
      sourceColl: ${!!sourceColl}
      targetColl: ${!!targetColl}`
  );

  if (!sourceUrl || !sourceDbname || !targetUrl || !targetDbname || !sourceColl || !targetColl) {
    throw new Error(`Missing source and target parameters: 
      sourceUrl: ${!!sourceUrl}
      sourceDbname: ${!!sourceDbname}
      targetUrl: ${!!targetUrl}
      targetDbname: ${!!targetDbname}
      sourceColl: ${!!sourceColl}
      targetColl: ${!!targetColl}`);
  }
  const mongoSource = await MongoConn.getMongoConnection(sourceUrl, sourceDbname);
  const mongoTarget = await MongoConn.getMongoConnection(targetUrl, targetDbname);

  const sourceReadStream = mongoSource.getReadStream(sourceColl);

  let count = 0;
  sourceReadStream.on('data', async data => {
    ++count;
    logInfo('Processing', `${count}`, data._id);
    await mongoTarget.writeData(data, targetColl);
  });

  return new Promise((resolve, reject) => {
    sourceReadStream.on('end', () => {
      logInfo('Finished', `${count}`);
      resolve(count);
    });

    sourceReadStream.on('error', error => {
      logError(`${error}`);
      reject(error);
    });
  });
};

start()
  .then(() => logInfo('Done!'))
  .catch(logError)
  .finally(() => logInfo('Final'));
