import AlertLogo from "../../assets/AlertLogo";
import CloseIcon from "../../assets/CloseIcon";

export default function Alert(props) {
  return (
    <div className="px-4 rounded-md border-l-4 border-red-500 bg-red-50 w-full sm:w-96 sm:px-8 fixed top-4 right-0 sm:right-4">
      <div className="flex justify-between py-3">
        <div className="flex">
          <div>
            <AlertLogo />
          </div>
          <div className="self-center ml-3">
            <span className="text-red-600 font-semibold">Error</span>
            <p className="text-red-600 mt-1">{props.message}</p>
          </div>
        </div>
        <button className="self-start text-red-500" onClick={props.closeError}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
