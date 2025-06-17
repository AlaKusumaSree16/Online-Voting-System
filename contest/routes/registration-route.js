var express = require('express');
var router = express.Router();
var db = require('../database');
var app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

// Display registration form
router.get('/register', function(req, res) {
  res.render('registration-form.ejs');
});

// Handle registration form submission
router.post('/register', function(req, res) {
    const inputData = {
        name: req.body.first_name + ' ' + req.body.last_name,  // combine first and last name
        email_address: req.body.email_address,
        gender: req.body.gender,
        password: req.body.password
    };

    // Validate password confirmation
    if (req.body.password !== req.body.confirm_password) {
        return res.render('registration-form.ejs', { alertMsg: 'Password & Confirm Password do not match' });
    }

    // Check for unique email address
    const sqlCheck = 'SELECT * FROM registration WHERE email_address = ?';
    db.query(sqlCheck, [inputData.email_address], function(err, data) {
        if (err) throw err;
        if (data.length > 0) {
            return res.render('registration-form.ejs', { alertMsg: inputData.email_address + ' already exists' });
        } else {
            // Save user data to database
            const sqlInsert = 'INSERT INTO registration SET ?';
            db.query(sqlInsert, inputData, function(err, result) {
                if (err) throw err;
                res.render('registration-form.ejs', { alertMsg: 'You are successfully registered' });
            });
        }
    });
});

module.exports = router;
