import React from "react";

const WhyLearningFromLifeMattersSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center py-5">
        Why Learning From Life Matters section
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
          <div className="text-4xl mb-4">🧠</div>
          <h3 className="text-xl font-bold mb-2">Learn from Experience</h3>
          <p className="text-gray-600">
            Life teaches powerful lessons. Learning from experience helps us
            grow and make wiser choices.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
          <div className="text-4xl mb-4">🔄</div>
          <h3 className="text-xl font-bold mb-2">Turn Mistakes Into Growth</h3>
          <p className="text-gray-600">
            Mistakes are opportunities to improve, not failures to repeat. Learn
            and move forward.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-xl font-bold mb-2">Build Strong Character</h3>
          <p className="text-gray-600">
            Life lessons shape values like honesty, responsibility, and empathy
            for a better life online and offline.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Prepare for the Future</h3>
          <p className="text-gray-600">
            Learning from life equips you to handle challenges and digital
            responsibilities confidently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyLearningFromLifeMattersSection;
