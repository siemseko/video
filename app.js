const express = require('express');
const app = express();
const port = 7100;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));
// Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api', videoRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
