const { server, io } = require("./config/server");

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
