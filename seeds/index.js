const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      images: [
        {
          url: ' https://static01.nyt.com/images/2021/07/24/us/24camp-over-1b/merlin_191277501_fb97d1ad-dc13-4e53-9eac-e5b40a340884-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
          filename: 'example1',
        },
        {
          url: 'https://youth.europa.eu/sites/default/files/styles/1260x630/public/article/photo-1513104399965-f5160d963d39.jpeg?itok=er8SFPmS',
          filename: 'example2',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum debitis, rerum, aut eos distinctio molestias eius ad harum voluptatum quia dolorem possimus facere quos laborum voluptate tempore laudantium quam laboriosam!',
      price,
      author: '682e26256e1ea7dce38d044d',
    });
    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());
