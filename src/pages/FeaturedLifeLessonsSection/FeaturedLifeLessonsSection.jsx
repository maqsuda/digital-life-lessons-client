import Loading from "../Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Lesson from "../Lessons/Lesson";
import FeatureLessonCard from "./FeatureLessonCard";

const FeaturedLifeLessonsSection = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: featuredLessons = [] } = useQuery({
    queryKey: ["featuredLessons", user?.email, user?.name],
    queryFn: async () => {
      const res = await axiosSecure.get("/featuredLessons");
      // console.log("pages ", featuredLessons);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl text-center py-5">Featured Life Lessons </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 py-5">
        {featuredLessons.map((featureLesson) => (
          <FeatureLessonCard
            key={featureLesson._id}
            featureLesson={featureLesson}
          ></FeatureLessonCard>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLifeLessonsSection;
