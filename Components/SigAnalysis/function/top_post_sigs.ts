import { MultiBar } from "cli-progress";

import schema from "./schema";


export default async function top_post_sigs(
  progress: MultiBar,
  from: Date | undefined,
  to: Date,
  limit: number
) {
  const TITLE = `Top ${limit} post sigs`;

  const topSigsPost = await schema.post
    .aggregate([])
    .match({
      $and: [
        { removed: false },
        {
          createdAt: from
            ? {
              $gte: from,
              $lte: to
            }
            : {
              $lte: to
            }
        }
      ]
    })
    .group({ _id: "$sig", count: { $sum: 1 } })
    .sort({ count: -1 })
    .limit(limit);

  const progressBar = progress.create(topSigsPost.length, 0, {
    name: TITLE
  });

  const sigsArray: Array<{ name: string; count: number }> = [];
  for (const sigPost of topSigsPost) {
    const sig = await schema.sig.findOne({ _id: sigPost._id });
    if (sig?.name) {
      sigsArray.push({ name: sig.name, count: sigPost.count });
    }
    progressBar.increment();
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    func: top_post_sigs.name,
    title: TITLE,
    content: sigsArray.map((sig) => `${sig.name}: ${sig.count}`).join("\n")
  };
}
