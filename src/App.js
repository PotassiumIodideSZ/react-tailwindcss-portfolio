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

const About = lazy(() => import("./pages/AboutMe"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectSingle = lazy(() => import("./pages/ProjectSingle.jsx"));

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/snakegame" && location.pathname !== "/bashnyaslov" && (
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
