const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');
const feedRoutes = require('./routes/feedsRoute');
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', userRoutes);
app.use('/api/file', fileRoutes);
app.use('/api', feedRoutes);
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
