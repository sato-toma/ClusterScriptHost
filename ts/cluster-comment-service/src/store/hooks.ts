import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
) => useSelector(selector);
