var SomeModel = require('../models/somemodel');

exports.some_model_count = function (req, res, next) {
    SomeModel.countDocuments({a_model_field: 'match_value'}, function (err, count) {
        res.render('the_template', {data: count});
    })
}