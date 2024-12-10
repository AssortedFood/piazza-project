```
npm init -y
npm install express nodemon mongoose dotenv joi bcryptjs jsonwebtoken eslint
npx eslint --init
```

change package.json to use ESmodules
  "type": "module",

add globals.node to eslint.config.js
https://eslint.org/docs/latest/use/configure/language-options#specifying-globals
https://www.npmjs.com/package/globals

make the mongodb database and add a cluster: piazza-cluster
create `.env` and populate with DB_CONNECTOR and generate a TOKEN_SECRET using
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4

make the models and routes folders
add the `User.js` model from class 4 //NB: I refactored class 4 to use ES modules
add unique: true to username and email
change all instances of require to required as per documentation https://mongoosejs.com/docs/guide.html
change all instances of mongoose.schema to new mongoose.schema as per documentation https://mongoosejs.com/docs/api/schema.html#Schema()

add `Post.js`
use moment package to calc expiration date
`npm install moment`
https://momentjs.com/docs/#/manipulating/add/
https://momentjs.com/docs/#/displaying/as-javascript-date/


add the app.js, validations/validation.js, verifyToken.js from Class 4 //also refactored for ES modules
update verifyToken.js error code: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses

add a pre-save hook to `Post.js` to allow Action 5 of coursework brief
https://mongoosejs.com/docs/middleware.html#pre

replace my timestamps element with the official https://mongoosejs.com/docs/timestamps.html

write validation for routes
https://joi.dev/api/?v=17.13.3
https://stackoverflow.com/questions/50156176/how-to-use-enum-values-with-joi-string-validation

start creating `routes/posts.js`
realise that even though we have a status for posts the status is never changed, make a note to implement node-cron
`npm install node-cron`

`npm install joi-objectid`

update the mongodb
https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp

use $inc to increment likes https://www.mongodb.com/docs/manual/reference/operator/update/inc/
mongoose reverse sort: https://stackoverflow.com/questions/47624681/sort-by-reverse-order-mongoose
