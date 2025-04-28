const queries = {
    getAllEntries : `
    SELECT e.title, e.content, e.date, e.category, a.name, a.surname, a.email, a.image
    FROM entries AS e
    INNER JOIN authors AS a
    ON a.id_author = e.id_entry`

};

module.exports = queries;