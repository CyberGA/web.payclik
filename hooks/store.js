
export const initState = {
  address: "",
  web3ModalRef: null,
};

export const StoreAction = {
  INIT_ACCOUNT: "INIT_ACCOUNT",
  SAVE_ACCOUT: "SAVE_ACCOUNT",
};

export const StoreReducer = (state, action) => {
  switch (action.type) {
    case "INIT_ACCOUNT":
      return {
        ...state,
        web3ModalRef: action.payload?.web3ModalRef,
      };
    case "SAVE_ACCOUNT":
      return {
        ...state,
        address: action.payload?.address,
      };
    default:
      return state;
  }
};
