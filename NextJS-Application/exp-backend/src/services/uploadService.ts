import { Request, Response } from "express";
import Papa from "papaparse";
import prisma from "../prisma/prismaClient";
import fs from "fs";
import { promisify } from "util";

interface CSVRow {
  companyName: string;
  status?: string;
  industry?: string;
  phone?: string;
  email?: string;
  source?: string;
  website?: string;
  description?: string;
  contactName: string;
  title?: string;
  contactEmail?: string;
  contactPhone?: string;
  position?: string;
  contactDetails?: string;
}

const unlinkAsync = promisify(fs.unlink);

export const handleCSVUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "failed",
        message: "No file uploaded.",
      });
    }

    const userId = parseInt(req.cookies.userId || "", 10);
    if (!userId) {
      return res.status(401).json({
        status: "failed",
        message: "User not authenticated.",
      });
    }

    const filePath = req.file.path;
    const fileStream = fs.createReadStream(filePath, { encoding: "utf8" });
    const errors: string[] = [];

    Papa.parse(fileStream, {
      header: true,
      skipEmptyLines: true,
      worker: true,
      step: async (row, parser) => {
        const data = row.data as CSVRow;
        const {
          companyName,
          status = "Potential",
          industry,
          phone,
          email,
          source,
          website,
          description,
          contactName,
          title,
          contactEmail,
          contactPhone,
          position,
          contactDetails,
        } = data;

        if (!companyName || !contactName) {
          errors.push(
            `Row missing ${!companyName ? "companyName" : "contactName"}`
          );
          return;
        }

        try {
          await prisma.lead.create({
            data: {
              companyName,
              status,
              industry,
              phone,
              email,
              source,
              website,
              description,
              userId: Number(userId),
              contacts: {
                create: [
                  {
                    contactName,
                    title,
                    email: contactEmail,
                    phone: contactPhone,
                    position,
                    contactDetails,
                  },
                ],
              },
            },
          });
        } catch (dbError) {
          console.error("Error saving data to the database:", dbError);
          errors.push(`Error saving lead for company ${companyName}`);
        }
      },
      complete: async () => {
        try {
          await unlinkAsync(filePath);

          if (errors.length > 0) {
            return res.status(400).json({
              status: "partial_success",
              message: "CSV imported with some errors.",
              errors,
            });
          }

          return res.status(200).json({
            status: "success",
            message: "CSV data successfully imported.",
          });
        } catch (error) {
          console.error("Error during completion:", error);
          return res.status(500).json({
            status: "failed",
            message: "Error during file cleanup or final processing.",
          });
        }
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        return res.status(500).send("Error parsing CSV.");
      },
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).send("Error processing file.");
  }
};
