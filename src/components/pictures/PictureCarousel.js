import React, { Component } from 'react'  
import Carousel from 'react-bootstrap/Carousel'  
import "./PictureCarousel.css"


export class PictureCarousel extends Component {  
        render() {  
  
                return (  
                        
                        <div>  
                         <div className='container-fluid' >  
                          <div className="row title" style={{ marginBottom: "20px" }} >  
                          <div className="col-sm-12 btn btn-warning">  
                          How To Use Bootstrap Carousel In ReactJS  
                         </div>  
                         </div>  
                         </div>  
                         <div className='container-fluid' >  
                         <Carousel>  
                         <Carousel.Item  >  
                         <img   
                         className="d-block w-100"  
                        src={require('./slides/img2.jpg')}  alt="carousel" />  
                           <Carousel.Caption>  
                             <h3>First Demo </h3>  
                                 </Carousel.Caption>  
                                 </Carousel.Item  >  
                                 <Carousel.Item >  
                                 <img   
                                   className="d-block w-100"  
                                    src={require('./slides/img1.jpg')}  alt="carousel"   />  
                                       <Carousel.Caption>  
                                   <h3>Second Demo</h3>  
                                      </Carousel.Caption>  
                                         </Carousel.Item>  
                                       <Carousel.Item >  
                                       <img   
                                        className="d-block w-100"  
                                         src={require('./slides/img3.jpg')} alt="carousel"  />  
                                        <Carousel.Caption>  
                                          <h3>Third Demo</h3>  
                                          </Carousel.Caption>  
                                         </Carousel.Item>  
                                        </Carousel>  
                                </div>  
                        </div>  
                )  
        }  
}  
  
export default PictureCarousel  