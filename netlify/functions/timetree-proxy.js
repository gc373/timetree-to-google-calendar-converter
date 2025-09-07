const handler = async (event) => {
  const { path } = event.queryStringParameters;
  const timetreeApiUrl = `https://timetreeapp.com${path}`;

  try {
    console.log({timetreeApiUrl})
    const response = await fetch(timetreeApiUrl, {
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
    console.log(error);
    return { statusCode: 500, body: 'Serverless function error' };
  }
};
export { handler };