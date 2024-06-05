const db = require('../models/fileModel');

exports.uploadFile = (req, res) => {
    const { filename, originalname, mimetype, size, path } = req.file;

    db.run(`INSERT INTO files (filename, originalname, mimetype, size, path) VALUES (?, ?, ?, ?, ?)`,
        [filename, originalname, mimetype, size, path],
        function (err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'File upload failed', error: err.message });
            }
            res.json({ success: true, message: 'File uploaded successfully', fileId: this.lastID });
        }
    );
};
