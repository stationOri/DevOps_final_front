const Day=({date})=>{
  return (
    <div style={{ width: "810px", height: "15px", display: "flex"}}>
      <div
        style={{
          width: "810px",
          height: "15px",
          display: "flex",
          marginLeft:'20px',
          marginTop:'15px',
          marginBottom:'5px',
          alignItems: "center",
          opacity: "0.21",
          borderRadius: "5px",
          color:'#2b2b2b',
          background: "linear-gradient(to bottom, #000 0%, #282828 100%)",
        }}
      >
        <p style={{ margin: 0, color: "#2b2b2b" }}>{date}</p>
      </div>
    </div>

  );
}

export default Day;