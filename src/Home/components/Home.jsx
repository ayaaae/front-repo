import React from 'react';

function Home() {
  return (
    <div data-bs-target="#navbar"  data-bs-spy="scroll" tabIndex="0" >
      <section className="hero-section overflow-hidden position-relative z-0 mb-4 mb-lg-0" id="home">
        <div className="hero-background">
          <div className="container" style={{ maxWidth: '2000px', margin: '150px' , height: '600px'}}>
            <div className="row gy-4 gy-md-8 pt-9 pt-lg-0">
              <div className="col-lg-6 text-center text-lg-start">
                <h3 className="fs-3 fs-lg-1 text-white fw-bold mb-2 mb-lg-x1  mt-3 mt-lg-0">Elevate your productivity</h3>
                <h3 className='fs-3 fs-lg-1 text-white fw-bold mb-2 mb-lg-x1 lh-base mt-3 mt-lg-0' >with our comprehensive</h3>
                <p className="fs-6 text-white mb-3 mb-lg-4 lh-lg">project management solution</p>
                <div className="d-flex justify-content-center justify-content-lg-start"><a className="btn btn-primary btn-lg lh-xl mb-4 mb-md-5 mb-lg-7" href="#!">Explore more</a></div>
              </div>
              <div className="col-lg-6 position-lg-relative">
                <div className="position-lg-absolute z-1 text-center"><img className="img-fluid chat-image" id="animated-img" src="assets/img/illustrations/i1.jpg" alt="" style={{ transform: 'scale(1.5)', borderRadius: '10px', boxShadow: '1px 1px 10px white' }} />
                  <div className="position-absolute dots d-none d-md-block"> <img className="img-fluid w-50 w-lg-75" src="assets/img/illustrations/Dots.webp" alt="" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 start-0 end-0 z-1"><img className="wave mb-md-n2" src="assets/img/illustrations/Wave.svg" alt="" />
          <div className="bg-white py-2 py-md-5"></div>
        </div>
      </section>
    </div>
  );
}

export default Home;
