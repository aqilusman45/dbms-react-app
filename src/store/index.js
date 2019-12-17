import { createStore, combineReducers } from "redux";
import { BannerReducers } from "./reducers/banner";
import { LogoReducers } from "./reducers/logos";

const allReducers = combineReducers({
  BannerReducers,
  LogoReducers
});

export const CreateStore = createStore(allReducers);
