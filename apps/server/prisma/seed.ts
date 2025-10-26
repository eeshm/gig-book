import prisma from "../src/prisma.js";
import { Prisma } from "@prisma/client";

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data in dependency order to satisfy FK constraints
  await prisma.booking.deleteMany();
  await prisma.artistProfile.deleteMany();
  await prisma.venueProfile.deleteMany();
  await prisma.user.deleteMany();

  const aliceUser = await prisma.user.create({
    data: {
      name: "Alice DJ",
      email: "alice.dj@example.com",
      role: "ARTIST",
      password: "password123",
    },
  });

  const bobUser = await prisma.user.create({
    data: {
      name: "Bob Sax",
      email: "bob.sax@example.com",
      role: "ARTIST",
      password: "password123",
    },
  });

  const venueNovaUser = await prisma.user.create({
    data: {
      name: "Venue Nova",
      email: "events@venuenova.com",
      role: "VENUE",
      password: "securepass",
    },
  });

  const venueHarborUser = await prisma.user.create({
    data: {
      name: "Harbor Hall",
      email: "hello@harborhall.com",
      role: "VENUE",
      password: "securepass",
    },
  });

  const aliceProfile = await prisma.artistProfile.create({
    data: {
      userId: aliceUser.id,
      artistType: "DJ",
      location: "New York, USA",
      bio: "High-energy DJ bringing house and techno vibes to the dance floor.",
      pricePerGig: new Prisma.Decimal("750.00"),
      mediaUrls: [
        "https://example.com/media/alice/live-set",
        "https://example.com/media/alice/mixtape",
      ],
      availability: {
        friday: ["20:00-01:00"],
        saturday: ["21:00-02:00"],
      },
    },
  });

  const bobProfile = await prisma.artistProfile.create({
    data: {
      userId: bobUser.id,
      artistType: "INSTRUMENTALIST",
      location: "Chicago, USA",
      bio: "Saxophonist fusing jazz classics with modern R&B sounds.",
      pricePerGig: new Prisma.Decimal("550.00"),
      mediaUrls: ["https://example.com/media/bob/stage-session"],
      availability: {
        thursday: ["18:00-22:00"],
        sunday: ["16:00-20:00"],
      },
    },
  });

  const venueNovaProfile = await prisma.venueProfile.create({
    data: {
      userId: venueNovaUser.id,
      venueName: "Venue Nova",
      location: "Brooklyn, USA",
      description: "Modern rooftop lounge with skyline views and premium sound.",
    },
  });

  const harborHallProfile = await prisma.venueProfile.create({
    data: {
      userId: venueHarborUser.id,
      venueName: "Harbor Hall",
      location: "Boston, USA",
      description: "Waterfront event hall perfect for live performances and galas.",
    },
  });

  await prisma.booking.createMany({
    data: [
      {
        artistId: aliceProfile.id,
        venueId: venueNovaProfile.id,
        date: new Date("2025-11-15T21:00:00Z"),
        status: "ACCEPTED",
        message: "Confirmed fall rooftop party.",
      },
      {
        artistId: bobProfile.id,
        venueId: harborHallProfile.id,
        date: new Date("2025-12-05T19:00:00Z"),
        status: "PENDING",
        message: "Holiday jazz night awaiting confirmation.",
      },
      {
        artistId: aliceProfile.id,
        venueId: harborHallProfile.id,
        date: new Date("2026-01-20T22:00:00Z"),
        status: "PENDING",
        message: "Winter dance showcase proposal.",
      },
    ],
  });

  console.log("✅ Seed data inserted successfully.");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
