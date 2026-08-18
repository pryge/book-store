import { Router } from 'express';
import {
  getBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/book.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { restrictTo } from '../middlewares/role.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', getBooks);
router.get('/:id', getBookById);

router.post('/', restrictTo('admin'), createBook);
router.put('/:id', restrictTo('admin'), updateBook);
router.patch('/:id', restrictTo('admin'), updateBook);
router.delete('/:id', restrictTo('admin'), deleteBook);

export default router;
