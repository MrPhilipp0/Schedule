import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { ReactComponent as HelloSVG } from '../SVG/hello.svg';
import gsap from 'gsap';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const StartSide = () => {

  const wrapperSVG = useRef(null);
  let wrapperButtons = useRef(null);

  useEffect(() => {
    const [elements] = wrapperSVG.current.children;
    const woman = elements.getElementById('woman');
    const man = elements.getElementById('man');
    const checks = elements.querySelectorAll('.check');
    const days = elements.querySelectorAll('.day');
    const calendar = elements.getElementById('kalendarz');
    
    const buttons = wrapperButtons.current.children;

    const tl = gsap.timeline({defaults: {ease: 'power4.in'}, yoyo: true});

    tl.addLabel('myLabel')
      .fromTo(calendar, {autoAlpha: 0}, {autoAlpha: 1, duration: 1})
      .fromTo([...days], {scale:0}, {scale:1, stagger: {amount: .4, from:'edges'}, duration: 1}, 'myLabel')
      .fromTo(man, {x: '-=1000'}, {x: '+=1000', duration: 2, ease:'expo'},  'myLabel')
      .fromTo(woman, {x: '+=1000'}, {x: '-=1000', duration: 2, ease:'expo'}, 'myLabel')
      .fromTo([...checks], {y: '-=1000'}, {y:'+=1000', stagger: .1, duration: 3}, 'myLabel -=3.5')
      .to([...checks], {scale: 1.2, duration: .5}, 'myLabel +=1.2')
      .to([...checks], {scale: 1, duration: .3})
      .fromTo([...buttons], {y: '100%', autoAlpha: 0}, {y: '0%', autoAlpha: 1, duration: .3, stagger: 1, ease:'power3.in'}, '-=1')
  },[])


  return (
    <div className="startSide">

      {/* Header */}
      <div className="py-3 mt-0 mb-auto" style={{ backgroundColor:'#014F86', color:'#fff0f3'}}>
        <div className="d-flex align-items-center ms-4 ms-md-5">
          <label className="h1 fw-bolder m-0" style={{color:'#e0fbfc'}}> Schedule </label>
        </div>
      </div>

      {/* SVG */}
      <div className="startSideSVGWrapper mt-3 my-md-0">
        <div ref={wrapperSVG} style={{display:'flex', justifyContent:'center'}}>
          <HelloSVG />
        </div>
        <div ref={wrapperButtons} className="d-flex flex-column position-absolute align-items-center" style={{marginTop:'40vh'}}>
          <Button variant="dark" size='lg' className="mb-4 p-sm-3 px-sm-5 display-5 fw-bold rounded-3 signInBtn" disabled> SIGN IN </Button>
          <Link to="tasks" className="display-5 continueBtn border border-5 border-dark rounded-3">
            <Button className="p-sm-3 px-sm-5 fw-bold" variant="light" size='lg'> CONTINUE WITHOUT LOGIN </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
 
export default StartSide;