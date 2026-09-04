import { useSelector, useDispatch } from "react-redux";

export function useRedux(selector) {
  const state = useSelector(selector);
  const dispatch = useDispatch();
  return { state, dispatch };
}
