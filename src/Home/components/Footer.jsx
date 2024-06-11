import React from 'react'

function Footer() {
  return (
    <div>
        <footer class="pt-7 pt-lg-8">
          <div class="container">
            <div class="row gy-4 g-md-3 border-bottom pb-8 pb-lg-9 justify-content-center">
              <div class="col-6 col-md-3">
                <p class="mb-2 lh-lg ls-1">Company</p>
                <ul class="list-unstyled text-1100">
                  <li class="mb-1"> <a class="ls-1 lh-xl" href="#about">About us</a></li>
                  <li class="mb-1"> <a class="ls-1 lh-xl" href="#contact"> Contact us</a></li>
                </ul>
              </div>
              <div class="col-6 col-md-3">
                <p class="mb-2 lh-lg">Product</p>
                <ul class="list-unstyled text-1100">
                  <li class="mb-1"> <a class="ls-1 lh-xl" href="#!">Features</a></li>
                  <li class="mb-1"> <a class="ls-1 lh-xl" href="#!"> News</a></li>
                  <li class="mb-1"><a class="ls-1 lh-xl" href="#!"> Support</a></li>
                </ul>
              </div>
              <div class="col-6 col-md-3">
                <ul class="list-unstyled text-1100">
                  <li class="mb-1"> <a class="ls-1 lh-xl" href="#!">Privacy</a></li>
                  <li class="mb-1"> <a class="ls-1 lh-xl" href="#!"> Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
            <div class="row gy-2 py-3 justify-content-center justify-content-md-between">
              {/* <div class="col-auto ps-0">
                <p class="text-center text-md-start lh-xl text-1100"> © 2024 Copyright, All Right Reserved, Made by <a class="fw-semi-bold" href="https://themewagon.com/">ThemeWagon </a>❤️</p>
              </div> */}
              <div class="col-auto pe-0"><a class="icons fs-8 me-3 me-md-0 ms-md-3 cursor-pointer" href="#!"><span class="uil uil-twitter"> </span></a><a class="icons fs-8 me-3 me-md-0 ms-md-3 cursor-pointer" href="#!"><span class="uil uil-instagram"></span></a><a class="icons fs-8 me-3 me-md-0 ms-md-3 cursor-pointer" href="#!"><span class="uil uil-linkedin"> </span></a></div>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Footer