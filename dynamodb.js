const DynamoDB = require('aws-sdk/clients/dynamodb');

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyemail: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET'
  };
}

const documentClient = new DynamoDB.DocumentClient(options);

const Dynamo = {
  async get (email, TableName) {
    const params = {
      TableName,
      Key: {
        email,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(`There was an error fetching the data for email of ${email} from ${TableName}`);
    }
    console.log(data);

    return data.Item;
  },

  async write (data, TableName) {
    if (!data.email) {
      throw Error('no email on the data');
    }

    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(`There was an error inserting email of ${data.email} in table ${TableName}`);
    }

    return data;
  },
};
module.exports = Dynamo;


