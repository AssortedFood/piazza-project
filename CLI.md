npm init -y
npm install express nodemon mongoose dotenv joi bcryptjs jsonwebtoken eslint
npx eslint --init

change package.json to use ESmodules
  "type": "module",

add globals.node to eslint.config.js
https://eslint.org/docs/latest/use/configure/language-options#specifying-globals

make the mongodb database and add a cluster: piazza-cluster
