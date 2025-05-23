const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  const campground = await Campground.findById(id);
  const r = new Review(review);
  r.author = req.user._id;
  campground.reviews.push(r);
  await r.save();
  await campground.save();
  req.flash('success', 'Created new review!');
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Deleted review!');
  res.redirect(`/campgrounds/${id}`);
};
