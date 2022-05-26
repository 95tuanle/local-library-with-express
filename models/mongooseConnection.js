var mongoose = require('mongoose');

var mongodb = 'mongodb+srv://<username>:<password>@cluster0.gvc0m.mongodb.net/local_library?retryWrites=true&w=majority';

mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

// var SomeModelSchema = new Schema({
//     a_string: String,
//     a_date: Date
// });
//
// var SomeModel = mongoose.model('SomeModel', SomeModelSchema);
//
// var schema = new Schema({
//     name: String,
//     binary: Buffer,
//     living: Boolean,
//     updated: {type: Date, default: Date.now()},
//     age: {type: Number, min: 18, max: 65, required: true},
//     mixed: Schema.Types.Mixed,
//     _someId: Schema.Types.ObjectId,
//     array: [],
//     ofString: [String],
//     nested: {stuff: {type: String, lowercase: true, trim: true}}
// });
//
// var breakfastSchema = new Schema({
//     eggs: {
//         type: Number,
//         min: [6, 'Too few eggs'],
//         max: 12,
//         required: [true, 'Why no eggs?']
//     },
//     dink: {
//         type: String,
//         enum: ['Coffee', 'Tea', 'Water']
//     }
// });
//
// var awesome_instance = new SomeModel({name: 'awesome'});
//
// awesome_instance.save(function (err) {
//     if (err) return console.log(err);
// });
//
// SomeModel.create({name: 'also_awesome'}, function (err, also_awesome_instance) {
//     if (err) return console.log(err);
//
//     console.log(also_awesome_instance.name);
//
//     also_awesome_instance.name = "New cool name";
//
//     also_awesome_instance.save(function (err) {
//         if (err) return console.log(err);
//     });
// })
//
// let yourSchema = new Schema({
//     sport: String,
//     name: String,
//     age: Number
// });
// var Athlete = mongoose.model('Athlete', yourSchema);
//
// Athlete.find({'sport': 'Tennis'}, 'name age', function (err, athletes) {
//     if (err) return console.log(err);
// });
//
// var query = Athlete.find({'sport': 'Tennis'});
//
// query.select('name age');
//
// query.limit(5);
//
// query.sort({age: -1});
//
// query.exec(function (err, athletes) {
//     if (err) return console.log(err);
// });
//
// Athlete
//     .find()
//     .where('sport').equals('Tennis')
//     .where('age').gt(17).lt(50)
//     .limit(5)
//     .sort({age: -1})
//     .select('name age')
//     .exec(function (err, athletes) {
//         if (err) return console.log(err);
//     });

var authorSchema = Schema({
    name: String,
    stories: [{type: Schema.Types.ObjectId, ref: 'Story'}]
});

var storySchema = Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    title: String
});

var Author = mongoose.model('Author', authorSchema);
var Story = mongoose.model('Story', storySchema);

var bob = new Author({name: 'Bob Smith'});

bob.save(function (err) {
    if (err) return console.log(err);

    var story = new Story({
        title: "Bob goes sledding",
        author: bob._id
    });

    story.save(function (err) {
        if (err) return console.log(err);
        Story
            .findOne({title: 'Bob goes sledding'})
            .populate('author')
            .exec(function (err, a_story) {
                if (err) return console.log(err);
                console.log('The author is %s', a_story.author.name);
            });

        Story
            .find({author: bob._id})
            .exec(function (err, stories) {
                if (err) return console.log(err);
                for (const a_story of stories) {
                    console.log('The story is %s', a_story.title);
                }
            });
    });
});