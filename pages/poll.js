import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { Container } from "@chakra-ui/react";

const poll = () => {
  const router = useRouter();

  const pollId = router.query.id;

  const { data: poll, error: pollError } = useSWR(
    pollId ? `/api/poll?id=${pollId}` : null,
    fetcher
  );

  const [selectedOption, setSelectedOption] = useState("");

  const handleVote = async () => {
    console.log(poll);
    const optionId = poll.options
      .map((_option) => {
        console.log(_option.option, selectedOption, _option.id, " option");
        return _option.option === selectedOption && _option.id;
      })
      .filter((value) => value !== false)[0];

    console.log(optionId, "optionid");

    const res = await fetch(
      `/api/poll?` +
        new URLSearchParams({
          pollId,
          optionId,
        }),
      {
        method: "PUT",
      }
    );

    if (res.status === 201) {
      router.push(`/results?id=${pollId}`);
    }
  };

  return (
    <Container maxW="container.md">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white rounded-md w-full p-10 text-black ">
          {poll && (
            <>
              <h1 className="font-medium p-2">{poll.question}</h1>
              <div className="flex flex-col justify-center">
                {poll.options.map((option) => (
                  <div
                    key={option.id}
                    className={`p-3 my-2 border ${
                      selectedOption === option.option
                        ? "border-black"
                        : "border-gray-400"
                    }`}
                    onClick={() => setSelectedOption(option.option)}
                  >
                    <label>
                      <input
                        type="radio"
                        className="mr-2"
                        value={option.option}
                        checked={selectedOption === option.option}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                      {option.option}
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}

          <button
            onClick={handleVote}
            className="py-3 px-5 bg-red-600 text-white block mx-auto"
          >
            Vote
          </button>
        </div>
      </div>
    </Container>
  );
};

export default poll;
