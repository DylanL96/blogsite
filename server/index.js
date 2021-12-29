require('dotenv');
const app = require('./app');
const PORT = process.env.PORT;
const http = require('http');
const server = http.createServer(app);


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})