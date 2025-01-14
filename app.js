const express = require('express');
const app = express();
const port = 3000;
const notFound = require('./middlewares/notFound.js');
const errorsMiddleware = require('./middlewares/errorsMiddleware.js')
const cors = require('cors')
const movieRouter = require('./routers/movieRouter.js')


app.use(cors())
app.use(express.static('public'));

app.use(express.json())


app.get('/', (req, res) => {
    res.send('home del server');
});

// rotte 

app.use('/api/movies', movieRouter)




// middleware err e not found 

app.use(notFound);
app.use(errorsMiddleware);




app.listen(port, () => console.log('hello nel listen'))