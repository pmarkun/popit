 var mongoose         = require('mongoose'),
    Schema            = mongoose.Schema,
    ObjectId          = Schema.ObjectId,
    ContactDetail     = require('../schemas').ContactDetail,
    Link              = require('../schemas').Link,
    deduplicate_slug  = require('./util').deduplicate_slug,
    slug              = require ('slug');


var PersonSchema = module.exports = new Schema({

  // Overview fields
  name: {
    type: String,
    required: true,
    trim: true,
    form_label: 'Name',
    form_help_text: "The person's most well known name",
    set: function(v) {
      // If we don't already have a slug set it
      if (!this.slug) this.slug = v;
      // Don't change the value
      return v;
    },
  },
  slug: {
    type:      String,
    required:  true,
    lowercase: true,
    trim:      true,
    unique:    true,
    set: function(v) { return slug(v); },    
  },
  summary: {
    type: String,
    form_label: 'Summary',
    form_help_text: "A brief bit of text to help identify the person",
    form_input_type: 'textarea',
  },
  
  // Profile fields - dob, dod, gender
  
  // Names - historic and alternative names

  // Contact details such as phone numbers, email, postal addresses etc.
  contact_details: [ContactDetail],

  // Links to other sites that have relevant information
  links: [Link],

  // Images of this person
  images: [{type: ObjectId, ref: "Image"}],

}, { strict: true } );

PersonSchema
  .virtual('slug_url')
  .get( function () { return '/person/' + this.slug;} );

// TODO - perhaps better implemented as a plugin?
PersonSchema.methods.deduplicate_slug = deduplicate_slug;




