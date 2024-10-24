import { Request, Response, NextFunction } from "express";
import { Category } from "../../../models/Categories";
import { CategoryDescription } from "../../../models/Categories";
import { AppError } from "../../../middleware/errors";
import logger from "../../../logs/logger";
import { client } from "../../../services/elasticsearch"; // Elasticsearch client
import { SearchResponse } from "@elastic/elasticsearch/lib/api/types"; // Importing the SearchResponse type

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

    // Fuzzy match for similar category names in Elasticsearch
    const similarCategories: SearchResponse<any> = await client.search({
      index: 'categories',
      body: {
        query: {
          fuzzy: {
            categoryName: {
              value: categoryName,
              fuzziness: 2, // Adjust fuzziness level based on tolerance
            },
          },
        },
      },
    });

    if (similarCategories.hits.hits.length > 0) {
      return res.status(400).json({
        status: "warning",
        message: `The category name '${categoryName}' is similar to an existing category. Please choose a more distinct name.`,
      });
    }

    // If parentCategory exists, validate it
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

    // Index new category in Elasticsearch
    await client.index({
      index: 'categories',
      id: savedCategory._id.toString(), // Ensure _id is a string
      body: {
        categoryName,
        description,
        meta_title,
        meta_description,
        meta_keyword,
        parentCategory,
      },
    });

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
