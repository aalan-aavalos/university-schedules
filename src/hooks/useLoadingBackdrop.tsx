import { useState, useCallback } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const useLoadingBackdrop = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showLoading = useCallback(() => setIsLoading(true), []);
  const hideLoading = useCallback(() => setIsLoading(false), []);

  const LoadingBackdrop = (
    <Backdrop sx={{ color: "#fff", zIndex: 2000 }} open={isLoading}>
      Cargando...
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return { isLoading, showLoading, hideLoading, LoadingBackdrop };
};
