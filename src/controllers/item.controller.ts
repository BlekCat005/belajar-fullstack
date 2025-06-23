// Fullstack Web - Copy/be-web/src/controllers/item.controller.ts
import { Request, Response } from "express";
import ItemModel, { itemDTO, TypeItem } from "../models/item.model";
import response from "../utils/response";
import { IPaginationQuery } from "../utils/interfaces";
import { FilterQuery, SortOrder } from "mongoose"; // Import SortOrder

export default {
  // Membuat barang baru
  async create(req: Request, res: Response) {
    try {
      // Validasi body request menggunakan skema Yup
      await itemDTO.validate(req.body);
      const result = await ItemModel.create(req.body);
      response.success(res, result, "Barang berhasil ditambahkan");
    } catch (error) {
      response.error(res, error, "Gagal menambahkan barang");
    }
  },

  // Mendapatkan semua barang
  async getAll(req: Request, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search,
        sortBy, // Ambil parameter sortBy
        sortOrder = "desc", // Ambil parameter sortOrder, default ke 'desc'
      } = req.query as unknown as IPaginationQuery;

      const query: FilterQuery<TypeItem> = {};

      if (search) {
        Object.assign(query, {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        });
      }

      // Objek untuk konfigurasi sort
      const sort: { [key: string]: SortOrder } = {};

      if (sortBy) {
        // Jika sortBy diberikan, gunakan itu. Jika tidak, tetap gunakan createdAt.
        sort[sortBy] = sortOrder;
      } else {
        // Default sort jika sortBy tidak diberikan
        sort.createdAt = -1; // Urutkan berdasarkan tanggal pembuatan terbaru secara default
      }

      const result = await ItemModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort(sort) // Terapkan objek sort
        .exec();
      const count = await ItemModel.countDocuments(query);

      response.pagination(
        res,
        result,
        {
          total: count,
          current: page,
          totalPages: Math.ceil(count / limit),
        },
        "Berhasil menampilkan semua barang"
      );
    } catch (error) {
      response.error(res, error, "Gagal mendapatkan barang");
    }
  },

  // Mendapatkan satu barang berdasarkan ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await ItemModel.findById(id);

      if (!item) {
        return response.notFound(res, "Barang tidak ditemukan");
      }

      response.success(res, item, "Berhasil mendapatkan detail barang");
    } catch (error) {
      response.error(res, error, "Gagal mendapatkan detail barang");
    }
  },

  // Memperbarui barang berdasarkan ID
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Validasi body request
      await itemDTO.validate(req.body);

      // Cari dan perbarui, { new: true } mengembalikan dokumen yang sudah diperbarui
      const result = await ItemModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!result) {
        return response.notFound(res, "Barang tidak ditemukan");
      }

      response.success(res, result, "Barang berhasil diperbarui");
    } catch (error) {
      response.error(res, error, "Gagal memperbarui barang");
    }
  },

  // Menghapus barang berdasarkan ID
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ItemModel.findByIdAndDelete(id);

      if (!result) {
        return response.notFound(res, "Barang tidak ditemukan");
      }

      response.success(res, result, "Barang berhasil dihapus");
    } catch (error) {
      response.error(res, error, "Gagal menghapus barang");
    }
  },
};
