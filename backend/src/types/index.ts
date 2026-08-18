import { Role } from '../generated/prisma/client.js';
import { Request } from 'express';

export interface JWTPayload {
  id: string;
  email: string;
  role: Role;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export interface CreateBookDto {
  name: string;
  author: string;
  pageCount: number;
}

export interface UpdateBookDto {
  name?: string;
  author?: string;
  pageCount?: number;
}