import { useEffect } from "react";
import { createPortal } from "react-dom";

import AlertLogo from "../../assets/AlertLogo";
import CloseIcon from "../../assets/CloseIcon";

export default function Alert(props) {
  const { message, closeError } = props;

  useEffect(() => {
    const timeId = setTimeout(closeError, 3000);

    return () => clearTimeout(timeId);
  }, [closeError]);

  return createPortal(
    <div className="px-4 rounded-md border-l-4 border-red-500 bg-red-50 w-full sm:w-96 sm:px-8 fixed top-4 right-0 sm:right-4 z-[100] shadow-lg">
      <div className="flex justify-between py-3">
        <div className="flex">
          <div>
            <AlertLogo />
          </div>
          <div className="self-center ml-3">
            <span className="text-red-600 font-semibold">Error</span>
            <p className="text-red-600 mt-1">{message}</p>
          </div>
        </div>
        <button className="self-start text-red-500" onClick={closeError}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.getElementById("error")
  );
}
