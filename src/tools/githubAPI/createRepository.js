import { Octokit } from "@octokit/rest";

export default async function creaetGithubRepository(token, ownerName, repo) {
  try {
    await gitCreateRepository(token, ownerName, repo);
    console.log("successed creaet repository");
    return "success create repository";
  } catch (error) {
    console.log(error);
    return "stop with error";
  }
}

/**
 * githubのリポジトリを生成してファイル(log.md)をアップロードする関数
 * @param config
 * @returns なし
 */
async function gitCreateRepository(token, ownerName, repoName) {
  const gh = new Octokit({
    auth: token,
  });

  // リポジトリの作成
  await gh.repos.createForAuthenticatedUser({
    name: repoName,
  });

  console.log("リポジトリ生成完了 repoName: " + repoName);

  const date = new Date();

  console.log("repo :" + repoName);
  console.log("ownerName :" + ownerName);

  await gh.repos.createOrUpdateFileContents({
    owner: ownerName,
    repo: repoName,
    path: `log.md`,
    message: "commit message",
    // NOTE contentはBASE64でエンコードしないとだめ
    content: btoa(
      String.fromCharCode.apply(
        null,
        new TextEncoder().encode(`草生やしたったwww ${date.toLocaleString()}`)
      )
    ),
  });

  console.log("ファイルアップロード完了");
}
