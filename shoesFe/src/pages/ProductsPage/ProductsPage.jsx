import { Col, Pagination, Row } from "antd";
import React, { useEffect } from "react";
import { WrapperNavbar, WrapperProducts } from "../TypeProductPage/style";
import { useDispatch, useSelector } from "react-redux";

import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponents from "../../components/NavbarComponents/NavbarComponent";
import { ProductSlice } from "../../redux/slice/ProductSlice";
import { fetchAllProducts, filterAllProducts } from "./api";
import { productStateSelector } from "./selector";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const state = useSelector(productStateSelector);

  const { updateCurrentPage } = ProductSlice.actions;

  const { products, limit, search, searchBy, currentPage, total, filter } = state;

  useEffect(() => {
    dispatch(
      filterAllProducts({ ...filter, page: currentPage, limit })
    );
  }, [filter, currentPage, limit]);

  return (
    <div style={{ padding: "0 120px", background: "#efefef" }}>
      <Row style={{ flexWrap: "nowrap", paddingTop: "10px", marginBottom: '30px' }}>
        <WrapperNavbar span={4}>
          <NavbarComponents />
        </WrapperNavbar>
        <Col>
          <WrapperProducts span={20}>
            {products.map((product) => (
              <CardComponent
                key={product._id}
                id={product._id}
                image={product.image}
                price={product.price}
                name={product.name}
              />
            ))}
          </WrapperProducts>
          <Pagination
            size="small"
            current={currentPage}
            pageSize={limit}
            total={total}
            onChange={(newPage) => dispatch(updateCurrentPage(newPage))}
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "16px",
              fontWeight: "600",
              height: "34px",
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
export default ProductsPage;
