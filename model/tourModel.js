const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name ni berishingiz shart!'],
      minlength: [8, "8 ta dan kam belgi bo'lmasligi shart!"],
      maxlength: [40, "40 ta dan ko'p belgi bo'lmasligi shart!"],
    },
    duration: {
      type: Number,
      required: true,
      min: [1, 'Durationga past qiymat kiritingiz!'],
      max: [100, 'Durationga baland qiymat kiritingiz!'],
    },
    maxGroupSize: {
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          if (val > 1 && Number.isInteger(val)) {
            return true;
          }
          return 0;
        },
        message: 'Siz xato son kiritdingiz!',
      },
    },
    difficulty: {
      type: String,
      required: true,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: "Siz xato ma'lumot kiritingiz!",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
    },
    secretInfo: {
      type: Boolean,
      default: true,
    },
    images: [String],
    startDates: [Date],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('haftalarda').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  this.name = this.name + 1;
  this.startTime = Data.now();
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log(Data.now() - doc.startTime);
  next();
});

tourSchema.pre('find', function (next) {
  this.find({ secretInfo: { $ne: true } });
  next();
});

tourSchema.pre('find', function (next) {
  console.log(doc);
  next();
});

const Tour = mongoose.model('tours', tourSchema);

module.exports = Tour;
