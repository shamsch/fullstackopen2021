import { Content } from "./component/Content";
import Header from "./component/Header";
import { Total } from "./component/Total";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Content content={courseParts}/>
      <Total content={courseParts}/>
    </div>
  );
};

export default App;
