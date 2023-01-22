
export const initState = {
  address: "",
  balance: "",
  walletConnected: false,
  web3ModalRef: null,
};

export const StoreAction = {
  INIT_ACCOUNT: "INIT_ACCOUNT",
  SAVE_ACCOUT: "SAVE_ACCOUNT",
  SAVE_BALANCE: "SAVE_BALANCE",
};

export const StoreReducer = (state, action) => {
  switch (action.type) {
    case "INIT_ACCOUNT":
      return {
        ...state,
        walletConnected: action.payload?.walletConnected,
        web3ModalRef: action.payload?.web3ModalRef,
      };
    case "SAVE_ACCOUNT":
      return {
        ...state,
        address: action.payload?.address,
      };
    case "SAVE_BALANCE":
      return {
        ...state,
        balance: action.payload?.balance,
      };
    default:
      return state;
  }
};
