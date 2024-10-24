import { Request, Response, NextFunction } from "express";
import { Category } from "../../../models/Categories";
import { CategoryDescription } from "../../../models/Categories";
import { AppError } from "../../../middleware/errors";
import logger from "../../../logs/logger";
import stringSimilarity from "string-similarity"; // Add this library to your project (npm install string-similarity)

export const CreateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      categoryName,
      parentCategory,
      products,
      vendorId,
      description,
      meta_title,
      meta_description,
      meta_keyword,
      image,
      filters,
      displayOrder,
    } = req.body;

    if (!categoryName) {
      return res.status(400).json({
        status: "failed",
        message: "Category name is required.",
      });
    }
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({
        status: "failed",
        message: `Category name '${categoryName}' already exists. Please choose a different name.`,
      });
    }
    const allCategories = await Category.find({});
    const categoryNames = allCategories.map(cat => cat.categoryName);
    const similarityThreshold = 0.8; 

    const matches = stringSimilarity.findBestMatch(categoryName, categoryNames);
    if (matches.bestMatch.rating >= similarityThreshold) {
      return res.status(400).json({
        status: "warning",
        message: `The category name '${categoryName}' is similar to an existing category '${matches.bestMatch.target}'. Consider using a more distinct name.`,
      });
    }
    let newLevel = 0;
    if (parentCategory) {
      const parentCat = await Category.findById(parentCategory);
      if (!parentCat) {
        return res.status(404).json({
          status: "failed",
          message: "Parent category not found",
        });
      }
      newLevel = parentCat.level + 1;
    }

    // Create new category
    const newCategory = new Category({
      categoryName,
      parentCategory: parentCategory || null,
      level: newLevel,
      products: products || [],
      vendorId: vendorId || null,
      filters: filters || [],
    });

    const savedCategory = await newCategory.save();

    // Create category description
    const newCategoryDescription = new CategoryDescription({
      categoryId: savedCategory._id,
      categoryName,
      description: description || "",
      meta_title: meta_title || "",
      meta_description: meta_description || "",
      meta_keyword: meta_keyword || [],
      image: image || "",
      displayOrder: displayOrder || 0,
    });

    await newCategoryDescription.save();

    res.status(201).json({
      message: "Category and Category Description created successfully",
      category: savedCategory,
      categoryDescription: newCategoryDescription,
    });
    
  } catch (error: any) {
    logger.error(error.message, { stack: error.stack });
    next(new AppError('An error occurred while creating the category', 500));
  }
};
