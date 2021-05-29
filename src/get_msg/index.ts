import { RDSDataService } from 'aws-sdk';
import {APIGatewayEvent, Context, Callback} from 'aws-lambda';
import { ExecuteStatementRequest } from 'aws-sdk/clients/rdsdataservice';

import localConfigure from '../localConfigure';

localConfigure();
export async function handler(event: APIGatewayEvent, context: Context, callback: Callback) {
  let id: string = '';
  if (event.pathParameters) {
    id = event.pathParameters.id ?? '';
  }
  const message = await getMessage(id);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(message)
  });
};

async function getMessage(id: string): Promise<RDSDataService.ExecuteStatementResponse> {
  const params: ExecuteStatementRequest = {
    resourceArn: process.env.RESOURCE_ARN ?? '',
    secretArn: process.env.SECRET_ARN ?? '',
    database: "test",
    sql: `SELECT * FROM message WHERE id = :id`,
    parameters: [
      {
        name: 'id',
        value: {
          "stringValue": id
        }
      }
    ],
    // includeResultMetadata: true
  };
  var rdsdataservice = new RDSDataService();
  return rdsdataservice.executeStatement(params).promise();
}
