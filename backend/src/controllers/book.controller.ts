import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";
import { CreateBookDto, UpdateBookDto } from "../types/index.js";
import { prisma } from "../lib/db.js";

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      status: "success",
      results: books.length,
      data: { books },
    });
  } catch (error) {
    next(error);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, author, pageCount }: CreateBookDto = req.body;

    if (!name || !author || pageCount === undefined) {
      return next(
        new AppError("Please provide name, author, and pageCount", 400),
      );
    }

    if (typeof pageCount !== "number" || pageCount <= 0) {
      return next(new AppError("pageCount must be a positive number", 400));
    }

    const newBook = await prisma.book.create({
      data: {
        name,
        author,
        pageCount: Number(pageCount),
      },
    });

    res.status(201).json({
      status: "success",
      data: { book: newBook },
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return next(new AppError("Book not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const { name, author, pageCount }: UpdateBookDto = req.body;

    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      return next(new AppError("Book not found", 404));
    }

    const updateData: Record<string, any> = {};

    if (name) updateData.name = name;
    if (author) updateData.author = author;
    if (pageCount !== undefined) {
      if (typeof pageCount !== "number" || pageCount <= 0) {
        return next(new AppError("pageCount must be a positive number", 400));
      }
      updateData.pageCount = Number(pageCount);
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      status: "success",
      data: { book: updatedBook },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    const existingBook = await prisma.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      return next(new AppError("Book not found", 404));
    }

    await prisma.book.delete({
      where: { id },
    });

    res.status(200).json({
      status: "success",
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
