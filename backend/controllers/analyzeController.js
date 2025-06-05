const { getTweetData } = require("../services/twitterService");
const { analyzeWithGPT } = require("../services/aiService");
const { appendToSheet } = require("../services/sheetService");

async function analyzeTweet(req, res) {
  const tweetUrl = req.body.url;
  try {
    const tweetData = await getTweetData(tweetUrl);
    const gptResult = await analyzeWithGPT(tweetData.text);

    const row = {
      username: tweetData.username,
      tweetText: tweetData.text,
      sentiment: gptResult.sentiment,
      summary: gptResult.summary,
      datetime: tweetData.created_at,
    };

    await appendToSheet(row);

    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Tweet işlenemedi." });
  }
}

module.exports = { analyzeTweet };
