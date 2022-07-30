import { Card, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function Products(props) {
  return (
    <>
      {props.products ? (
        <div className="productGrid">
          {props.products.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`}>
              <div className="gridItem">
                <ProductCard product={product} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <Box sx={{ minWidth: 255 }}>
            <div className="productGrid">
              <Card variant="outlined">
                <Skeleton variant="rectangular" width={255} height={230} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Card>
              <Card variant="outlined">
                <Skeleton variant="rectangular" width={255} height={230} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Card>
              <Card variant="outlined">
                <Skeleton variant="rectangular" width={255} height={230} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Card>
            </div>
          </Box>
        </div>
      )}
    </>
  );
}

export default Products;
