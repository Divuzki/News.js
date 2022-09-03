import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import React from "react";
import Card from "./Card";


function App() {
  const [activeArticle, setActiveArticle] = React.useState(0);
  const [newsArticles, setNewsArticles] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    alanBtn({
      key: "744e855d6be3bc993b046d807b25a5402e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "instructions") {
          setIsOpen(true);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        }
      },
    });
  }, []);
  return (
    <div className="my-24 w-full flex flex-col justify-center items-center">
      <h3 className="text-5xl font-semibold capitalize">Welcome to News.js</h3>
      <div className="mt-5">
        {newsArticles.length > 0 ? (
          <div>
            {newsArticles.map((post, idx) => (
              <Card key={idx} post={post} />
            ))}
          </div>
        ) : (
          <span className="animate-pulse capitalize">
            Click on the blue button say: show me latest news
          </span>
        )}
      </div>
    </div>
  );
}

export default App;
