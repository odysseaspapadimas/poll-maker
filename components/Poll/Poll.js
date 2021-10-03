import { useRouter } from "next/dist/client/router";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Option from "./Option";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Box } from "@chakra-ui/layout";
import { useClipboard } from "@chakra-ui/react";

const Poll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ option: "" }]);
  const [error, setError] = useState("");
  const [postedPoll, setPostedPoll] = useState(false);
  const [pollLink, setPollLink] = useState("");
  const [copied, setCopied] = useState("Copy");

  const handleOption = (input, index) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { option: input } : option
    );
    setOptions(updatedOptions);
  };

  useEffect(() => {
    console.log(options, "options");
  }, [options]);

  const addOption = () => {
    console.log("hi");
    setOptions((options) => [...options, { option: "" }]);
  };

  const handlePostPoll = async () => {
    if (!question) {
      setError("You need a question to post a poll.");
      return;
    }
    if (options.length < 2) {
      setError("You need more than 2 options to post a poll.");
      return;
    }
    const optionsToPost = options.map((option, i) => {
      const newOption = { id: i, option: option.option, votes: 0 };
      return newOption;
    });
    console.log(optionsToPost, "optionstopost");
    const res = await fetch("/api/poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        options: optionsToPost,
      }),
    });

    const questionRes = await res.json();

    if (res.status === 201) {
      setPollLink(`/poll?id=${questionRes._id}`);
      setPostedPoll(true);
    }

    console.log(questionRes, "questionRes");
  };

  return (
    <Box
      w={["90vw", "85vw", "75vw", "35vw"]}
      h={["90vw", "60vw", "50vw", "35vw"]}
      className="flex flex-col"
    >
      <div className="border border-gray-500 flex flex-col h-full overflow-y-auto">
        {!postedPoll ? (
          <>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="bg-transparent p-4 font-medium  w-full outline-none border-b border-gray-500"
            />

            {options.map(({ option }, i) => (
              <Option
                key={i}
                options={options}
                handleOption={handleOption}
                index={i}
                addOption={addOption}
              />
            ))}
          </>
        ) : (
          <div className="p-2 flex flex-col space-y-2">
            <input
              type="text"
              readOnly
              value={`https://poll-maker.vercel.app${pollLink}`}
              className="bg-gray-800 p-2 w-full"
            />
            <div className="flex items-center justify-center space-x-1">
              <CopyToClipboard
                text={pollLink}
                onCopy={() => {
                  setCopied("Copied");
                  setInterval(() => {
                    setCopied("Copy");
                  }, 1500);
                }}
              >
                <button className="px-3 py-2 bg-green-500 rounded-sm">
                  {copied}
                </button>
              </CopyToClipboard>

              <Link href={pollLink}>
                <p className="px-3 py-2 bg-red-600 rounded-md cursor-pointer">
                  Go
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
      {!postedPoll && (
        <>
          <p className="text-red-500 mx-auto mt-2">{error}</p>
          <button
            onClick={handlePostPoll}
            className="px-4 py-3 bg-red-600 rounded-sm mt-2 mx-auto"
          >
            Post Poll
          </button>
        </>
      )}
    </Box>
  );
};

export default Poll;
