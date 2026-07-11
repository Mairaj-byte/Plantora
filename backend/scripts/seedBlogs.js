import mongoose from "mongoose";
import dotenv from "dotenv";
import blogModel from "../models/blogModel.js";

dotenv.config();

const blogs = [
  {
    category: "LANDSCAPING",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
    date: "18/7/2026",
    author: "Eco-Garden Design Team",
    readTime: "6 min read",
    title: "Transform Your Outdoor Space with Smart Landscape Design",
    summary:
      "Learn how thoughtful landscaping, plant selection, and garden layouts can create a beautiful, functional, and low-maintenance outdoor environment.",
    paragraph:
      "A well-designed landscape enhances both the beauty and value of your property while creating a peaceful outdoor retreat. The first step is understanding your available space, sunlight conditions, and soil quality before selecting suitable plants. Combine evergreen shrubs, flowering plants, ornamental grasses, and small trees to maintain visual interest throughout the year. Creating pathways using natural stone or gravel improves accessibility while adding structure to the garden. Installing mulch around plants helps retain moisture, suppress weeds, and improve soil health over time. Consider adding features such as water fountains, decorative rocks, or wooden seating areas to make the space more inviting. Grouping plants with similar water and sunlight requirements also simplifies maintenance and promotes healthier growth. By planning your landscape carefully and choosing plants that suit your local climate, you can create an outdoor area that remains attractive, sustainable, and enjoyable for years to come."
  },

  {
    category: "SUSTAINABILITY",
    image: "https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=600&auto=format&fit=crop",
    date: "20/7/2026",
    author: "Eco-Garden Sustainability Team",
    readTime: "5 min read",
    title: "Simple Sustainable Gardening Practices for Every Home",
    summary:
      "Reduce waste, conserve water, and grow healthier plants by adopting eco-friendly gardening methods that benefit both your garden and the environment.",
    paragraph:
      "Sustainable gardening focuses on working with nature while reducing environmental impact. One of the easiest ways to begin is by collecting rainwater for irrigation, helping conserve fresh water during dry seasons. Composting kitchen scraps and garden waste creates nutrient-rich organic fertilizer that improves soil structure without relying on chemical products. Native plants require less water and maintenance because they are naturally adapted to local weather conditions. Avoid excessive pesticide use by encouraging beneficial insects such as ladybugs and bees, which help control pests and improve pollination. Reusing old containers, wooden pallets, and biodegradable pots also minimizes waste while giving your garden a creative touch. Mulching around plants keeps the soil cool, reduces evaporation, and limits weed growth naturally. Every small sustainable practice contributes to a healthier ecosystem, allowing your garden to thrive while supporting biodiversity and protecting natural resources for future generations."
  },

  {
    category: "SEASONAL PLANTS",
    image: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=600&auto=format&fit=crop",
    date: "23/7/2026",
    author: "Eco-Garden Nursery",
    readTime: "7 min read",
    title: "Choosing the Best Seasonal Plants for Year-Round Color",
    summary:
      "Discover how selecting seasonal flowering plants can keep your garden vibrant, colorful, and full of life throughout every season.",
    paragraph:
      "Growing seasonal plants is one of the best ways to ensure your garden remains attractive throughout the year. Different flowers and ornamental plants thrive during specific weather conditions, making seasonal planning essential for continuous blooms. During cooler months, marigolds, petunias, and pansies provide bright colors, while summer gardens flourish with hibiscus, zinnias, and sunflowers. Understanding your local climate helps you choose varieties that require less maintenance and perform better naturally. Preparing the soil with organic compost before planting encourages strong root development and healthier flowering. Deadheading faded blooms regularly promotes continuous flowering and keeps plants looking fresh. Proper spacing between plants allows better air circulation, reducing the risk of fungal diseases. By combining plants from different blooming seasons, you can enjoy a lively, colorful garden that changes beautifully throughout the year while attracting butterflies, bees, and other beneficial pollinators."
  }
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Optional: Remove existing blogs
    // await blogModel.deleteMany();

    await blogModel.insertMany(blogs);

    console.log("Blogs inserted successfully.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedBlogs();