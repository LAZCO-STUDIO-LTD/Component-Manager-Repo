import { MultiBar } from "cli-progress";
import { cyan, green, magenta, yellow } from "ansi-colors";

import posts_of_each_sigs from "./function/posts_of_each_sigs";
import posts from "./function/posts";
import users from "./function/users";
import post_users from "./function/post_users";
import likes from "./function/likes";
import top_post_users from "./function/top_post_users";
import top_post_sigs from "./function/top_post_sigs";
import top_liked_post from "./function/top_liked_posts";


export class Analysis {
  private progress = new MultiBar({
    format: `${magenta("{percentage}%")}\t[${cyan("{bar}")}] ${green(
      "{value}"
    )}/{total}  \t| ${yellow("{name}")}`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
    stopOnComplete: true
  });

  async posts_of_each_sigs(from: string | undefined, to: string) {
    const fromDate = new Date(from ?? 0) ?? 0;
    const toDate = new Date(to) ?? 0;

    return await posts_of_each_sigs(this.progress, fromDate, toDate);
  }

  async posts(from: string | undefined, to: string) {
    const fromDate = new Date(from ?? 0) ?? 0;
    const toDate = new Date(to) ?? 0;

    return await posts(this.progress, fromDate, toDate);
  }

  async users(from: string | undefined, to: string) {
    const fromDate = new Date(from ?? 0) ?? 0;
    const toDate = new Date(to) ?? 0;

    return await users(this.progress, fromDate, toDate);
  }

  async post_users(from: string | undefined, to: string) {
    const fromDate = new Date(from ?? 0) ?? 0;
    const toDate = new Date(to) ?? 0;

    return await post_users(this.progress, fromDate, toDate);
  }

  async likes(from: string | undefined, to: string) {
    const fromDate = new Date(from ?? 0) ?? 0;
    const toDate = new Date(to) ?? 0;

    return await likes(this.progress, fromDate, toDate);
  }

  async top_post_users(
    from: string | undefined,
    to: string,
    options?: { limit: number | undefined }
  ) {
    const fromDate = new Date(from ?? 0) ?? 0;
    const toDate = new Date(to) ?? 0;
    const limit = options?.limit ?? 5;

    return await top_post_users(this.progress, fromDate, toDate, limit);
  }

  async top_post_sigs(
    from: string | undefined,
    to: string,
    options?: { limit: number | undefined }
  ) {
    const fromDate = new Date(from ?? 0) ?? 0;
    const toDate = new Date(to) ?? 0;
    const limit = options?.limit ?? 5;

    return await top_post_sigs(this.progress, fromDate, toDate, limit);
  }

  async top_liked_post(
    from: string | undefined,
    to: string,
    options?: { limit: number | undefined }
  ) {
    const fromDate = new Date(from ?? 0) ?? 0;
    const toDate = new Date(to) ?? 0;
    const limit = options?.limit ?? 5;

    return await top_liked_post(this.progress, fromDate, toDate, limit);
  }
}
