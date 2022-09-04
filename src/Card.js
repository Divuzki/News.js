import React from "react";
import { m } from "framer-motion";

const Card = ({ post, i, activeArticle, isShow }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (isShow && ref && ref.current) {
      // window.scrollTo(0, ref.current.offsetTop - 100);
      window.scroll(0, ref.current.offsetTop - 50);
    }
  }, [isShow, ref]);

  return (
    <m.div
      ref={ref}
      layoutId={i}
      className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col group"
    >
      <m.img
        src={post.urlToImage}
        alt="Card img"
        className={`
        object-cover object-center group-hover:scale-105
         ${isShow ? "rounded-lg scale-105" : ""} group-hover:rounded-lg
         group-hover:shadow-sm transition-all w-full h-48`}
      />
      <m.div className="flex transition-all flex-grow">
        <m.div
          className={`triangle transition-all ${isShow ? "-translate-y-2" : ""} 
        group-hover:-translate-y-2 z-[-1]`}
        ></m.div>
        <m.div
          className={`flex flex-col justify-between px-4 py-6 bg-white border  ${
            isShow ? "border-4 border-gray-400" : "border-gray-400"
          }`}
        >
          <m.div className="flex flex-col">
            <m.span className="text-sm w-max font-medium text-gray-500 opacity-70">
              {new Date(post.publishedAt).toDateString()}
            </m.span>
            <m.a
              href={post.url}
              className="inline-block transition-all mb-4 w-max text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
            >
              {post.author}
            </m.a>
            <m.a
              href={post.url}
              className="block mb-4 transition-all text-2xl font-black leading-tight hover:underline hover:text-blue-600"
            >
              {post.title}
            </m.a>
            <m.p className="mb-4 transition-all">{post.description}</m.p>
          </m.div>
          <m.div>
            <a
              href={post.url}
              className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
            >
              Read More{" "}
              <b className="transition-all group-hover:text-blue-400">⟶</b>
            </a>
          </m.div>
        </m.div>
      </m.div>
    </m.div>
  );
};
export default Card;
