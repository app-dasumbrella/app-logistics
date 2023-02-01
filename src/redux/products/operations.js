/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

 import { Languages } from "@common";
import * as actions from "./actions";
import productData from "./../../data/json/products_1.2.json";
import CategoryData from "./../../data/json/category_1.0.json";

const PER_PAGE = 10;
/**
 * fetch all product
 */
export const fetchAllProducts = (pageSize = PER_PAGE) => (dispatch) => {
  ///console.log("productData fetchAllProducts",productData)
  //  dispatch(actions.productAllPending());
  //    dispatch(actions.productAllSuccess(json));
  // dispatch(actions.productAllFailure(error));
};

/**
 * fetch more all product
 */
export const fetchMoreAllProducts = ({ cursor }) => (dispatch) => {
  //console.log("productData fetchMoreAllProducts",productData)
  //// if (!cursor) return;
  // dispatch(actions.productAllMorePending());
  //  return GraphqlAPI.getProducts({ cursor, pageSize: PER_PAGE })
  //   .then((json) => {
  //     if (!json) {
  //       dispatch(actions.productAllMoreFailure(Languages.getDataError));
  //     } else if (json.code) {
  //       dispatch(actions.productAllMoreFailure(json.message));
  //     } else {
  //       dispatch(actions.productAllMoreSuccess(json));
  //     }
  //   })
  //   .catch((error) => {
  //     dispatch(actions.productAllMoreFailure(error));
  //   });
};

/**
 * @function fetchProductsByCategoryId
 * get product by collection id
 * @param {*} { categoryId }
 */
export const fetchProductsByCategoryId = ({ categoryId }) => (dispatch) => {
  let productlist = CategoryData.categories.list.filter(
    (item) => item.id == categoryId
  );
  let list = []
  productlist &&
    productlist[0].products.map((ids) => {
      productData.list.map((res) => {
        if (res.id === ids) {
          list.push(res);
        }
      });
    });

  console.log(list);
  dispatch(actions.productSuccess({list}));
};

/**
 * @function fetchProductsByCategoryIdNextPage
 * get more product by collection id
 * @param {*} { cursor, categoryId }
 */
export const fetchProductsByCategoryIdNextPage = ({ cursor, categoryId }) => (
  dispatch
) => {
  if (!cursor) return;
  dispatch(actions.productMorePending());
  
};

/**
 * @function fetchRelatedProduct fetch related products
 * do not use redux to store, only use function to sync another services
 */
export const fetchRelatedProduct = ({ query }) => {
  try {
  
  } catch (error) {
    console.warn(error);
  }
};

/**
 * @function fetchProductByName search product
 * do not use redux to store, only use function to sync another services
 */
export const fetchProductByName = ({ query, cursor }, callback) => (
  dispatch
) => {
  try {
    let list = productData.list.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    callback({ list });
  } catch (error) {
    console.warn(error);
  }
};
