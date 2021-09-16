import { useSelector, TypedUseSelectorHook } from "react-redux";

import { RootState } from "../store/reducer/index";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;