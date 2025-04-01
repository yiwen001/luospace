const ResearchTopics = ({ topics }) => {
  return (
    <div className="content">
      <h3 className="text-sm font-medium mb-6">Research Topics</h3>
      <ul className="flex gap-4 font-thin text-xs">
        {topics.map((topic, index) => {
          return <li key={index}>#{topic}</li>;
        })}
      </ul>
    </div>
  );
};

export default ResearchTopics;
