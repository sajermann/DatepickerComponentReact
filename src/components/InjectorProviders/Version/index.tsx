const DEPLOY_VERSION = import.meta.env.VITE_DEPLOY_VERSION;
const DEPLOY_TIME = import.meta.env.VITE_DEPLOY_TIME;
const COMMIT_HASH = import.meta.env.VITE_COMMIT_HASH;
const COMMIT_SHORT_HASH = import.meta.env.VITE_COMMIT_SHORT_HASH;
const COMMIT_MESSAGE = import.meta.env.VITE_COMMIT_MESSAGE;
const COMMIT_AUTHOR = import.meta.env.VITE_COMMIT_AUTHOR;
const COMMIT_AUTHOR_EMAIL = import.meta.env.VITE_COMMIT_AUTHOR_EMAIL;
const BRANCH_NAME = import.meta.env.VITE_BRANCH_NAME;
const LAST_COMMIT_DATE = import.meta.env.VITE_LAST_COMMIT_DATE;
const TOTAL_COMMITS = import.meta.env.VITE_TOTAL_COMMITS;

export function Version() {
  console.log({
    DEPLOY_VERSION,
    DEPLOY_TIME,
    COMMIT_HASH,
    COMMIT_SHORT_HASH,
    COMMIT_MESSAGE,
    COMMIT_AUTHOR,
    COMMIT_AUTHOR_EMAIL,
    BRANCH_NAME,
    LAST_COMMIT_DATE,
    TOTAL_COMMITS,
  });

  return null;
}
