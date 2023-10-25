import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AppFooter from "./components/shared/AppFooter";
import AppHeader from "./components/shared/AppHeader";
import "./css/App.css";
import UseScrollToTop from "./hooks/useScrollToTop";
import SnakeGame from "./SnakeGame.js";
import React from "react";
import { useLocation } from "react-router-dom";
import WordMatch from "./WordMatch/WordMatch";
import Phaser2048 from "./Phaser2048/Main.js";
import DrawingBoard from "./DrawingBoard/Main.js";
// import Test1 from "./tests/isPalindrome.js";
import Test2 from "./tests/calculateFrequency.js";
// import Test3 from "./tests/methods.js";
// import Test4 from "./tests/blockCallback.js";


const About = lazy(() => import("./pages/AboutMe"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectSingle = lazy(() => import("./pages/ProjectSingle.jsx"));

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/snakegame" && location.pathname !== "/bashnyaslov" && location.pathname !== "/phaser2048" && location.pathname !== "/tests" && location.pathname !== "/DrawingBoard" && (
        <div className=" bg-secondary-light dark:bg-primary-dark transition duration-300">
          <ScrollToTop />
          <AppHeader />

          <AnimatePresence>
            <Suspense fallback={""}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="projects" element={<Projects />} />
                <Route
                  path="projects/single-project"
                  element={<ProjectSingle />}
                />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </AnimatePresence>

          <AppFooter />

          <UseScrollToTop />
        </div>
      )}
      <Routes>
        <Route path="/bashnyaslov" element={<WordMatch />} />
        <Route path="/snakegame" element={<SnakeGame />} />
        <Route path="/phaser2048" element={<Phaser2048 />} />
        <Route path="/drawingboard" element={<DrawingBoard />} />
        {/* <Route path="/tests/1" element={<Test1 />} /> */}
        <Route path="/tests/2" element={<Test2 />} />
        {/* <Route path="/tests/3" element={<Test3 />} /> */}
        {/* <Route path="/tests/4" element={<Test4 />} /> */}
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
