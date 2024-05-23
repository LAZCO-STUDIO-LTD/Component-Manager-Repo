import { MultiBar } from "cli-progress";

import schema from "./schema";


export default async function likes(
  progress: MultiBar,
  from: Date | undefined,
  to: Date
) {
  const TITLE = "Likes of all posts";

  const posts = await schema.post.find({
    removed: false,
    createdAt: {
      $gte: from ?? 0,
      $lte: to
    }
  });

  const progressBar = progress.create(posts.length, 0, {
    name: TITLE
  });

  let likesCount: number = 0;
  for (const post of posts) {
    likesCount += post.likes;

    progressBar.increment();
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    func: likes.name,
    title: TITLE,
    content: likesCount
  };
}
