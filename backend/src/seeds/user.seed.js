import "dotenv/config";

import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

const seedUsers = [
    ["seed_amma", "Amma", "amma@example.com", "https://i.pravatar.cc/150?img=1"],
    ["seed_dad", "Dad", "dad@example.com", "https://i.pravatar.cc/150?img=2"],
    ["seed_annayya", "Annayya", "annayya@example.com", "https://i.pravatar.cc/150?img=3"],
    ["seed_ammamma", "Ammamma", "ammamma@example.com", "https://i.pravatar.cc/150?img=4"],
    ["seed_thatayya", "Thatayya", "thatayya@example.com", "https://i.pravatar.cc/150?img=5"],
    ["seed_mavayya", "Mavayya", "mavayya@example.com", "https://i.pravatar.cc/150?img=6"],
    ["seed_athayya", "Athayya", "athayya@example.com", "https://i.pravatar.cc/150?img=7"],
    ["seed_harsha", "Harsha", "harsha@example.com", "https://i.pravatar.cc/150?img=8"],
    ["seed_mohan_venkata", "Mohan Venkata", "mohan.venkata@example.com", "https://i.pravatar.cc/150?img=9"],
    ["seed_harini", "Harini", "harini@example.com", "https://i.pravatar.cc/150?img=10"],
    ["seed_rams", "Rams", "rams@example.com", "https://i.pravatar.cc/150?img=11"],
    ["seed_krupamani", "Krupamani", "krupamani@example.com", "https://i.pravatar.cc/150?img=12"],
    ["seed_b_harsha", "B. Harsha", "b.harsha@example.com", "https://i.pravatar.cc/150?img=13"],
    ["seed_mahith", "Mahith", "mahith@example.com", "https://i.pravatar.cc/150?img=14"],
    ["seed_madhav", "Madhav", "madhav@example.com", "https://i.pravatar.cc/150?img=15"],
    ["seed_vasu", "Vasu", "vasu@example.com", "https://i.pravatar.cc/150?img=16"],
    ["seed_yaswanth", "Yaswanth", "yaswanth@example.com", "https://i.pravatar.cc/150?img=17"],
    ["seed_jaswanth", "Jaswanth", "jaswanth@example.com", "https://i.pravatar.cc/150?img=18"],
    ["seed_praneeth", "Praneeth", "praneeth@example.com", "https://i.pravatar.cc/150?img=19"],
    ["seed_neeraj", "Neeraj", "neeraj@example.com", "https://i.pravatar.cc/150?img=20"],
];

async function seedDatabase() {
  await connectDB();

  const result = await User.bulkWrite(
    seedUsers.map(([clerkId, fullName, email, profilePic]) => ({
      updateOne: {
        filter: { clerkId },
        update: {
          $set: { clerkId, fullName, email, profilePic },
        },
        upsert: true,
      },
    })),
  );

  console.log(
    `Seeded users. Inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}, matched: ${result.matchedCount}`,
  );
}

seedDatabase()
  .catch((error) => {
    console.error("Failed to seed users:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });