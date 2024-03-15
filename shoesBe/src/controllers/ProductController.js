const Product = require("../models/ProductModel");
const ProductServices = require("../services/ProductServices");
const { isEmpty } = require("lodash");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      color,
      size,
      brand,
    } = req.body.allData;
    // console.log(req.body.allData);
    if (
      !name ||
      !image ||
      !type ||
      !price ||
      !countInStock ||
      !description ||
      !color ||
      !size ||
      !brand
    ) {
      // console.log('thieu du lieu');
      return res.status(422).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await ProductServices.createProduct(req.body.allData);
    return res.status(200).json(response);
  } catch (e) {
    // console.log(e);
    return res.status(400).json({
      message: e,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    // console.log(data);
    if (!productId) {
      return res.status(422).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductServices.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(422).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductServices.getDetailProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(422).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductServices.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(422).json({
        status: "ERR",
        message: "The ids is required",
      });
    }

    const response = await ProductServices.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    const response = await ProductServices.getAllProduct(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const getAllType = async (req, res) => {
  try {
    const response = await ProductServices.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};

const getNewestProduct = async (req, res) => {
  try {
    const response = await ProductServices.getNewestProduct();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
const getPr = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStock = products.map((product) => {
      return {
        _id: product._id,
        name: product.name,
        type: product.type,
        price: product.price,
        countInStock: product.countInStock,
      };
    });

    res.json(productsWithStock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};
const productFilter = async (req, res) => {
  try {
    const { search, brands, types, page, limit } = req.body;
    console.log(types);
    const currentPage = page ?? 1;
    const _limit = limit ?? 20;
    // console.log("eeee >>", search);

    // Xây dựng bộ lọc động dựa trên các trường có sẵn
    const filters = {};

    if (!isEmpty(search)) {
      filters["$and"] = [{ name: { $regex: search, $options: "i" } }];
    }

    if (!isEmpty(brands)) {
      filters["$and"].push({ brand: { $in: brands } });
    }

    if (!isEmpty(types)) {
      filters["$and"] = filters["$and"] || [];
      filters["$and"].push({ type: { $in: types } });
    }

    // console.log("lelele", JSON.stringify(filters));
    // console.log("aaaaa >> ", a)
    const [len, ress] = await Promise.all([
      Product.find({ ...filters }).countDocuments(),
      Product.find({ ...filters })
        .limit(_limit)
        .skip((currentPage - 1) * _limit)
        .sort({ updatedAt: -1 }),
    ]);
    const totalPages = Math.ceil(len / +_limit);
    return res.json({
      type: "Success",
      message: "Get data from filter success",
      result: ress,
      limit: _limit,
      currentPage,
      totalResult: len,
      totalPages,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ type: "Error", message: error?.message ?? error, result: [] });
  }
}
module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  deleteMany,
  getAllProduct,
  getAllType,
  getNewestProduct,
  getPr,
  productFilter
};
