import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import About from "../About/About";
import FeaturedLifeLessonsSection from "../FeaturedLifeLessonsSection/FeaturedLifeLessonsSection";
import WhyLearningFromLifeMattersSection from "../WhyLearningFromLifeMattersSection/WhyLearningFromLifeMattersSection";
import TopContributorsOfTheWeek from "../TopContributorsOfTheWeek/TopContributorsOfTheWeek";
import MostSavedLessons from "../MostSavedLessons/MostSavedLessons";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturedLifeLessonsSection></FeaturedLifeLessonsSection>
      <WhyLearningFromLifeMattersSection></WhyLearningFromLifeMattersSection>
      <TopContributorsOfTheWeek></TopContributorsOfTheWeek>
      <MostSavedLessons></MostSavedLessons>
    </div>
  );
};

export default Home;
