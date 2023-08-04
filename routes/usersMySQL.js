const { express, bcrypt, lodash, Joi, jwt } = require('../utils/authUtils');


const auth = require('../middleware/auth');
const connection = require('../startup/db');
require('dotenv').config();


const router = express();
router.use(express.json());

const secretKey = process.env.JWT_Secret_Key;

//Create an account
router.post('/', (req, res) => {
    const userData = req.body;
    const result = validateUser(userData);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    else {
        const sql = 'INSERT INTO users (id, name, email, password) VALUES (default,?,?,?)';
        const password = encryptPassword(userData.password);
        const values = [userData.name, userData.email, password];
        connection.query(sql, values, function (err, result) {
            if (err) {
                res.send(err.message);
            }
            else {
                const token = genToken(result);
                console.log("1 document inserted");
                res.header('x-auth-token', token).send("Inserted " + result.insertId);
            }
        });
    }
});
//Get all users
router.get('/', auth, (req, res) => {
    const sql = 'SELECT name FROM users';
    connection.query(sql, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }

    });
});

//Login
router.post('/login', (req, res) => {
    const user_email = req.body.email;
    const user_password = req.body.password;
    const sql = `Select * from users where email= "${user_email}"`;
    connection.query(sql, function (err, result) {
        if (err) {
            res.send(err);
            return;
        }
        if (result.length == 0) {
            res.send("User not found");
            return;
        }
        const user = result[0];
        const isPasswordMatched = bcrypt.compareSync(user_password, user.password);
        if (isPasswordMatched) {
            const token = genToken(result[0]);
            res.header('x-auth-token', token).send("Login Sucessfull");
        } else {
            res.send("Wrong Password");
        }
    })
});

//Update Password
router.put('/password', (req, res) => {
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = encryptPassword(req.body.newPassword);
    const sql = `Select * from users where email= "${email}"`;
    connection.query(sql, function (err, result) {
        if (err) {
            res.send(err.message);
            return;
        }
        if (result.length === 0) {
            res.send("User not found");
            return;
        }
        const user = result[0];
        const isPasswordMatched = bcrypt.compareSync(req.body.oldPassword, user.password);
        if (!isPasswordMatched) {
            res.send("Wrong Password");
            return;
        }
    });
    const sql1 = `UPDATE users SET password = "${newPassword}" WHERE email = "${email}"`;
    connection.query(sql1, function (err) {
        if (err) {
            res.send(err.message);
            return;
        }
        else {
            res.send("Password updated sucessfully ");
        }
    });
});

function genToken(result) {
    return jwt.sign({ id: result.id }, secretKey, { expiresIn: '1h' });
}

function encryptPassword(plainPassword) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(plainPassword, salt);
    //return bcrypt.hashSync(palinPassword, 10);
}

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string().min(8).alphanum().max(30).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()

    });
    return schema.validate(user);
}

module.exports = router;