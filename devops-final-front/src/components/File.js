import React, { useRef, useEffect, useCallback, useState, forwardRef, useImperativeHandle } from "react";
import "../css/components/File.css";

const File = forwardRef((props, ref) => {
  const inputEl = useRef(null);
  const [fileName, setFileName] = useState("파일을 선택하세요.");
  
  const fileInputHandler = useCallback((event) => {
    const files = event.target && event.target.files;
    if (files && files[0]) {
      setFileName(files[0].name);
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
  
  useImperativeHandle(ref, () => ({
    reset: () => {
      setFileName("파일을 선택하세요.");
      if (inputEl.current) {
        inputEl.current.value = null;
      }
    }
  }), []);
  
  return (
    <div className="fileWrapper">
      <label htmlFor="file" className="contentFileWrapper">
        <div className="file-name">{fileName}</div>
        <div className="fileselect">파일 선택</div>
      </label>
      <input accept=".jpg,.jpeg,.png," type="file" id="file" ref={inputEl} className="file-input" />
    </div>
  );
});

export default File;
