import fetch from "node-fetch";

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const params = JSON.parse(event.body);

    console.log(params);
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 200,
    body: "OK"
  };
};
