import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import React from "react";
import Card from "./Card";
import { m, LazyMotion } from "framer-motion";

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
          console.log(articles);
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
  const loadFeatures = () => import("./features.js").then((res) => res.default);
  return (
    <LazyMotion features={loadFeatures}>
      <div className="flex flex-col justify-center max-w-6xl min-h-screen px-4 py-10 mx-auto sm:px-6">
        {newsArticles.length > 0 ? (
          <React.Fragment>
            <div className="flex flex-wrap items-center justify-between mb-8">
              <h2 className="mr-10 text-4xl font-bold leading-none md:text-5xl">
                {newsArticles.length > 0
                  ? newsArticles[0].author
                  : "Welcome to News.js"}
              </h2>
            </div>
            <div className="flex flex-col flex-wrap">
              <div className="flex flex-wrap -mx-4">
                {newsArticles.map((post, idx) => (
                  <Card key={idx} post={post} i={idx} />
                ))}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="flex justify-center w-full h-full">
            <m.h2 className="mr-10 text-4xl font-bold leading-none md:text-5xl">
              Welcome to News.js
            </m.h2>
          </div>
        )}
      </div>
    </LazyMotion>
  );
}

export default App;
