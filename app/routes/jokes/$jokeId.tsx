import type {Joke} from "@prisma/client";
import type {LoaderFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {json} from "@remix-run/node";

import {db} from "~/utils/db.server";

type LoaderData = {joke: Joke};


export const loader: LoaderFunction = async ({
  params,
}) => {
  const joke = await db.joke.findUnique({
    where: {id: params.jokeId},
  });
  if (!joke) throw new Error("Joke not found");
  const data: LoaderData = {joke}
  return json(data);
}
const JokeRoute = () => { 
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <h1>{data.joke.name}</h1>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}

export default JokeRoute;
