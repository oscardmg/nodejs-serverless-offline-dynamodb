const Dymano = require('./dynamodb');
const Responses = require('./responses');

const tableName = process.env.USERS_TABLE;

module.exports.createUser = async function createUser (event) {
  try {
    const { email } = JSON.parse(event.body);


    await Dymano.write({ email }, tableName);


    return Responses._200({ success: true });
  } catch (err) {
    console.error(err);
    return Responses._400({ success: false, error: err });
  }
}

module.exports.getUser = async function getUser (event) {
  let result = {
    success: false,
    user: null
  };
  try {

    const user = await Dymano.get(event.queryStringParameters.email, tableName);

    result.success = true;
    result.user = user;

    return Responses._200(result);
  } catch (err) {
    console.error(err);
    result.error = err.message;
    return Responses._400(result);
  }
}
