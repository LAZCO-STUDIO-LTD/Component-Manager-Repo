import { MultiBar } from "cli-progress";

import schema from "./schema";


export default async function post(
  progress: MultiBar,
  from: Date | undefined,
  to: Date
) {
  const TITLE = "Posts on the platform";

  const postsCount = await schema.post.countDocuments({
    removed: false,
    createdAt: {
      $gte: from ?? 0,
      $lte: to
    }
  });

  const progressBar = progress.create(postsCount, 0, {
    name: TITLE
  });

  for (let i = 0; i < postsCount; i++) {
    progressBar.increment();
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  const output = String(postsCount);
  return {
    func: post.name,
    title: TITLE,
    content: output
  };
}
