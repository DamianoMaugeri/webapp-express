const connection = require('../data/db.js')


function index(req, res) {


    const sql = `SELECT * FROM movies`

    connection.query(sql, (err, results) => {

        if (err) return res.status(500).json({ message: err.message })

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

module.exports = { index, show }