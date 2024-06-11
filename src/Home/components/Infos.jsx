import React, { useEffect } from 'react';


function Infos() {
  

  return (
    <section className="container border-bottom mb-8 mb-lg-10">
      <div className="row pb-6 pb-lg-8 g-3 g-lg-8 px-3">
        <div className="col-12 col-md-4">
          <h2 id="countup1" className="fs-3 fw-bold lh-sm mb-2 text-center">0</h2>
          <h6 className="fs-8 fw-normal lh-lg mb-0 opacity-70 text-center">countries</h6>
        </div>
        <div className="col-12 col-md-4">
          <h2 id="countup2" className="fs-3 fw-bold lh-sm mb-2 text-center">0</h2>
          <h6 className="opacity-70 fs-8 fw-normal lh-lg mb-0 text-center">employees</h6>
        </div>
        <div className="col-12 col-md-4">
          <h2 id="countup3" className="fs-3 fw-bold lh-sm mb-2 text-center">0</h2>
          <h5 className="opacity-70 fs-8 fw-normal lh-lg mb-0 text-center">customers in the Fortune 500</h5>
        </div>
      </div>
    </section>
  );
}

export default Infos;
