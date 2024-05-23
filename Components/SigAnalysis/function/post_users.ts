import { MultiBar } from "cli-progress";

import schema from "./schema";


export default async function unique_user(
  progress: MultiBar,
  from: Date | undefined,
  to: Date
) {
  const TITLE = "Users that have posted";

  const uniqueUsers = await schema.post.distinct("user", {
    removed: false,
    createdAt: {
      $gte: from ?? 0,
      $lte: to
    }
  });

  const progressBar = progress.create(uniqueUsers.length, 0, {
    name: TITLE
  });

  for (let i = 0; i < uniqueUsers.length; i++) {
    progressBar.increment();
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  const output = String(uniqueUsers.length);
  return {
    func: unique_user.name,
    title: TITLE,
    content: output
  };
}
