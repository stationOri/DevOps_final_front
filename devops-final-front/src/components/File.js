import React, { useRef, useCallback, useImperativeHandle, forwardRef, useState } from "react";
import "../css/components/File.css";

const File = forwardRef(({ onFileChange }, ref) => {
  const inputEl = useRef(null);
  const [fileName, setFileName] = useState("파일을 선택하세요.");
  const [file, setFile] = useState(null); // State to hold the selected file
  
  const fileInputHandler = useCallback((event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFileName(files[0].name);
      setFile(files[0]); // Store the file in state
      onFileChange(files[0]); // Notify parent component about the file change
    } else {
      onFileChange(null);
    }
  }, [onFileChange]);

  useImperativeHandle(ref, () => ({
    getFile: () => file, // Expose method to get the selected file
    reset: () => {
      setFileName("파일을 선택하세요.");
      setFile(null); // Clear the file from state
      if (inputEl.current) {
        inputEl.current.value = null;
      }
      onFileChange(null); // Notify parent component about the file reset
    }
  }), [file, onFileChange]);

  return (
    <div className="fileWrapper">
      <label htmlFor="file" className="contentFileWrapper">
        <div className="file-name">{fileName}</div>
        <div className="fileselect">파일 선택</div>
      </label>
      <input accept=".jpg,.jpeg,.png" type="file" id="file" ref={inputEl} className="file-input" onChange={fileInputHandler} />
    </div>
  );
});

export default File;
