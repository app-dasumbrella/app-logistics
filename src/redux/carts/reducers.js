/** @format */

import * as types from "./types";
import { getTotalQuantity } from "./utils";

/**
 * TODO: improve structure later
 */
const initialState = {
  cartItems: [],
  total: 0,
  totalPrice: 0,
  subtotalPrice: 0,
  isFetching: false,
  checkoutId: null,
  // shipping
  shippingRates: [],
  shippingFetching: false,
  shippingReady: false,
  shippingLine: null, // shippingLine is Shipping selected
  shippingSelected: null,
  shippingAddress: null,
  webUrl: "",
  // coupon
  couponCode: "",
  couponApplied: false,
  couponFetching: false,
  // order
  order: {
    list: [],
    isFetching: false,
    hasNextPage: false,
    cursor: null,
    error: null,
  },
};

export default (state = initialState, action) => {
  const { type, payload, error, meta } = action;

  switch (type) {
    // Checkout
    case types.CHECKOUT_LINK_USER_FETCHING:
    case types.CHECKOUT_CHECK_FETCHING:
    case types.CHECKOUT_UPDATE_FETCHING:
    case types.CHECKOUT_ADD_FETCHING:
    case types.CHECKOUT_REMOVE_FETCHING:
    case types.CHECKOUT_CREATE_FETCHING: {
      return {
        ...state,
        isFetching: true,
      };
    }

    case types.CHECKOUT_LINK_USER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
      };
    }

    // return initialState
    case types.CHECKOUT_CHECK_SUCCESS: {
      if (payload.completedAt) {
        return initialState;
      }
      return {
        ...state,
        isFetching: false,
      };
    }

    case types.CHECKOUT_CREATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        cartItems: payload.cartItems,
        total:   payload.cartItems.length,
        totalPrice: payload.totalPrice,
        checkoutId: payload.checkoutId,
      };
    }

    case types.CHECKOUT_LINK_USER_FAILURE:
    case types.CHECKOUT_CHECK_FAILURE:
    case types.CHECKOUT_UPDATE_FAILURE:
    case types.CHECKOUT_REMOVE_FAILURE:
    case types.CHECKOUT_CREATE_FAILURE:
    case types.CHECKOUT_ADD_FAILURE: {
      console.warn(payload);
      return {
        ...state,
        error: payload,
        isFetching: false,
      };
    }

    case types.CHECKOUT_UPDATE_SUCCESS:
    case types.CHECKOUT_REMOVE_SUCCESS:
    case types.CHECKOUT_ADD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        cartItems: payload.cartItems,
        total: getTotalQuantity(payload.cartItems),
        totalPrice: payload.totalPrice,
        subtotalPrice: payload.subtotalPrice,
        error: null,
      };
    }

    // coupon
    case types.CHECKOUT_APPLY_COUPON_FETCHING: {
      return {
        ...state,
        couponFetching: true,
        couponApplied: false,
      };
    }

    case types.CHECKOUT_APPLY_COUPON_SUCCESS: {
      return {
        ...state,
        ...payload,
        couponApplied: true,
        couponFetching: false,
      };
    }

    case types.CHECKOUT_APPLY_COUPON_FAILURE: {
      return {
        ...state,
        couponFetching: false,
        couponApplied: false,
        error: payload,
      };
    }

    case types.CHECKOUT_REMOVE_COUPON_FETCHING: {
      return {
        ...state,
        couponFetching: true,
        couponApplied: false,
      };
    }

    case types.CHECKOUT_REMOVE_COUPON_SUCCESS: {
      return {
        ...state,
        ...payload,
        couponCode: "",
        couponApplied: false,
        couponFetching: false,
      };
    }

    case types.CHECKOUT_REMOVE_COUPON_FAILURE: {
      return {
        ...state,
        couponFetching: false,
        error: payload,
      };
    }

    // shipping
    case types.CHECKOUT_UPDATE_SHIPPING_ADDRESS_FETCHING: {
      return {
        ...state,
        shippingFetching: true,
      };
    }

    case types.CHECKOUT_UPDATE_SHIPPING_ADDRESS_FAILURE: {
      return {
        ...state,
        shippingFetching: false,
        error: payload,
      };
    }

    case types.CHECKOUT_UPDATE_SHIPPING_ADDRESS_SUCCESS: {
      return {
        ...state,
        shippingRates: payload.availableShippingRates.shippingRates,
        shippingReady: payload.availableShippingRates.ready,
        shippingAddress: payload.shippingAddress,
        shippingFetching: false,
      };
    }

    case types.CHECKOUT_UPDATE_SHIPPING_LINE_FETCHING: {
      return {
        ...state,
      };
    }

    case types.CHECKOUT_UPDATE_SHIPPING_LINE_FAILURE: {
      return {
        ...state,
        error: payload,
      };
    }

    case types.CHECKOUT_UPDATE_SHIPPING_LINE_SUCCESS: {
      return {
        ...state,
        shippingSelected: payload.shippingLine,
        webUrl: payload.webUrl,
        subtotalPrice: payload.subtotalPrice,
        totalPrice: payload.totalPrice,
      };
    }

    case "CLEAN_OLD_STORE":
    case types.CART_CLEAN: {
      return {
        ...initialState,
      };
    }

    /**
     * order
     * TODO: improve split another store
     */
    case types.ORDER_FETCHING: {
      return {
        ...state,
        order: {
          ...state.order,
          isFetching: true,
          error: null,
        },
      };
    }

    case types.ORDER_SUCCESS: {
      return {
        ...state,
        order: {
          ...payload,
          isFetching: false,
          error: null,
        },
      };
    }

    case types.ORDER_FAILURE: {
      return {
        ...state,
        order: {
          error: payload,
          isFetching: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};

// const compareCartItem = (cartItem, action) => {
//   if (
//     cartItem &&
//     isObject(cartItem) &&
//     cartItem.variation !== undefined &&
//     action.variation !== undefined &&
//     cartItem.variation != null &&
//     action.variation != null
//   )
//     return (
//       cartItem.product.id === action.product.id &&
//       cartItem.variation.id === action.variation.id
//     );
//   return cartItem.product.id === action.product.id;
// };

// const cartItem = (
//   state = { product: undefined, quantity: 1, variation: undefined },
//   action
// ) => {
//   switch (action.type) {
//     case types.CART_ADD_ITEM:
//       return state.product === undefined
//         ? Object.assign({}, state, {
//             product: action.product,
//             variation: action.variation,
//           })
//         : !compareCartItem(state, action)
//           ? state
//           : Object.assign({}, state, {
//               quantity:
//                 state.quantity < Constants.LimitAddToCart
//                   ? state.quantity + 1
//                   : state.quantity,
//             });
//     case types.CART_REMOVE_ITEM:
//       return !compareCartItem(state, action)
//         ? state
//         : Object.assign({}, state, { quantity: state.quantity - 1 });
//     default:
//       return state;
//   }
// };
