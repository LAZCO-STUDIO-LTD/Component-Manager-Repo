import { MultiBar } from "cli-progress";

import schema from "./schema";


export default async function users(
  progress: MultiBar,
  from: Date | undefined,
  to: Date
) {
  const TITLE = "Users that have sign up";

  const _users = await schema.user.find({
    createdAt: {
      $gte: from ?? 0,
      $lte: to
    }
  });

  const progressBar = progress.create(_users.length, 0, {
    name: TITLE
  });

  const usersArray: Array<string> = [];
  for (const user of _users) {
    const id = user.customId;

    if (!usersArray.includes(id!)) {
      usersArray.push(id!);
    }

    progressBar.increment();
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    func: users.name,
    title: TITLE,
    content: usersArray.length
  };
}
