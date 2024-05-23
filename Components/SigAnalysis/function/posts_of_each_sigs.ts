import { MultiBar } from "cli-progress";

import schema from "./schema";


export default async function posts_of_each_sigs(
  progress: MultiBar,
  from: Date | undefined,
  to: Date
) {
  const TITLE = "Posts of each sig";

  const _sigs = await schema.sig.find();

  const progressBar = progress.create(_sigs.length, 0, {
    name: TITLE
  });

  const sigs: {
    [key: string]: {
      name?: string;
      count?: number;
    };
  } = {};
  for (const sigObj of _sigs) {
    const sigId = sigObj._id.toString();
    const sigName = sigObj.name!;
    const postCount = await schema.post.countDocuments({
      sig: sigId,
      removed: false,
      createdAt: {
        $gte: from ?? 0,
        $lte: to
      }
    });

    sigs[sigId] = {
      name: sigName,
      count: postCount
    };

    progressBar.increment();
  }

  let output = "";
  const sortedSigs = Object.values(sigs).sort((a, b) => b.count! - a.count!);
  for (const sig of sortedSigs) {
    output += `${sig.name}: ${sig.count}`;
    if (sortedSigs.indexOf(sig) !== sortedSigs.length - 1) {
      output += "\n";
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    func: posts_of_each_sigs.name,
    title: TITLE,
    content: output
  };
}
