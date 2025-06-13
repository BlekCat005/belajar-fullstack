import mongoose, { Document } from "mongoose";
import * as Yup from "yup";

export const ITEM_MODEL_NAME = "Item";

// Skema validasi Yup untuk data barang yang masuk
export const itemDTO = Yup.object({
  name: Yup.string().required("Nama barang tidak boleh kosong"),
  description: Yup.string(),
  price: Yup.number()
    .required("Harga tidak boleh kosong")
    .min(0, "Harga tidak boleh negatif"),
  stock: Yup.number()
    .required("Stok tidak boleh kosong")
    .integer("Stok harus berupa angka bulat")
    .min(0, "Stok tidak boleh negatif"),
  imageUrl: Yup.string().url("URL gambar tidak valid").optional(),
});

// TypeScript type yang diambil dari skema Yup
export type TypeItem = Yup.InferType<typeof itemDTO>;

// Interface untuk dokumen Mongoose
export interface Item extends TypeItem, Document {}

const Schema = mongoose.Schema;

// Skema Mongoose untuk koleksi 'items' di database
const ItemSchema = new Schema<Item>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
    },
    stock: {
      type: Schema.Types.Number,
      required: true,
    },
    imageUrl: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
  }
);

const ItemModel = mongoose.model<Item>(ITEM_MODEL_NAME, ItemSchema);

export default ItemModel;
