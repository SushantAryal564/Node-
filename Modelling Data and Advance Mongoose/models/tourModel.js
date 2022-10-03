const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const User = require("./userModel");
tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"], // validator
      unique: true, // Not a validator
      trim: true,
      maxlength: [40, "A tour name must have less or equal then 40 character."],
      minlength: [10, "A tour name must have more or equal then 10 character"],
      // validate: [validator.isAlpha, "Tour name must only contain characters"],
    },
    slug: {
      type: String,
    },
    duration: {
      type: String,
      required: [true, "A tour must have duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult",
      },
    },
    rating: {
      type: String,
      default: 4.5,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [10, "Rating must be below 10.0"],
      min: [1, "Rating must be above 1.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have price."],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          // this only points to current doc on New Document creation.
          return value < this.price; // 100 < 200
        },
        message: "Discount Price should be below the regular price",
      },
    },
    summary: {
      type: String,
      required: [true, "A tour must have a description."],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinate: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Document Middleware: runs before .save() and .create() not in .insertMany()
tourSchema.pre("save", function (next) {
  // console.log(this); // this keyword points to the currently processed document that's why it is called document middleware as in this function we have acccess to the function being processed.
  this.slug = slugify(this.name, { lower: true });
  next();
});
// tourSchema.pre("save", function (next) {
//   console.log("Will save document....");
//   next();
// });
// tourSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});
// Query Middleware
tourSchema.pre(/^find/, function (next) {
  // All the string that starts with find.
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
// tourSchema.pre("find", function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

tourSchema.pre("save", async function (next) {
  const guidesPromises = this.guides.map(async (id) => await User.findById(id));
  this.guides = await Promise.all(guidesPromises);
  console.log(this.guides);
  next();
});
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });
  next();
});
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} millisecond`);
  next();
});
// AGGREGATION MIDDLEWARE
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
