require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to DB');

    const usersData = [
      {
        name: 'Dr. Ahmad',
        email: 'doctor@dentcare.local',
        password: 'Doctor123',
        role: 'doctor',
      },
      {
        name: 'Rami Reception',
        email: 'receptionist@dentcare.local',
        password: 'reception123',
        role: 'receptionist',
      },
    ];

    for (const user of usersData) {
      const exists = await User.findOne({ email: user.email });
      if (exists) {
        console.log(`User ${user.email} already exists. Skipping.`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        ...user,
        password: hashedPassword,
      });

      console.log(`Created user: ${user.email}`);
    }

    mongoose.disconnect();
    console.log('Seeding completed and disconnected from DB');
  } catch (error) {
    console.error('Error seeding users:', error.message);
    mongoose.disconnect();
  }
}

seedUsers();
