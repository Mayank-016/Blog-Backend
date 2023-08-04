const express = require('express');
const app = express();
require('./startup/routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));