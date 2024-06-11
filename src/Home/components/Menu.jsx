import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
  return (
        <nav className="navbar navbar-expand-md fixed-top" id="navbar" >
          

          <Link className="btn btn-primary btn-sm ms-md-x1 mt-lg-0 order-md-1 ms-auto" to="/login" style={{textDecoration:"none"}}>Login </Link><button className="navbar-toggler border-0 pe-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button><div className="container-fluid px-0"><a href="/"><img className="navbar-brand w-75 d-md-none" src="/assets/img/logos/logo.svg" alt="logo" /></a><a className="navbar-brand fw-bold d-none d-md-block" href="/">DXC Technology</a>
            <div className="collapse navbar-collapse justify-content-md-end" id="navbar-content" data-navbar-collapse="data-navbar-collapse">
              

            </div>
          </div>
        </nav>
  )
}

export default Menu