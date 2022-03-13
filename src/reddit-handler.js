const fs = require('fs');
const Snoowrap = require('snoowrap');

const cache = require('../resources/cache.json') || {};

const {
  userAgent, clientId, clientSecret, username, password,
} = process.env;

const r = new Snoowrap({
  userAgent,
  clientId,
  clientSecret,
  username,
  password,
});

const humanReadableMs = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return (hours ? `${hours} hours ` : '') + (minutes ? `${minutes} minutes ` : '') + (seconds ? `${seconds} seconds ` : '');
};

const getAllSavedPostWithCache = async () => {
  const oneHour = 3600000;
  const tsAge = Date.now() - cache.timestamp;
  if (cache.content && tsAge < oneHour) {
    console.log(`Using cache from ${humanReadableMs(tsAge)} ago. (${cache.content.length} posts)`);
    return cache.content;
  }

  console.log('Fetching content from Reddit...');
  const freshData = await r.getMe().getSavedContent()
    .fetchAll({ skipReplies: true });

  console.log(`Recieved ${freshData.length} posts`);
  fs.writeFileSync('cache.json', JSON.stringify({ content: freshData, timestamp: Date.now() }));
  return freshData;
};

module.exports = {
  getAllSavedPostWithCache,
};
