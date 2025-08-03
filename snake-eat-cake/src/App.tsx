import "./App.css";
import Snake from "./components/snake";
import Particles from "./components/Particles";
import SplitText from "./components/SplitText";
import FadeContent from "./components/FadeContent";
import { useEffect, useMemo, useState } from "react";
import FallingObject from "./components/FallingObject";

const numberOfObjects = 100;

function App() {
  const [objects, setObjects] = useState<number[]>([]);
  const [showEnd, setShowEnd] = useState(false);

  // Memoize the Particles component to prevent re-rendering
  const particlesComponent = useMemo(
    () => (
      <div style={{ width: "100%", height: "400px", position: "relative" }}>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
    ),
    []
  );

  useEffect(() => {
    let objectCount = 0;

    const interval = setInterval(() => {
      if (objectCount >= numberOfObjects) {
        clearInterval(interval);
        setShowEnd(true);
        return;
      }

      setObjects((prev) => [...prev, objectCount]);
      objectCount++;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  console.log(objects);

  return (
    <div>
      <div className="app-container">
        {objects.map((id) => (
          <FallingObject key={id} />
        ))}
      </div>
      <div className="flex justify-center text-colour:white">
        {showEnd ? (
          <FadeContent duration={1000} easing="ease-out">
            <SplitText
              text="Why are you still here..."
              className="text-large font-semibold text-center"
              delay={100}
              duration={0.6}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </FadeContent>
        ) : (
          <>
            <FadeContent duration={1000} easing="ease-out">
              <SplitText
                text="Feed the snake."
                className="text-huge font-semibold text-center"
                delay={100}
                duration={0.6}
                ease="elastic.out(1, 0.3)"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </FadeContent>
          </>
        )}
        <div style={{ width: "100%", height: "400px", position: "relative" }}>
          {particlesComponent}
        </div>
        <Snake initialPosition={100} />
      </div>
    </div>
  );
}

export default App;
