const pool = require('./db');

const perfumes = [
  { name: "Velvet Blue", gender: "Male", price: 3000, size: 10, image: "VelvetBlue.png" },
  { name: "Pink Nectar", gender: "Female", price: 3000, size: 10, image: "PinkNectar.png" },
  { name: "Golden Zest", gender: "Unisex", price: 3000, size: 10, image: "GoldenZest.png" },
  { name: "Summer Orchard", gender: "Unisex", price: 3000, size: 10, image: "SummerOrchard.png" },
];

const seedData = async () => {
  try {
    console.log("🌱 Seeding perfumes...");

    for (let perfume of perfumes) {
      const query = `
        INSERT INTO perfumes (name, stock_qty, price, gender, size_ml, picture_url)
        VALUES ($1, $2, $3, $4, $5, $6)

      `;
      
      await pool.query(query, [
        perfume.name, 
        100, 
        perfume.price, 
        perfume.gender, 
        perfume.size, 
        perfume.image
      ]);
    }

    console.log("✅ Seed completed successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
};

seedData(); // Don't forget to actually CALL the function!