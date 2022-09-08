// 参考: https://qiita.com/meno-m/items/47cb79e1d7c892727f3c
import { Octokit } from "@octokit/rest";
var repeatNum = 1;
// コミットハッシュのキャッシュ
var cacheSha = "";
// githubに草を生やす関数
export default async function growGrassToGithub(token, owner, repo, metsNum) {
  console.log("token :" + token);
  console.log("owner :" + owner);
  console.log("repo :" + repo);
  console.log("metsNum :" + metsNum);
  try {
    console.log("repeatNum :" + repeatNum);
    var id = setInterval(() => {
      if (repeatNum < metsNum) {
        console.log("repeat :" + repeatNum);
        gitCommitPush({
          token: token,
          owner: owner,
          repo: repo,
          file: {
            path: "log.md",
            content: `草生やしたったwww ${new Date().toLocaleString()}`,
          },
          branch: "main",
          commitMessage: `grow grass for bot ${new Date().toLocaleString()}`,
        });
      } else {
        console.log("successful commit automation");
        repeatNum = 1;
        clearInterval(id);
        return "successful create commit";
      }
    }, 15000);
    return `草生やしたったwww`;
  } catch (error) {
    console.error(error);
    return `failed to commit`;
  }
}
const gitCommitPush = async (config) => {
  const gh = new Octokit({
    auth: config.token,
  });

  const ref = await gh.git.getRef({
    owner: config.owner,
    repo: config.repo,
    ref: `heads/${config.branch}`,
  });

  console.log("cache :" + cacheSha);
  console.log("remote sha :" + ref.data.object.sha);

  // push されているかの確認
  if (cacheSha == ref.data.object.sha || repeatNum == 1) {
    console.log("commit hash 一致");
  } else {
    console.log("commit hash 不一致");
    return;
  }
  const parentSha = ref.data.object.sha;
  console.log("commit 取得");
  const parentCommit = await gh.git.getCommit({
    owner: config.owner,
    repo: config.repo,
    commit_sha: parentSha,
  });
  console.log("blob 作成");
  const createBlob = await gh.git.createBlob({
    owner: config.owner,
    repo: config.repo,
    content: config.file.content,
    encoding: "utf-8",
  });
  console.log("ディレクトリ 構造");
  const createTree = await gh.git.createTree({
    owner: config.owner,
    repo: config.repo,
    base_tree: parentCommit.data.tree.sha,
    tree: [
      {
        path: config.file.path,
        sha: createBlob.data.sha,
        mode: `100644`,
        type: `blob`,
      },
    ],
  });

  console.log("commit 作成");
  const createCommit = await gh.git.createCommit({
    message: config.commitMessage,
    owner: config.owner,
    repo: config.repo,
    parents: [parentSha],
    tree: createTree.data.sha,
  });
  console.log("push する");
  const updated = await gh.git.updateRef({
    owner: config.owner,
    repo: config.repo,
    ref: `heads/${config.branch}`,
    sha: createCommit.data.sha,
  });
  cacheSha = updated.data.object.sha;
  console.log("successful commit :" + updated.data.object.sha);
  repeatNum++;
};
