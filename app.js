const express = require('express');
const app = express();
const port = 3000;
const notFound = require('./middleware/notFound.js');
const errorsMiddleware = require('./middleware/errorsMiddleware.js')



app.get('/', (req, res) => {
    res.send('home del server');
});

// rotte 




// middleware err e not found 

app.use(errorsMiddleware);
app.use(notFound);




app.listen(port, () => console.log('hello nel listen'))