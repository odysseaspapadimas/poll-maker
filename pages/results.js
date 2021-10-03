import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { Container } from "@chakra-ui/react";

const poll = () => {
  const router = useRouter();

  const pollId = router.query.id;

  const {
    data: pollResults,
    mutate,
    error: pollError,
  } = useSWR(pollId ? `/api/poll?id=${pollId}` : null, fetcher);

  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    if (!pollResults) return;
    console.log(pollResults, " poll");
    pollResults.options.forEach((option) =>
      setTotalVotes((prev) => (prev += option.votes))
    );

    return () => setTotalVotes(0);
  }, [pollResults]);

  useEffect(() => {
    mutate();
  }, []);

  return (
    <Container maxW="container.md">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white rounded-md w-full p-10 text-black ">
          {pollResults && (
            <>
              <h1 className="font-semibold text-xl p-2">{pollResults.question}</h1>
              <div className="flex flex-col justify-center">
                {pollResults.options.map((option) => (
                  <div
                    key={option.id}
                    className=" my-2 border text-white border-black relative"
                  >
                    <div
                      className={`p-3 ${
                        option.votes === 0 ? "bg-white" : "bg-black"
                      }`}
                      style={{
                        width: `${
                          totalVotes > 0
                            ? (option.votes / totalVotes) * 100 + "%"
                            : "0%"
                        }`,
                      }}
                    >
                      <p className="mix-blend-difference whitespace-nowrap">
                        {option.option}: {option.votes}
                      </p>
                      <p className="mix-blend-difference absolute top-3 right-2">
                        {Math.trunc((option.votes / totalVotes) * 100) + "%"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default poll;
