import axios from "axios";
import { axiosJWT } from "./UserServices";

export const getAllProduct = async (search, limit, searchBy, currentPage) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all?filter=${searchBy ?? "name"
    }&filter=${search ?? ""}&limit=${limit}&page=${currentPage}`
  );
  return res.data;
};

export const filterProduct = async (filters) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/product-filter`,
    filters,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return res.data;
};
export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-details/${id}`
  );
  return res.data;
};

export const updateProduct = async (data) => {
  console.log(data);
  // console.log(id);
  // console.log("actk", access_token.access_token);
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update/${data.id}`,
    data,
    {
      headers: {
        token: `Bearer ${data.access_token}`,
      },
    }
  );

  return res;
};
export const deteleProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/product/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );

  return res;
};
export const deleteManyProduct = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/product/delete-many`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );

  return res;
};

export const getNewestProducts = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-newest`
  );
  return res;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all-type`
  );
  return res;
};

export const inventory = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/products`
  );
  return res;
};
