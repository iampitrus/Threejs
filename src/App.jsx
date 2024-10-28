import { ReactLenis } from "lenis/react";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useGSAP(() => {
    const scrollTrigSettings = {
      trigger: ".main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".main",
        start: "top center",
        end: "100% bottom",
        scrub: true,
      },
    });

    let t2 = gsap.timeline({
      scrollTrigger: scrollTrigSettings,
    });

    const leftXValues = [-400, -450, -200];
    const rightXValues = [400, 450, 200];
    const leftRotationValues = [-35, -20, -30];
    const rightRotationValues = [35, 20, 30];
    const yValues = [100, -150, -250];

    gsap.utils.toArray(".row").forEach((row, index) => {
      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");

      t1.to(
        cardLeft,
        {
          x: leftXValues[index],
          y: yValues[index],
          rotate: leftRotationValues[index],
        },
        "card"
      );
      t1.to(
        cardRight,
        {
          x: rightXValues[index],
          y: yValues[index],
          rotate: rightRotationValues[index],
        },
        "card"
      );
    });

    t2.to(".logo", {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
    });
    t2.from(".line p", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
    });
    t2.from(".button", {
      y: 20,
      opacity: 0,
      ease: "back",
    });
  });

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div key={i} className="row">
          <div className="card card-left">
            <img src={`./image${2 * i - 1}.png`} alt="nothing" />
          </div>
          <div className="card card-right">
            <img src={`./image${2 * i}.png`} alt="nothing" />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <ReactLenis root>
        <section className="h-screen w-screen bg-slate-400 my-3"></section>
        <section className="main">
          <div className="main-content">
            <div className="logo">
              <h2 className="text-3xl font-bold">I'm Peter</h2>
            </div>
            <div className="flex flex-col items-center">
              <div className="line">
                <p>I am a Frontend Engineer..</p>
              </div>
              <div className="line">
                <p>I build both web and mobile apps..</p>
              </div>
              <div className="line">
                <p>
                  I work comfortably with React, React-Native, Typescript and
                  Next.js
                </p>
              </div>
              <div className="button">
                <button>Contact Me</button>
              </div>
            </div>
          </div>

          {generateRows()}
        </section>
      </ReactLenis>
    </>
  );
}

export default App;
