const { formatPostData } = require('./common-helpers');
const { isAlreadyProcessed, logAmountSkipped } = require('./dl-status-cache');
const { downloadFile } = require('./downloaders');
const { getAllSavedPostWithCache } = require('./reddit-handler');
const { log, logRes } = require('./logger');

const handlePost = async (post, dryrun, output) => {
  const {
    url, postHint, filename, metadata,
  } = formatPostData(post);
  if (!dryrun) {
    await downloadFile(url, postHint, filename, metadata, output);
  } else {
    log('[DRYRUN]', url, postHint, filename);
  }
};

const getNbOccur = (arr, key) => arr.reduce((acc, curr) => ({ ...acc, [curr[key]]: acc[curr[key]] + 1 || 1 }), {});

const filterByType = (postHint, filtertype) => !filtertype || postHint === filtertype;

const syncSavedRedditPosts = async (filtertype, limitAmount, dryrun, onlyNumber, force, output) => {
  const res = await getAllSavedPostWithCache(force);

  const filtered = res.filter((post) => !post.is_self)
    .filter((post) => filterByType(post.post_hint, filtertype))
    .filter((post) => !isAlreadyProcessed(post.url))
    .slice(0, limitAmount);

  if (onlyNumber) {
    if (filtered.length) {
      logRes({
        ...getNbOccur(filtered, 'post_hint'),
        total: filtered.length,
      });
    }
    return;
  }
  logAmountSkipped();

  for (const [i, post] of filtered.entries()) {
    log(`${i + 1}/${filtered.length}`);
    await handlePost(post, dryrun, output);
  }
};

module.exports = {
  syncSavedRedditPosts,
};
