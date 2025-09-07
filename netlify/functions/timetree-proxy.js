const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { path } = event.queryStringParameters;
  const timetreeApiUrl = `https://timetreeapp.com${path}`;

  try {
    const response = await fetch(timetreeApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-timetreea': 'web/2.1.0/ja'
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: `Error from TimeTree: ${response.statusText}`,
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: 'Serverless function error' };
  }
};