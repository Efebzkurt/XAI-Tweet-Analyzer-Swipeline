const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

async function appendToSheet({ username, tweetText, sentiment, summary, datetime }) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "AnalyzedTweets!A:E",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[`@${username}`, tweetText, sentiment, summary, datetime]],
    },
  });
}

module.exports = { appendToSheet };
