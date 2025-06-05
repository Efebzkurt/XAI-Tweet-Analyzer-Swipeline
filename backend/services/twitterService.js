
const axios = require("axios");


const USE_MOCK_TWEET_DATA = false; // Change to true for testing purposes

async function getTweetData(tweetUrl) {
  if (USE_MOCK_TWEET_DATA) {
    console.log("Using mock tweet data (bypassing Twitter API)");   
    return {
      text: "Bu, Twitter API'sini atlayarak oluşturulmuş bir test tweet'idir. Yapay zeka ile analiz edilecek.",
      created_at: new Date().toISOString(),
      username: "mockUser123",
    };
  }

  const tweetId = tweetUrl.match(/status\/(\d+)/)?.[1]; 
  if (!tweetId) {
      throw new Error("Invalid Tweet URL format.");
  }

  const res = await axios.get(
    `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&tweet.fields=created_at&user.fields=username`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );

  
  if (res.status !== 200) {
      throw new Error(`Twitter API returned status ${res.status}: ${res.data.detail || JSON.stringify(res.data)}`);
  }

  const tweet = res.data.data;
  const user = res.data.includes.users[0];
  if (!tweet || !user) {
      throw new Error("Failed to parse tweet data from Twitter API response.");
  }

  return {
    text: tweet.text,
    created_at: tweet.created_at,
    username: user.username,
  };
}

module.exports = { getTweetData };