import React from 'react'
import './footer.css'

export default function footer() {
  return (
    <main className='footer'>
        <div className="logos">
        <img className='brand-logo' src="https://www.svgrepo.com/show/303492/gucci-logo.svg" alt="" />
        <img className='brand-logo' src="https://www.svgrepo.com/show/516891/hm.svg" alt="" />
        <img className='brand-logo' src="https://www.svgrepo.com/show/329847/adidas.svg" alt="" />
        <img className='brand-logo' src="https://www.svgrepo.com/show/303584/hermes-1-logo.svg" alt="" />
        <img className='brand-logo' src="https://www.svgrepo.com/show/303173/nike-3-logo.svg" alt="" />
        <img className='brand-logo' src="https://www.svgrepo.com/show/303252/chanel-2-logo.svg" alt="" />
        <img className='brand-logo' src="https://www.svgrepo.com/show/330304/dior.svg" alt="" />
        </div>
        <div className="conteiner">
            <div className="subscribe">
                <h1 id='logo'>Eluxo</h1>
                <h3>Subscribe To Your Newsletter to Stay Updated About Discounts</h3>
                <div className="button">
                    <p>eabhijith9@gmail.com</p>
                    <button onClick={()=> window.location.href="mailto:eabhijith9@gmail.com"}><span style={{ fontSize: "1.5em" }}> Go</span></button>
                </div>
            </div>
            <div className="copyrights">
                <p>&copy; 2025 Eluxo. All rights reserved.</p>
            </div>
        </div>
    </main>
  )
}
