import { useRef, useEffect, useCallback, useState } from "react";
import "../css/components/File.css";

const File = () => {
  const inputEl = useRef(null);
  const [fileName, setFileName] = useState("파일을 선택하세요.");
  const fileInputHandler = useCallback((event) => {
    const files = event.target && event.target.files;
    if (files && files[0]) {
      setFileName(event.target.files[0].name);
    }
  }, []);

  useEffect(() => {
    const currentInputEl = inputEl.current;

    if (currentInputEl !== null) {
      currentInputEl.addEventListener("input", fileInputHandler);
    }
    return () => {
      if (currentInputEl) {
        currentInputEl.removeEventListener("input", fileInputHandler);
      }
    };
  }, [fileInputHandler]);

  return (
    <div className="fileWrapper">
      <label htmlFor="file">
        <div className="contentFileWrapper">
          {fileName ? <div className="file-name">{fileName}</div> : ""}
          <div className="fileselect">파일 선택</div>
        </div>
      </label>
      <input accept=".jpg,.jpeg,.png,.pdf" type="file" id="file" ref={inputEl} />
    </div>
  );
};

export default File;
