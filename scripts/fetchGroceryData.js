import fs from 'fs';

// Function to create Indian grocery data
async function fetchGroceryData() {
  try {
    console.log('Creating Indian grocery data...');
    
    // Import the Indian grocery items from the update script
    // For now, we'll use the same data structure
    const indianGroceryItems = [
      // Grains & Pulses
      { id: 1, name: "Basmati Rice (Premium)", description: "Premium long grain basmati rice, 1 kg pack", price: 4.5, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400", category: "Grains & Pulses", stock: 100, rating: 4.8, unit: "per kg", bestSeller: true },
      { id: 2, name: "Toor Dal (Split Pigeon Peas)", description: "Fresh toor dal, rich in protein, 1 kg", price: 2.2, image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400", category: "Grains & Pulses", stock: 80, rating: 4.6, unit: "per kg", discountPercentage: 15 },
      { id: 3, name: "Moong Dal (Split Green Gram)", description: "Organic moong dal, 1 kg pack", price: 2.5, image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400", category: "Grains & Pulses", stock: 75, rating: 4.7, unit: "per kg" },
      { id: 4, name: "Chana Dal (Split Bengal Gram)", description: "Premium chana dal, 1 kg", price: 2.8, image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400", category: "Grains & Pulses", stock: 90, rating: 4.5, unit: "per kg", discountPercentage: 12 },
      { id: 5, name: "Whole Wheat Atta", description: "Freshly milled whole wheat flour, 5 kg", price: 3.2, image: "https://images.unsplash.com/photo-1612929633736-8b8b2de9c9b3?w=400", category: "Grains & Pulses", stock: 60, rating: 4.9, unit: "per pack", bestSeller: true },
      { id: 6, name: "Masoor Dal (Red Lentils)", description: "Premium red lentils, 1 kg", price: 2.3, image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=400", category: "Grains & Pulses", stock: 85, rating: 4.6, unit: "per kg" },
      
      // Spices & Condiments
      { id: 7, name: "Turmeric Powder (Haldi)", description: "Pure turmeric powder, 200g", price: 1.8, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", category: "Spices & Condiments", stock: 120, rating: 4.7, unit: "per pack", bestSeller: true },
      { id: 8, name: "Red Chili Powder", description: "Spicy red chili powder, 200g", price: 1.5, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", category: "Spices & Condiments", stock: 110, rating: 4.5, unit: "per pack" },
      { id: 9, name: "Garam Masala", description: "Aromatic garam masala blend, 100g", price: 2.5, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", category: "Spices & Condiments", stock: 95, rating: 4.8, unit: "per pack", discountPercentage: 20 },
      { id: 10, name: "Cumin Seeds (Jeera)", description: "Whole cumin seeds, 200g", price: 2.0, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", category: "Spices & Condiments", stock: 100, rating: 4.6, unit: "per pack" },
      { id: 11, name: "Coriander Powder", description: "Fresh coriander powder, 200g", price: 1.6, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", category: "Spices & Condiments", stock: 105, rating: 4.5, unit: "per pack" },
      { id: 12, name: "Mustard Seeds (Rai)", description: "Whole mustard seeds, 200g", price: 1.8, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400", category: "Spices & Condiments", stock: 90, rating: 4.4, unit: "per pack" },
      
      // Oils & Ghee
      { id: 13, name: "Mustard Oil (Sarson Ka Tel)", description: "Pure mustard oil, 1 liter", price: 3.5, image: "https://images.unsplash.com/photo-1474979266404-7eaacb8be65f?w=400", category: "Oils & Ghee", stock: 70, rating: 4.7, unit: "per liter", bestSeller: true },
      { id: 14, name: "Desi Ghee (Clarified Butter)", description: "Pure desi ghee, 500g", price: 8.5, image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400", category: "Oils & Ghee", stock: 50, rating: 4.9, unit: "per pack", discountPercentage: 18 },
      { id: 15, name: "Coconut Oil", description: "Virgin coconut oil, 1 liter", price: 4.2, image: "https://images.unsplash.com/photo-1474979266404-7eaacb8be65f?w=400", category: "Oils & Ghee", stock: 65, rating: 4.6, unit: "per liter" },
      { id: 16, name: "Sunflower Oil", description: "Refined sunflower oil, 1 liter", price: 2.8, image: "https://images.unsplash.com/photo-1474979266404-7eaacb8be65f?w=400", category: "Oils & Ghee", stock: 80, rating: 4.5, unit: "per liter" },
      
      // Fresh Vegetables
      { id: 17, name: "Fresh Tomatoes", description: "Fresh red tomatoes, 1 kg", price: 1.2, image: "https://images.unsplash.com/photo-1546098492-46b3c0271a3d?w=400", category: "Fresh Vegetables", stock: 150, rating: 4.5, unit: "per kg", bestSeller: true },
      { id: 18, name: "Onions", description: "Fresh onions, 1 kg", price: 0.8, image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400", category: "Fresh Vegetables", stock: 200, rating: 4.4, unit: "per kg", discountPercentage: 10 },
      { id: 19, name: "Potatoes", description: "Fresh potatoes, 1 kg", price: 0.9, image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400", category: "Fresh Vegetables", stock: 180, rating: 4.5, unit: "per kg" },
      { id: 20, name: "Okra (Bhindi)", description: "Fresh okra, 500g", price: 1.5, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", category: "Fresh Vegetables", stock: 60, rating: 4.6, unit: "per pack" },
      { id: 21, name: "Brinjal (Baingan)", description: "Fresh brinjal, 1 kg", price: 1.3, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", category: "Fresh Vegetables", stock: 70, rating: 4.5, unit: "per kg" },
      { id: 22, name: "Cauliflower (Gobi)", description: "Fresh cauliflower, 1 piece", price: 1.8, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", category: "Fresh Vegetables", stock: 40, rating: 4.6, unit: "per piece" },
      { id: 23, name: "Cabbage (Patta Gobi)", description: "Fresh cabbage, 1 piece", price: 1.2, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", category: "Fresh Vegetables", stock: 50, rating: 4.4, unit: "per piece" },
      { id: 24, name: "Carrots", description: "Fresh carrots, 1 kg", price: 1.0, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", category: "Fresh Vegetables", stock: 90, rating: 4.5, unit: "per kg" },
      { id: 25, name: "Green Chilies", description: "Fresh green chilies, 200g", price: 0.8, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", category: "Fresh Vegetables", stock: 100, rating: 4.3, unit: "per pack" },
      { id: 26, name: "Curry Leaves", description: "Fresh curry leaves, 100g", price: 0.5, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400", category: "Fresh Vegetables", stock: 80, rating: 4.7, unit: "per pack" },
      
      // Fresh Fruits
      { id: 27, name: "Bananas", description: "Fresh yellow bananas, 1 dozen", price: 1.5, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400", category: "Fresh Fruits", stock: 120, rating: 4.6, unit: "per dozen", bestSeller: true },
      { id: 28, name: "Mangoes (Alphonso)", description: "Premium Alphonso mangoes, 1 kg", price: 4.5, image: "https://images.unsplash.com/photo-1605027990121-1a0e4e1a0e4e?w=400", category: "Fresh Fruits", stock: 30, rating: 4.9, unit: "per kg", discountPercentage: 25 },
      { id: 29, name: "Apples (Kashmiri)", description: "Fresh Kashmiri apples, 1 kg", price: 2.8, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400", category: "Fresh Fruits", stock: 60, rating: 4.7, unit: "per kg" },
      { id: 30, name: "Oranges", description: "Fresh oranges, 1 kg", price: 2.2, image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f4?w=400", category: "Fresh Fruits", stock: 70, rating: 4.5, unit: "per kg" },
      { id: 31, name: "Pomegranate (Anar)", description: "Fresh pomegranate, 1 kg", price: 3.5, image: "https://images.unsplash.com/photo-1605027990121-1a0e4e1a0e4e?w=400", category: "Fresh Fruits", stock: 40, rating: 4.6, unit: "per kg" },
      { id: 32, name: "Grapes", description: "Fresh grapes, 1 kg", price: 2.5, image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f4?w=400", category: "Fresh Fruits", stock: 50, rating: 4.4, unit: "per kg" },
      
      // Dairy Products
      { id: 33, name: "Full Cream Milk", description: "Fresh full cream milk, 1 liter", price: 1.2, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400", category: "Dairy Products", stock: 200, rating: 4.7, unit: "per liter", bestSeller: true },
      { id: 34, name: "Paneer (Cottage Cheese)", description: "Fresh paneer, 250g", price: 3.5, image: "https://images.unsplash.com/photo-1618164436269-4473940d1f5c?w=400", category: "Dairy Products", stock: 80, rating: 4.8, unit: "per pack", discountPercentage: 15 },
      { id: 35, name: "Curd (Dahi)", description: "Fresh homemade curd, 500g", price: 1.5, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400", category: "Dairy Products", stock: 100, rating: 4.6, unit: "per pack" },
      { id: 36, name: "Butter", description: "Fresh butter, 100g", price: 1.8, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400", category: "Dairy Products", stock: 90, rating: 4.5, unit: "per pack" },
      { id: 37, name: "Eggs (Farm Fresh)", description: "Farm fresh eggs, 12 pieces", price: 1.8, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400", category: "Dairy Products", stock: 150, rating: 4.7, unit: "per dozen" },
      
      // Snacks & Namkeen
      { id: 38, name: "Namkeen Mix", description: "Assorted namkeen mix, 500g", price: 2.5, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400", category: "Snacks & Namkeen", stock: 80, rating: 4.6, unit: "per pack", discountPercentage: 12 },
      { id: 39, name: "Bhujia", description: "Crispy bhujia, 500g", price: 2.2, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400", category: "Snacks & Namkeen", stock: 70, rating: 4.5, unit: "per pack" },
      { id: 40, name: "Mathri", description: "Crispy mathri, 500g", price: 2.8, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400", category: "Snacks & Namkeen", stock: 60, rating: 4.7, unit: "per pack" },
      { id: 41, name: "Papad (Lijjat)", description: "Crispy papad, 200g", price: 1.5, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400", category: "Snacks & Namkeen", stock: 100, rating: 4.4, unit: "per pack" },
      
      // Beverages
      { id: 42, name: "Tea Leaves (Assam)", description: "Premium Assam tea, 500g", price: 3.5, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400", category: "Beverages", stock: 90, rating: 4.8, unit: "per pack", bestSeller: true },
      { id: 43, name: "Coffee Powder", description: "Filter coffee powder, 200g", price: 4.2, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400", category: "Beverages", stock: 75, rating: 4.7, unit: "per pack" },
      { id: 44, name: "Sugar (White)", description: "Pure white sugar, 1 kg", price: 1.5, image: "https://images.unsplash.com/photo-1580836812367-1e9d0e0b5b0c?w=400", category: "Beverages", stock: 150, rating: 4.5, unit: "per kg" },
      { id: 45, name: "Salt (Iodized)", description: "Iodized table salt, 1 kg", price: 0.5, image: "https://images.unsplash.com/photo-1580836812367-1e9d0e0b5b0c?w=400", category: "Beverages", stock: 200, rating: 4.4, unit: "per kg" },
      
      // Household Essentials
      { id: 46, name: "Detergent Powder", description: "Laundry detergent, 1 kg", price: 3.8, image: "https://images.unsplash.com/photo-1628177142898-93e36b4c85f6?w=400", category: "Household Essentials", stock: 100, rating: 4.6, unit: "per pack", discountPercentage: 18 },
      { id: 47, name: "Dish Soap", description: "Liquid dish soap, 750ml", price: 2.2, image: "https://images.unsplash.com/photo-1628177142898-93e36b4c85f6?w=400", category: "Household Essentials", stock: 120, rating: 4.5, unit: "per bottle" },
      { id: 48, name: "Toilet Cleaner", description: "Bathroom cleaner, 500ml", price: 2.5, image: "https://images.unsplash.com/photo-1628177142898-93e36b4c85f6?w=400", category: "Household Essentials", stock: 80, rating: 4.4, unit: "per bottle" },
      { id: 49, name: "Floor Cleaner", description: "Multi-surface cleaner, 1 liter", price: 2.8, image: "https://images.unsplash.com/photo-1628177142898-93e36b4c85f6?w=400", category: "Household Essentials", stock: 90, rating: 4.5, unit: "per bottle" },
      
      // Bakery Items
      { id: 50, name: "White Bread", description: "Fresh white bread, 400g", price: 1.2, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400", category: "Bakery", stock: 100, rating: 4.5, unit: "per loaf" },
      { id: 51, name: "Biscuits (Parle-G)", description: "Glucose biscuits, 500g", price: 1.8, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400", category: "Bakery", stock: 150, rating: 4.7, unit: "per pack", bestSeller: true },
      { id: 52, name: "Rusk (Toast)", description: "Crispy rusk, 300g", price: 2.2, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400", category: "Bakery", stock: 70, rating: 4.4, unit: "per pack" }
    ];

    // Read existing db.json to preserve users, carts, and orders
    let dbData = { products: [], users: [], carts: [], orders: [] };
    if (fs.existsSync('./db.json')) {
      const existingData = fs.readFileSync('./db.json', 'utf8');
      dbData = JSON.parse(existingData);
    }

    // Update products with Indian grocery items
    dbData.products = indianGroceryItems.map(item => ({
      ...item,
      createdAt: new Date().toISOString()
    }));

    // Write to db.json
    fs.writeFileSync('./db.json', JSON.stringify(dbData, null, 2));
    console.log(`✅ Successfully updated db.json with ${indianGroceryItems.length} Indian grocery items`);
    
  } catch (error) {
    console.error('Error creating grocery data:', error.message);
  }
}

// Run the function
fetchGroceryData();
