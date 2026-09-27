import pool from '../db/pool.js';

export async function obtenerMensaje() {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
}

export async function obtenerMensajeid(id) {
    const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1;', [
        id,
    ]);
    return rows[0];
}

export async function insertarMensaje(title, body, user_id) {
    const result = await pool.query(
        'INSERT INTO messages(title, body, user_id) VALUES ($1, $2, $3) RETURNING *',
        [title, body, user_id],
    );

    return result.rows[0];
}

export async function actualizarMensaje(title, body, user_id, id) {
    const result = await pool.query(
        'UPDATE messages SET title = $1, body = $2, user_id = $3 WHERE id = $4 RETURNING *',
        [title, body, user_id, id],
    );

    return result.rows[0];
}

export async function eliminarMensaje(id) {
    const result = await pool.query(
        'DELETE FROM messages WHERE id = $1 RETURNING *',
        [id],
    );

    return result.rows[0];
}
