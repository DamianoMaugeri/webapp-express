const connection = require('../data/db.js')


function index(req, res) {


    const sql = `SELECT movies.*, AVG(vote) AS avg_vote
     FROM movies
     JOIN reviews
     ON movies.id = reviews.movie_id
     GROUP BY movies.id
     `

    connection.query(sql, (err, results) => {

        if (err) return res.status(500).json({ message: err.message })

        results.forEach(el => {
            el.image = `http://${process.env.DB_HOST}:${process.env.PORT}/movies_cover/${el.image}`

        })

        res.json(results)

    })

};


function show(req, res) {

    const { id } = req.params;

    const sql = `
      SELECT *
   FROM movies
   WHERE id = ?`;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'database query failed' })
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Movie not found' })
        } else {

            const movie = results[0]

            movie.image = `http://${process.env.DB_HOST}:${process.env.PORT}/movies_cover/${movie.image}`

            const sql = `
                SELECT *
                FROM reviews
                WHERE movie_id = ?
                `
            connection.query(sql, [id], (err, results) => {
                if (err) return res.status(500).json({ error: 'database query failed' });

                movie.reviews = results


                const sql = `
                    SELECT AVG(vote) AS avg_vote
                    FROM reviews
                    WHERE movie_id = ?
                    `

                connection.query(sql, [id], (err, results) => {
                    if (err) return res.status(500).json({ error: 'database query failed' });
                    movie.avg_vote = results[0].avg_vote
                    res.json(movie)

                })



            })
        }
    })

};


function storeReview(req, res) {
    const { id } = req.params;

    const { text, name, vote } = req.body;

    // validazione 

    const sql = `INSERT INTO reviews (text, name, vote, movie_id ) VALUES (?, ?, ?, ?)`;

    connection.query(sql, [name, text, vote, id], (err, results) => {

        if (err) return res.status(500).json({ message: 'query al database non è andata a buon fine' });

        res.status(201).json({ message: 'recensione aggiunta correttamente' })

    })



}

module.exports = { index, show, storeReview }