const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


// @route           GET api/auth
// @description     test route
// @access          public
router.get('/', auth, async (req, res) => {
    try {
        // find user but exclude password coming back
        const user = await (User.findById(res.user.id)).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

// @route           POST api/auth
// @description     authenticate user and get token
// @access          public
router.post('/',
    [
        // email and password required and valid
        check('email', 'Valid email address required').isEmail(),
        check('password', 'Password required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if ( !errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({email});
            if (!user) {
                return res.staus(400).json({ errors: [{msg: 'Invalid credentials'}]});
            }

            // check the password
            const isMatch = await bcrypt.compare(password, user.password);
            if ( !isMatch) {
                return res.status(400).json({ errors: [{msg: 'Invalid credentials'}]});
            }

            const payload = {
                user: {
                    id: user.id,
                    name: user.name
                }
            }

            // sign the token, pass in payload and send back the token
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 720000},
                ( err, token) => {
                    if ( err) throw err;
                    res.json({token});
                }
            )


        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }
    }



);

module.exports = router;