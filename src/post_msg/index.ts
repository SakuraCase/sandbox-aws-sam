import {APIGatewayEvent, Context, Callback} from 'aws-lambda';
import { RDSDataService } from 'aws-sdk';
import { ExecuteStatementRequest } from 'aws-sdk/clients/rdsdataservice';

import localConfigure from '../localConfigure';

localConfigure();
export async function handler(event: APIGatewayEvent, context: Context, callback: Callback) {
  let body = '';
  if (event.body) {
    body = event.body;
  }
  const insertRecord= JSON.parse(body);

  const success = await postMessage(insertRecord);
  if (success) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(insertRecord)
    });
  } else {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: 'internal server error'
      })
    });
  }
};

async function postMessage(record: {contents: string}): Promise<RDSDataService.ExecuteStatementResponse> {
  const params: ExecuteStatementRequest = {
    resourceArn: process.env.RESOURCE_ARN ?? '',
    secretArn: process.env.SECRET_ARN ?? '',
    database: "test",
    sql: `INSERT INTO message (contents) values (:contents)`,
    parameters: [
      {
        name: 'contents',
        value: {
          "stringValue": record.contents
        }
      }
    ],
  };
  var rdsdataservice = new RDSDataService();
  return rdsdataservice.executeStatement(params).promise();
}
