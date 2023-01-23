module.exports = {
  "*.{js,ts,tsx}": "yarn run eslint --fix",
  "*.{js,ts,tsx,css,md}": "prettier --write",
  "*.{ts,tsx}": () => "yarn run typecheck",
};
