// 参考: https://qiita.com/meno-m/items/47cb79e1d7c892727f3c
import { Octokit } from "@octokit/rest";
var repeatNum = 0;
// コミットハッシュのキャッシュ
var cacheSha = "";
// floorした後のmetsを格納
var localMetsNum = 0;
// githubに草を生やす関数
export default async function growGrassToGithub(
  token,
  owner,
  repo,
  metsNum,
  setPercent,
  setStatusMessage,
  setErrorDialogVisible,
  setNotifyDialogVisible,
  setDialogText
) {
  console.log("token :" + token);
  console.log("owner :" + owner);
  console.log("repo :" + repo);
  console.log("metsNum :" + metsNum);
  localMetsNum = Math.floor(metsNum);
  // startした時間を保存
  const startTime = new Date().getMinutes();
  try {
    console.log("実行済み :" + repeatNum + "回");
    var id = setInterval(() => {
      if (repeatNum < localMetsNum) {
        // timeout する関数
        const nowTime = new Date().getMinutes();
        console.log("diff :" + (nowTime - startTime));
        // NOTE: mets数を分としてタイムアウト時間を変更する
        // Ex: 2メッツ -> 2分 10メッツ -> 10分
        if (nowTime - startTime > localMetsNum) {
          console.log("error: timeout 15 minutes");
          // ループから抜ける
          repeatNum = 999;
          clearInterval(id);
          setErrorDialogVisible(true);
          setDialogText(
            "処理がタイムアウトしました。時間をあけて再度お試しください。"
          );
          return;
        }

        // 進捗を更新する関数
        const percent = ((repeatNum) / localMetsNum) * 100;
        console.log("進捗 :" + percent + "%");
        setPercent(percent);
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
        // 最後に無理やり100パーセントにする
        setPercent(100)
        setStatusMessage('草生やしたったわwwwwwww')
        repeatNum = 1;
        clearInterval(id);
        setNotifyDialogVisible(true);
        setDialogText("コミットの生成に成功しました!");
      }
    }, 5000);
    return `草生やしたったwww`;
  } catch (error) {
    console.error(error);
    setErrorDialogVisible(true);
    setDialogText(
      "コミットを生成するのに失敗しました。時間を開けて再度お試しください。\ndetail: " +
        error
    );
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
  if (cacheSha == ref.data.object.sha || repeatNum == 0) {
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
