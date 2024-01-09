import { useEffect, useRef, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';

export default function App() {
  const [show, setShow] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const menubarRef = useRef<HTMLUListElement>(null);
  const menubarInsideRef = useRef<HTMLDivElement>(null);
  const backIconRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(navbarRef.current) {
      console.log(navbarRef.current.classList);
      if(openModal) {
        navbarRef.current.classList.add("sidebar__expand");
        navbarRef.current.classList.remove("sidebar");
      } else {
        navbarRef.current.classList.remove("sidebar__expand");
        navbarRef.current.classList.add("sidebar");
      }
    }
  }, [openModal])

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash.substring(1);
      if (newHash !== 'payments') {
        setShow(false);
      } else {
        setShow(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const item = () => {
    if (window.location.href.split('#')[1] !== 'payments') {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const shrink = () => {
    if (navbarRef.current) {
      navbarRef.current.classList.toggle("sidebar__shrink");
    }

    if(menubarRef.current) {
      const menubarLinks = menubarRef.current.querySelectorAll(".menubar__link");
      menubarLinks.forEach((link) => {
        // display: none;
        const span = link.querySelector("span");
        if(span) {
          span.style.display = span.style.display === "none" ? "block" : "none";
        }
      });
    }

    if(menubarInsideRef.current) {
      const menubarInside = menubarInsideRef.current;
      menubarInside.style.display = menubarInside.style.display === "none" ? "flex" : "none";
    }

    if(backIconRef.current) {
      const backIcon = backIconRef.current;
      backIcon.style.display = backIcon.style.display === "flex" ? "none" : "flex";
    }

    if (infoRef.current) {
      const span = infoRef.current.querySelectorAll("span");
      span.forEach((s) => {
        s.style.display = s.style.display === "none" ? "flex" : "none";
      });
    }

    if (dashRef.current) {
      dashRef.current.classList.toggle("dashboard__expand");
    }
  }

  return (
    <div className='app'>
      <Sidebar 
        navbarRef={navbarRef}
        menubarRef={menubarRef}
        menubarInsideRef={menubarInsideRef}
        backIconRef={backIconRef}
        infoRef={infoRef}
        shrink={shrink}
        item={item}
        modal={openModal}
        setOpenModal={setOpenModal}
      />
      <Dashboard modal={openModal} setOpenModal={setOpenModal} show={show} dashRef={dashRef}/>
    </div>
  );
}