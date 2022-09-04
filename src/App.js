import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import React from "react";
import Card from "./Card";
import {
  m,
  LazyMotion,
  AnimatePresence,
  useSpring,
  useScroll,
  AnimateSharedLayout,
} from "framer-motion";
import Messages, { channelId } from "./RealTimeMsg";
import { hopServer } from ".";

function App() {
  const [activeArticle, setActiveArticle] = React.useState(0);
  const [newsArticles, setNewsArticles] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const tabs = React.useMemo(() => {
    return [
      {
        label: "What Alan can do",
        content: (
          <div>
            <h1 className="capitalize font-semibold text-center animate-pulse text-xl">
              Try saying...
            </h1>
            <p className="flex justify-center gap-2 hover:animate-pulse">
              " Show me the latest <b>News</b>"
            </p>
            <p className="flex justify-center gap-2 hover:animate-pulse">
              " Give me news from <b>Fox News</b>"
            </p>
            <p className="flex justify-center gap-2 hover:animate-pulse">
              " How's the <b>Weather</b> here "
            </p>
            <p className="flex justify-center gap-2 hover:animate-pulse">
              " How much is <b>Bitcoin</b> now "
            </p>
          </div>
        ),
      },
      {
        label: "What People ask Alan now",
      },
    ];
  }, []);
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  React.useEffect(() => {
    alanBtn({
      key: "744e855d6be3bc993b046d807b25a5402e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, correntId, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(correntId);
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
      onEvent: (e) => {
        switch (e.name) {
          case "parsed":
            hopServer.channels.publishMessage(
              channelId,
              // event name of your choosing
              "NEW_MESSAGE",
              // event data, this can be any object you want it to be
              {
                msg: e.text,
              }
            );
            break;
          case "text":
            console.info("Alan reponse:", e.text);
            break;
          default:
            console.info("Unknown event");
        }
      },
    });
  }, [tabs]);
  const loadFeatures = () => import("./features.js").then((res) => res.default);
  return (
    <AnimatePresence exitBeforeEnter>
      <LazyMotion features={loadFeatures}>
        <div className="flex flex-col justify-center max-w-6xl min-h-screen px-4 py-10 mx-auto sm:px-6">
          {newsArticles.length > 0 ? (
            <React.Fragment>
              <m.div
                className="progress-bar z-50 bg-slate-800"
                style={{ scaleX }}
              />
              <div className="flex flex-wrap items-center justify-between mb-8">
                <h2 className="mr-10 text-4xl font-bold leading-none md:text-5xl">
                  {newsArticles.length > 0
                    ? newsArticles[0].author
                    : "Welcome to News.js"}
                </h2>
              </div>
              <div className="flex flex-col flex-wrap">
                <AnimateSharedLayout type="crossfade">
                  <m.div className="flex flex-wrap -mx-4" layout>
                    {newsArticles.map((post, idx) => (
                      <Card
                        key={idx}
                        post={post}
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
            <div className="flex flex-col md:w-[30rem] m-auto gap-8 justify-center w-full h-full">
              <m.h2 className="w-full text-4xl font-bold leading-none md:text-5xl">
                Welcome to News.js
              </m.h2>
              <nav>
                <ul>
                  {tabs.map((item) => (
                    <li
                      key={item.label}
                      className={item === selectedTab ? "selected" : ""}
                      onClick={() => setSelectedTab(item)}
                    >
                      {`${item.label}`}
                      {item === selectedTab ? (
                        <m.div className="underline" layoutId="underline" />
                      ) : null}
                    </li>
                  ))}
                </ul>
              </nav>
              <main>
                <m.div
                  key={selectedTab ? selectedTab.label : "empty"}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {selectedTab ? selectedTab.content : <Messages />}
                </m.div>
              </main>
            </div>
          )}
        </div>
      </LazyMotion>
    </AnimatePresence>
  );
}

export default App;
