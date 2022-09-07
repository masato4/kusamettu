// 参考: https://qiita.com/meno-m/items/47cb79e1d7c892727f3c
import { Octokit } from "@octokit/rest";
// githubに草を生やす関数
async function growGrassToGithub(token, owner, repo) {
  try {
    await gitCommitPush({
      token: token,
      owner: owner,
      repo: repo,
      file: {
        path: "log.md",
        content: `草生やしたったwww ${new Date().toLocaleString()}`,
      },
      branch: "main",
      commitMessage: "grow grass for bot",
    });

    console.log("success grow glass");
    return `草生やしたったwww`;
  } catch (error) {
    console.error(error);
    return `草生やすの失敗したったwww`;
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
  const parentSha = ref.data.object.sha;
  const parentCommit = await gh.git.getCommit({
    owner: config.owner,
    repo: config.repo,
    commit_sha: parentSha,
  });
  const createBlob = await gh.git.createBlob({
    owner: config.owner,
    repo: config.repo,
    content: config.file.content,
    encoding: "utf-8",
  });
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

  const createCommit = await gh.git.createCommit({
    message: config.commitMessage,
    owner: config.owner,
    repo: config.repo,
    parents: [parentSha],
    tree: createTree.data.sha,
  });

  const updateRef = await gh.git.updateRef({
    owner: config.owner,
    repo: config.repo,
    ref: `heads/${config.branch}`,
    sha: createCommit.data.sha,
  });
  console.log("commit success:", updateRef.data);
};

async function creaetGithubRepository(token, ownerName, repo) {
  try {
    await gitCreateRepository(token, ownerName, repo);
    console.log("successed creaet repository");
  } catch (error) {
    console.log(error);
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

  for (var i = 0; i < 11; i++) {
    await gh.repos.createOrUpdateFileContents({
      owner: ownerName,
      repo: repoName,
      path: `log${i}.md`,
      message: "commit message",
      // NOTE contentはBASE64でエンコードしないとだめ
      content: btoa(
        String.fromCharCode.apply(
          null,
          new TextEncoder().encode(
            `草生やしたったwww ${date.toLocaleString()} ${date.getMilliseconds()} filename: log${i}.md`
          )
        )
      ),
    });
  }

  console.log("ファイルアップロード完了");
}

export default {
  growGrassToGithub,
  creaetGithubRepository,
};
