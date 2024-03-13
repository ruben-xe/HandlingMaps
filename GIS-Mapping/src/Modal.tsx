
function Modal({title, description, reviews, setModal, address, picture}) {
  return (
    <div style={{position: 'absolute', top: '100px', right: '50px', width: '20%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{backgroundColor: 'white', padding: '10px', borderRadius: '10px', fontSize: '16px'}}>
          <h2>{title}</h2>
          <div style={{ maxHeight: '200px', display: "flex", justifyContent: 'center', }}>
            <img src={picture} alt="Picture" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px' }} />
          </div>
          
          <p style={{ maxHeight: 100, overflowY: 'auto' }}>{description}</p>
          <h3>Reviews:</h3>
          <ul>
            {reviews.map((review, index) => (
              <li key={index} >{review}</li>
            ))}
          </ul>
          <h4>{address}</h4>
          <button onClick={() => setModal(m => ({...m, open: false}))}>Close</button>
        </div>
      </div>
  )
}

export default Modal