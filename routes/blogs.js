const { express, lodash, Joi, jwt } = require('../utils/authUtils');
const connection = require('../startup/db');


const auth = require('../middleware/auth');

require('dotenv').config();
const router = express();
router.use(express.json());


//Create Blog
router.post('/create', auth, (req, res) => {
    const user_id = req.user.id;
    const blogData = req.body;
    const result = validateBlog(blogData);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    else {
        const { title, content, is_active } = blogData;
        const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');


        const sql = `INSERT INTO blogs
        (blog_id, user_id, title, content, is_active, created_at, updated_at)
        VALUES (default, ${user_id}, "${title}", "${content}", ${is_active}, "${created_at}", "${updated_at}")`;
        connection.query(sql, function (err, result) {
            if (err) {
                res.send(err);
                return;
            }
            console.log("1 document inserted");
            res.send("Inserted " + result.insertId);
        });
    }
});

//Update Blog
router.put('/update', auth, (req, res) => {
    const user_id = req.user.id;
    const blog_id = req.header('blog_id');
    const blogData = req.body;
    const result = validateBlog(blogData);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    else {
        const quer = `SELECT * FROM blogs WHERE blog_id = ${blog_id} AND user_id = ${user_id}`;
        connection.query(quer, function (err, result) {
            if (err) {
                res.send(err);
                return;
            }
            if (result.length == 0) {
                res.send("Blog not found or does not belong to the user");
                return;
            }

            const { title, content, is_active } = blogData;
            const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const sql = `UPDATE blogs SET title = "${title}", content = "${content}", is_active = ${is_active}, updated_at = "${updated_at}" WHERE blog_id = ${blog_id}`;
            connection.query(sql, function (err, result) {
                if (err) {
                    res.send(err);
                    return;
                }
                console.log("1 document updated");
                res.send("Updated " + result.affectedRows);
            });
        });
    }
});

//Delete Blog
router.delete('/delete', auth, (req, res) => {
    const user_id = req.user.id;
    const blog_id = req.header('blog_id');
    const quer = `SELECT * FROM blogs WHERE blog_id = ${blog_id} AND user_id = ${user_id}`;
    connection.query(quer, function (err, result) {
        if (err) {
            throw err
        }
        if (result.length == 0) {
            res.send("Blog not found or does not belong to the user");
            return;
        }
        const sql = `DELETE FROM blogs WHERE blog_id = ${blog_id}`;
        connection.query(sql, function (err, result) {
            if (err) {
                throw err;
            }
            console.log("1 document deleted");
            res.send("Deleted " + result.affectedRows);
        });
    });
});

//Get blogs
router.get('/get', auth, (req, res) => {
    const user_id = req.user.id;
    const sql = `Select * from blogs where user_id= "${user_id}"`;
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        if (result.length == 0) {
            res.send("Blogs not found");
            return;
        }
        res.send(result);
    });
});

//Get all blogs
router.get('/getall', auth, (req, res) => {
    const sql = `Select title,content from blogs where is_active = true`;
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
            return;
        }
    });
})

function validateBlog(blogData) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string().min(10).required(),
        is_active: Joi.boolean().required()
    })
    return schema.validate(blogData);
}

module.exports = router;