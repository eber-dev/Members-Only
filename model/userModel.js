import pool from '../db/pool.js';

export async function obtenerUsuarios() {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
}

export async function obtenerUsuariosporId(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [
        id,
    ]);
    return rows[0];
}

export async function obtenerUsuarioPorUsername(username) {
    const { rows } = await pool.query(
        'SELECT * FROM users WHERE username = $1;',
        [username],
    );
    return rows[0];
}

export async function insertarUsuario(
    first_name,
    last_name,
    username,
    password_hash,
) {
    const result = await pool.query(
        'INSERT INTO users(first_name,last_name,username,password_hash) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, username, password_hash],
    );

    return result.rows[0];
}

export async function actualizarUsuario(
    id,
    first_name,
    last_name,
    username,
    password_hash,
) {
    const result = await pool.query(
        'UPDATE users SET first_name = $1, last_name = $2, username = $3, password_hash = $4 WHERE id = $5 RETURNING *',
        [first_name, last_name, username, password_hash, id],
    );
    return result.rows[0];
}

export async function eliminarUsuario(id) {
    const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id],
    );

    return result.rows[0];
}
