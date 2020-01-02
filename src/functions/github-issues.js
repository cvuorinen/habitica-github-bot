import fetch from "node-fetch";

// Aspiring Blacksmiths (Coding For Habitica)
// https://habitica.com/groups/guild/68d4a01e-db97-4786-8ee3-05d612c5af6f
const GUILD_ID = "68d4a01e-db97-4786-8ee3-05d612c5af6f";

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const params = JSON.parse(event.body);

    // @see https://developer.github.com/v3/activity/events/types/#issuesevent for more details about the incoming data
    if (!params || !params.action || !params.issue) {
      return { statusCode: 400, body: "Bad Request" };
    }

    if (params.action !== "labeled") {
      // nothing to do since currently only interested in labels being added
      return { statusCode: 200, body: "OK" };
    }

    if (params.label && params.label.name === "help wanted") {
      const message = `## :octocat: Help wanted

GitHub issue [#${params.issue.number}](${params.issue.html_url}) labeled with \`help wanted\`

Title: **${params.issue.title}**

Description:

${params.issue.body}


${params.issue.html_url}
`;
      await postMessage(message);
    }

    console.log(params);
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 200,
    body: "OK"
  };
};

async function postMessage(message) {
  const url = `${process.env.HABITICA_API_URL}/groups/${GUILD_ID}/chat`;
  const options = {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // X-Client header as per instructions here: https://habitica.fandom.com/wiki/Guidance_for_Comrades#X-Client_Header
      "x-client": process.env.HABITICA_X_CLIENT,
      "x-api-user": process.env.HABITICA_USER_ID,
      "x-api-key": process.env.HABITICA_API_KEY
    }
  };

  return fetchJson(url, options);
}

async function fetchJson(url, options) {
  //console.log("fetch", { url, options });
  const response = await fetch(url, options);

  if (!response.ok) {
    throw Error(
      `${response.status} ${response.statusText} "${await response.text()}"`
    );
  }

  return response.json();
}
