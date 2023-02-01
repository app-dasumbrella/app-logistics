/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

 import { HorizonLayouts, Languages } from "@common";
import * as actions from "./actions";
import CategoryData from "./../../data/json/category_1.0.json";
import ProductData from "./../../data/json/products_1.2.json";

const PER_PAGE = 10;
/**
 * fetch all product based on Config Horizontal
 * horizontal mode layout
 */
export const fetchAllProductsLayout = () => (dispatch) => {
  dispatch(actions.layoutAllPending());
  let promises = [];
  HorizonLayouts.map((layout, index) => {
    // fetch articles
    if (!layout.categoryId && layout.type === "article") {
      return promises.push(dispatch(fetchArticlessLayout({ index })));
    }
    return promises.push(
      dispatch(
        fetchProductsLayout({
          categoryId: layout.categoryId,
          tagId: layout.tag,
          index,
        })
      )
    );
  });
  Promise.all(promises).then(() => {
    dispatch(actions.layoutAllSuccess());
  });
};

export const fetchFeatured = () => (dispatch) => {
  let products = [],
    completelist = [];
    let productlist=  CategoryData.categories.list 
    productlist.map((item, index) => {
    products = [];
    item.products.map((ids) => {
      ProductData.list.map((res) => {
        if (res.id === ids) {
          products.push(res);
        }
      });
    });
    completelist.push({ list: products, name: item.title });
  });

  dispatch(actions.layoutAllfeature(completelist));
  return [];
};

/**
 * load more
 */
export const fetchProductLayoutNextPage = ({ cursor, index, categoryId }) => (
  dispatch
) => {
  dispatch(actions.loadMorePending({ index, id: categoryId }));
  return [];
};

/**
 * @function fetchArticlessLayout
 */
export const fetchArticlessLayout = ({ index, cursor }) => (dispatch) => {
  return [];
};

/**
 * @function fetchArticlessLayoutNextPage
 */
export const fetchArticlessLayoutNextPage = ({ index, cursor }) => (
  dispatch
) => {
  return [];
};
