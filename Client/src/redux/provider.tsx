"use client";

import { useEffect } from "react";
import { store } from "./store";
import { Provider, useDispatch } from "react-redux";
import axios from "axios";
import { reset } from "./features/rootSlice";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
