import { Request, Response, NextFunction } from "express";
import { Category } from "../../../models/Categories";
import { CategoryDescription } from "../../../models/Categories";
import { AppError } from "../../../middleware/errors";
import logger from "../../../logs/logger";

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
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
      return next(new AppError('Category name is required', 400));
    }
    
    let newLevel = 0;
    if (parentCategory) {
      const parentCat = await Category.findById(parentCategory);
      if (!parentCat) {
        return next(new AppError('Parent category not found', 404));
      }
      newLevel = parentCat.level + 1;
    }
    const newCategory = new Category({
      categoryName,
      parentCategory: parentCategory || null,
      level: newLevel,
      products: products || [],
      vendorId: vendorId || null,
      filters: filters || [],
    });

    const savedCategory = await newCategory.save();
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
