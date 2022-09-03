import alanBtn from "@alan-ai/alan-sdk-web";
import React from "react";
import Card from "./Card";

function App() {
  const [newsArticles, setNewsArticles] = React.useState([]);

  React.useEffect(() => {
    alanBtn({
      key: '744e855d6be3bc993b046d807b25a5402e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          console.log(articles)
        }
      }
    })
  })
  return (
    <div className="mx-8 my-24 w-full flex flex-col justify-center items-center">
      <h3 className="text-5xl font-semibold capitalize">Welcome to News.js</h3>
      <div className="mt-5">
        

        {newsArticles.length > 0 ? (
        <div>
          {newsArticles.map((post, idx)=>(
            <Card key={idx} post={post} />
          ))}
        </div>
        ) : (
          <span>Click on the blue button say: show me latest news</span>
        )}
      </div>
    </div>
  );
}

export default App;
