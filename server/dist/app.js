import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use('/', indexRouter);
app.use('/', authRouter);
/* ============================================== */
const uploadDirectory = 'uploads/';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
app.post('/upload', upload.single('image'), (req, res) => {
    // Lógica para lidar com a imagem enviada
    const imageUrl = `http://localhost:3001/${uploadDirectory}${req.file.filename}`;
    res.json({ imageUrl });
});
app.use(express.static(uploadDirectory));
app.use('/', express.static(path.join(__dirname, uploadDirectory)));
const uploadDirector = path.join(__dirname, '../uploads');
app.use('/upload/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(uploadDirector, filename);
    // Verifica se o arquivo existe antes de enviá-lo
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    }
    else {
        res.status(404).send('Arquivo não encontrado');
    }
});
/* ============================================== */
app.use((req, res, next) => {
    next(createError(404));
});
// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
export default app;