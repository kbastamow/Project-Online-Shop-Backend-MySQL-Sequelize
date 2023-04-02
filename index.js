const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/categories", require("./routes/categories"));
app.use("/products", require("./routes/products"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
