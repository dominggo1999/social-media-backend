const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001;

// Morgan logger
app.use(morgan('tiny'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})