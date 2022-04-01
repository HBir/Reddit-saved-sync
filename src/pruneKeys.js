/* eslint-disable camelcase */
const pruneKeys = (posts) => posts.map(({
  saved,
  approved_at_utc,
  mod_reason_title,
  gilded,
  clicked,
  hidden,
  pwls,
  link_flair_css_class,
  thumbnail_height,
  top_awarded_type,
  hide_score,
  quarantine,
  link_flair_text_color,
  author_flair_background_color,
  subreddit_type,
  thumbnail_width,
  author_flair_template_id,
  user_reports,
  is_meta,
  can_mod_post,
  approved_by,
  is_created_from_ads_ui,
  author_premium,
  author_flair_css_class,
  author_flair_richtext,
  gildings,
  mod_note,
  wls,
  removed_by_category,
  banned_by,
  author_flair_type,
  allow_live_comments,
  likes,
  suggested_sort,
  banned_at_utc,
  archived,
  no_follow,
  is_crosspostable,
  pinned,
  all_awardings,
  awarders,
  _config,
  _r,
  _fetch,
  _hasFetched,
  spoiler,
  locked,
  treatment_tags,
  num_reports,
  mod_reason_by,
  removal_reason,
  link_flair_background_color,
  is_robot_indexable,
  report_reasons,
  discussion_type,
  send_replies,
  whitelist_status,
  contest_mode,
  mod_reports,
  author_patreon_flair,
  author_flair_text_color,
  parent_whitelist_status,
  stickied,
  preview,
  crosspost_parent_list,
  media_metadata,
  category,
  link_flair_richtext,
  selftext,
  edited,
  content_categories,
  visited,
  removed_by,
  can_gild,
  view_count,
  media_only,
  author_is_blocked,
  is_video,
  ...keep
}) => ({ ...keep, preview: ((((preview || {}).images || [])[0] || {}).source || {}).url }));

module.exports = pruneKeys;
