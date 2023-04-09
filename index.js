const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
const { typeError } = require('./middleware/errors');
const cors = require("cors")
app.use(cors());


app.use("/users", require("./routes/users"));
app.use("/categories", require("./routes/categories"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));
app.use("/reviews", require("./routes/reviews"));

app.use(typeError);

app.listen(PORT, () => console.log(`Server started on port ${PORT}, cors() enabled`));
