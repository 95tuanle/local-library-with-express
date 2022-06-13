var mongoose = require('mongoose');
const {DateTime} = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
   first_name: {type: String, required: true, maxLength: 100},
   family_name: {type: String, required: true, maxLength: 100},
   date_of_birth: {type: Date},
   date_of_death: {type: Date}
});

AuthorSchema.virtual('name').get(function () {
   var fullname = '';
   if (this.first_name && this.family_name) {
      fullname = this.family_name + ', ' + this.first_name;
   }
   if (!this.first_name || !this.family_name) {
      if (this.first_name) {
         fullname = this.first_name;
      } else if (this.family_name) {
         fullname = this.family_name;
      } else {
         fullname = '';
      }
   }
   return fullname;
});

AuthorSchema.virtual('url').get(function () {
   return '/catalog/author/' + this._id;
});

AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
   return DateTime.fromJSDate(this.date_of_birth).toISODate();
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
   return DateTime.fromJSDate(this.date_of_death).toISODate();
});

AuthorSchema.virtual('lifespan').get(function () {
   var lifetime_string = '';
   if (this.date_of_birth) {
      lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
   }
   lifetime_string += ' - ';
   if (this.date_of_death) {
      lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
   }
   return lifetime_string;
});

module.exports = mongoose.model('Author', AuthorSchema);