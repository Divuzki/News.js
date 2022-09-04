import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import React from "react";
import Card from "./Card";
import { ReactComponent as GithubIcon } from "./svgs/github.svgr.svg";
import {
  m,
  LazyMotion,
  AnimatePresence,
  useSpring,
  useScroll,
  AnimateSharedLayout,
} from "framer-motion";
import { channelId } from "./Message";
import { hopServer } from ".";
import InfoCard from "./InfoCard";

function App() {
  const [activeArticle, setActiveArticle] = React.useState(0);
  const [newsArticles, setNewsArticles] = React.useState([]);
  const [head, setHead] = React.useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  React.useEffect(() => {
    alanBtn({
      key: "744e855d6be3bc993b046d807b25a5402e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, title, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          console.log(articles);
          setActiveArticle(-1);
          console.log(title);
          setHead(title);
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
      onEvent: (e) => {
        switch (e.name) {
          case "parsed":
            hopServer.channels.publishMessage(
              channelId,
              // event name of your choosing
              "NEW_USER_MESSAGE",
              // event data, this can be any object you want it to be
              {
                msg: { name: e.text, time: `${new Date().toDateString()}` },
              }
            );
            break;
          case "text":
            hopServer.channels.publishMessage(
              channelId,
              // event name of your choosing
              "NEW_ALAN_MESSAGE",
              // event data, this can be any object you want it to be
              {
                res: { name: e.text, time: `${new Date().toDateString()}` },
              }
            );
            break;
          default:
            console.info("Alan event:", e);
        }
      },
    });
  }, []);
  const loadFeatures = () => import("./features.js").then((res) => res.default);
  return (
    <AnimatePresence exitBeforeEnter>
      <LazyMotion features={loadFeatures}>
        <a
          href="https://github.com/Divuzki/News.js?utm_source=news-js.hop.sh&utm_medium=visit&utm_campaign=hackathon-projects"
          target={"_blank"}
          rel="noreferrer"
          className="fixed group backdrop-blur-lg z-50 rounded-xl transition-all py-2 px-4
         hover:bg-slate-600 flex gap-2 items-center bottom-5 left-4"
        >
          <GithubIcon className="group-hover:fill-white" />
          <span className="text-slate-600 group-hover:text-white transition-all text-xl font-bold">
            Github repo
          </span>
        </a>
        <div className="flex flex-col select-none justify-center max-w-6xl min-h-screen px-4 py-10 mx-auto sm:px-6">
          {newsArticles.length > 0 ? (
            <React.Fragment>
              <m.div
                className="progress-bar z-50 bg-slate-800"
                style={{ scaleX }}
              />
              <div className="flex flex-wrap items-center justify-between mb-8">
                <h2 className="mr-10 text-4xl font-bold leading-none md:text-5xl">
                  {head} <b className="opacity-70 text-gray-300">⟶ say "take me back" to go back</b>
                </h2>
              </div>
              <div className="flex flex-col flex-wrap">
                <AnimateSharedLayout type="crossfade">
                  <m.div className="flex flex-wrap -mx-4" layout>
                    {newsArticles.map((post, idx) => (
                      <Card
                        key={idx}
                        post={post}
                        activeArticle={parseInt(activeArticle)}
                        i={idx}
                        isShow={parseInt(activeArticle) === idx}
                      />
                    ))}
                  </m.div>
                </AnimateSharedLayout>
              </div>
              {/* {activeArticle > 0 } */}
            </React.Fragment>
          ) : (
            <InfoCard />
          )}
        </div>
      </LazyMotion>
    </AnimatePresence>
  );
}

export default App;
