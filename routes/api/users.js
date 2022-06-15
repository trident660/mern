const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');


// @route           GET api/users
// @description     test route
// @access          public
router.get('/', (req, res) => res.send('User route'));

// @route           POST api/users
// @description     register user
// @access          public
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Valid email address required').isEmail(),
        check('password', 'Password must be at least 4 characters').isLength({ min: 4 })
    ],
    async (req, res) => {

        // check the input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // destructuring so we dont need to prefix with req.
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            user = new User({
                name,
                email,
                password
            });

            // salt the password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // for JWT we'll setup a payload
            // mongoose will allow us to use id rather than the _id stored in mongo
            const payload = {
                user: {
                    id: user.id,
                    name: user.name
                }
            }

            // sign the token, pass in the payload, secret and expiration
            // inside the callback. If theres no error we'll send back the token
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 720000
                },
                (err, token) => {
                    if ( err) throw err;
                    // no error - return the jwt token
                    res.json({token});
                }

            );

            // // response is the body 
            // res.json(req.body);

        } catch (err) {
            console.log("Failed to add user: " + err.message);
            res.status(500).send('Server error');
        }
    });

// export the router for the app
module.exports = router;