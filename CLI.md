npm init -y
npm install express nodemon mongoose dotenv joi bcryptjs jsonwebtoken eslint
npx eslint --init

change package.json to use ESmodules
  "type": "module",

add globals.node to eslint.config.js
https://eslint.org/docs/latest/use/configure/language-options#specifying-globals

make the mongodb database and add a cluster: piazza-cluster
create .env and populate with DB_CONNECTOR and generate a TOKEN_SECRET using
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4

make the models and routes folders
add the User.js model from class 4 //NB: I refactored class 4 to use ES modules
add unique: true to username and email
change all instances of require to required as per documentation https://mongoosejs.com/docs/guide.html