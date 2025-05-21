const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const Campground = require('../models/campground');
const { reviewSchema } = require('../schemas');

const ExpressError = require('../utils/ExpressError');
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error || !req.body) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  }
  next();
};

router.post('/', validateReview, async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  const campground = await Campground.findById(id);
  const r = new Review(review);
  campground.reviews.push(r);
  await r.save();
  await campground.save();
  req.flash('success', 'Created new review!');
  res.redirect(`/campgrounds/${id}`);
});

router.delete('/:reviewId', async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Deleted review!');
  res.redirect(`/campgrounds/${id}`);
});

module.exports = router;
