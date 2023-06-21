import { useState } from "react";
import useSWR from "swr";

export default function Joke() {
  const [id, setId] = useState(0);
  const [jokesInfo, setJokesInfo] = useState([]);

  const { data } = useSWR(
    `https://example-apis.vercel.app/api/bad-jokes/${id}`
  );

  function handlePrevJoke() {
    setId(data.prevId);
  }

  function handleNextJoke() {
    setId(data.nextId);
  }

  function handleToggleFunny(id) {
    setJokesInfo((currentJokesInfo) => {
      const info = currentJokesInfo.find((info) => info.id === id);
      if (info) {
        return currentJokesInfo.map((info) =>
          info.id === id ? { ...info, isFunny: !info.isFunny } : info
        );
      }
      return [...currentJokesInfo, { id, isFunny: true }];
    });
  }

  console.log("Zusatzinfo", jokesInfo);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const info = jokesInfo.find((info) => info.id === id) ?? { isFunny: false };
  const { isFunny } = info;

  return (
    <>
      <small>ID: {id}</small>
      <h1>
        {data.joke}{" "}
        <span
          role="img"
          aria-label={isFunny ? "A laughing face" : "An unamused face"}
        >
          {isFunny ? "🤣" : "😒"}
        </span>
      </h1>
      <div>
        <button type="button" onClick={() => handleToggleFunny(id)}>
          {isFunny ? "Stop laughing" : "Start laughing"}
        </button>
      </div>
      <div>
        <button type="button" onClick={handlePrevJoke}>
          ← Prev Joke
        </button>
        <button type="button" onClick={handleNextJoke}>
          Next Joke →
        </button>
      </div>
    </>
  );
}
