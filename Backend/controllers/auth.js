import pool from '../database/keys';

const authentication = {};

authentication.signUp = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (role === "admin") {
        try {
            await pool.query("INSERT INTO admin (a_name, a_email, a_password) VALUES ($1, $2, $3)", [name, email, password]);
            res.status(200).json({
                message: 'Successful registred',
                admin: { name, email, password }
            })
        } catch (error) {
            if (error.constraint == 'admin_a_email_key') {
                res.status(500).json({
                    message: 'Someone is already using that email',
                    error
                })

            } else {
                res.status(500).json({
                    message: 'An error has ocurred',
                    error
                })
            }
        }
    } else {
        try {
            await pool.query("INSERT INTO client (c_name, c_email, c_password) VALUES ($1, $2, $3)", [name, email, password]);
            res.status(200).json({
                message: 'Successful registred',
                client: { name, email, password }
            })
        } catch (error) {
            if (error.constraint == "client_c_email_key") {
                res.status(500).json({
                    message: 'Someone is already using that email',
                    error
                })

            } else {
                res.status(500).json({
                    message: 'An error has ocurred',
                    error
                })
            }
        }
    }
};

authentication.signIn = async (req, res) => {
    const { email, password, role } = req.body;
    if (role == 'admin') {
        try {
            const admin = await (await pool.query('SELECT * FROM admin WHERE a_email=$1 AND a_password=$2', [email, password])).rows;
            if (admin.length > 0) {
                res.status(200).json({
                    id: admin[0].id_a,
                    name: admin[0].a_name,
                    email: admin[0].a_email,
                    role: 'admin'
                });
            } else {
                res.status(200).json({
                    message: 'The admin does not exist',
                    NotFound: true
                });
            }

        } catch (error) {
            res.status(500).json({
                message: 'An error has ocurred',
                error
            });
        }
    } else {
        try {
            const client = await (await pool.query('SELECT * FROM client WHERE c_email=$1 AND c_password=$2', [email, password])).rows;
            if (client.length > 0) {
                res.status(200).json({
                    id: client[0].id_c,
                    name: client[0].c_name,
                    email: client[0].c_email,
                    role: 'client'
                });
            } else {
                res.status(200).json({
                    message: 'The client does not exist',
                    NotFound: true
                });
            }

        } catch (error) {
            res.status(500).json({
                message: 'An error has ocurred',
                error
            })
        }

    }
}

module.exports = authentication;