/**
 * created by Inspire UI @author(dang@inspireui.com)
 * @format
 */

import { Constants, AppConfig, Color } from "@common";
import * as types from "./types";
import siteData from '../../data/json/site_1.0.json'

const initialState = {
  finishIntro: false,
  enableNotification: false,
  currency: {
    symbol: "$",
    name: siteData.currency,
    symbol_native: "$",
    decimal_digits: 2,
    rounding: 0,
    code: siteData.currency,
    name_plural: "US dollars",
  },
  language: {
    lang: Constants.Language,
    rtl: Constants.RTL,
  },
  isOpenSidemenu: false,
  netInfoConnected: true,
  toast: {
    list: [],
  },
  shopify: {
    ...AppConfig.Shopify,
    appName: Constants.nameStore,
    primaryColor: Color.primary,
  },
  isNewStore: false,
};

export default (state = initialState, action) => {
  const { type, payload, error, meta } = action;

  switch (type) {
    case types.INITIAL_APP: {
      return {
        ...state,
        shopify: {
          ...state.shopify,
          ...payload,
        },
        isNewStore: false,
      };
    }

    case types.FINISH_INTRO: {
      return {
        ...state,
        finishIntro: true,
      };
    }

    case types.NOTIFICATION_ENABLE: {
      return {
        ...state,
        enableNotification: true,
      };
    }

    case types.NOTIFICATION_DISABLE: {
      return {
        ...state,
        enableNotification: false,
      };
    }

    case types.NOTIFICATION_TOGGLE: {
      return {
        ...state,
        enableNotification: payload.value,
      };
    }

    case types.CURRENCY_CHANGE: {
      return {
        ...state,
        currency: {
          ...payload.value,
        },
      };
    }

    case types.LANGUAGE_CHANGE: {
      return {
        ...state,
        language: {
          ...payload.value,
        },
      };
    }

    case types.RTL_CHANGE: {
      return {
        ...state,
        language: {
          ...payload.value,
        },
      };
    }

    /**
     * sidemenu
     */
    case types.SIDEMENU_OPEN: {
      return {
        ...state,
        isOpenSidemenu: true,
      };
    }

    case types.SIDEMENU_CLOSE: {
      return {
        ...state,
        isOpenSidemenu: false,
      };
    }

    case types.SIDEMENU_TOGGLE: {
      if (!payload || (payload && typeof payload.isOpen === "undefined")) {
        return {
          ...state,
          isOpenSidemenu: !state.isOpenSidemenu,
        };
      }
      return {
        ...state,
        isOpenSidemenu: payload.isOpen,
      };
    }

    case types.UPDATE_CONNECTION_STATUS: {
      return {
        ...state,
        netInfoConnected: payload.netInfoConnected,
      };
    }

    case types.ADD_TOAST: {
      return {
        ...state,
        toast: {
          list: state.toast.list.some((toast) => toast.msg === payload.msg)
            ? state.toast.list
            : [payload, ...state.toast.list],
        },
      };
    }
    case types.REMOVE_TOAST: {
      return {
        ...state,
        toast: {
          list: state.toast.list.filter((msg) => msg.key !== payload.key),
        },
      };
    }

    case types.CHANGE_STORE_CONFIG: {
      return {
        ...state,
        shopify: payload,
        isNewStore: true,
      };
    }

    case types.New_Jobs: {
      return {
        ...state,
        newJobs: payload
      }
    }
    case types.FetchNew_Jobs: {
      return {
        ...state,
        isFetching: payload
      }
    }

    case types.Accpeted_Jobs: {
      return {
        ...state,
        accpetedJobs: payload
      }
    }

    case types.Inprogress_Jobs: {
      return {
        ...state,
        InprogressJobs: payload
      }
    }

    case types.Accpet_Job_Failure: {
      return {
        ...state,
        acceptError: payload,
        acceptLoading: false
      }
    }


    case types.Accpet_Job_Pending: {
      return {
        ...state,
        acceptLoading: true
      }
    }
    case types.Accpet_Job_Success: {
      return {
        ...state,
        acceptJob: payload,
        acceptLoading: false
      }
    }
    case types.Update_Job_Failure: {
      return {
        ...state,
        acceptError: payload,
        updateLoading: false
      }
    }

    case types.Update_Job_Pending: {
      console.log("SSSSSSSSSs")
      return {
        ...state,
        updateLoading: true
      }
    }
    case types.Update_Job_Success: {
      return {
        ...state,
        acceptJob: payload,
        updateLoading: false
      }
    }


    case types.Compelete_Job_Success: {
      return {
        ...state,
        completeLoading: false
      }
    }
    case types.Compelete_Job_Pending: {
      return {
        ...state,
        completeLoading: payload
      }
    }


    case types.fetchingCommissionPending: {
      return {
        ...state,
        commissionLoading: payload
      }
    }
    case types.fetchingCommissionSuccess: {
      return {
        ...state,
        commissionList: payload
      }
    }
    default:
      return state;
  }
};
