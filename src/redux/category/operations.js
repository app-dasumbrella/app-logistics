/** @format */

 import * as actions from "./actions";
import categoryData from './../../data/json/category_1.0.json';

/**
 *  @function fetchCategories
 *
 * @param {*} { }
 */
export const fetchCategories = () => (dispatch) => {
  try {
    dispatch(actions.categoryPending());
    console.log("categoryData",categoryData)
  
    dispatch(actions.categorySuccess(categoryData.categories.list));
    // GraphqlAPI.getCollections()
    //   .then((json) => {
    //     if (json.error) {
    //       dispatch(actions.categoryFailure(json.error));
    //     } else {
    //       const { collections } = json;
    //       dispatch(actions.categorySuccess(collections));
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch(actions.categoryFailure(error));
    //   });
  } catch (error) {
    dispatch(actions.categoryFailure(error));
  }
};
