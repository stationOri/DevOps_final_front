function Banner({sender}){
  return (
    <div style={{
      width: "100%", 
      height:'70px',
      borderBottom: '1px solid #D9D9D9',
      display: 'flex',
      alignItems: 'center',  // Center items vertically
    }}>
      <img style={{ 
        marginLeft: '17.5px', // Space between image and text
        width: '60px', 
        height: '60px',
        marginTop: '5px'  // Space above image
      }} src="/images/chat1.png" alt="" />
      <div style={{ 
        position: 'relative', 
        fontSize: '20px', 
        fontWeight: '600', 
        color: '#515151',
        marginLeft: '11.5px'  // Space between image and text
      }}>
        {sender}
      </div>
      
      <span  class="material-symbols-outlined"style={{ 
    marginLeft: 'auto',  // Pushes span to the right end
    marginRight: '17.5px',  // Adds space between text and span
    fontSize: '30px',
    color: '#515151',
    fontWeight: '600'
  }}>
    storefront
  </span>
    </div>

  );
}

export default Banner;