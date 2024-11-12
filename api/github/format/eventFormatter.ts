import { WebHookEvent } from "../payload/events"
import { StarEventPayload, PushEventPayload, ForkEventPayload } from "../payload/payloads";

export function formatEvent(event: WebHookEvent): string | undefined {
  const payload = event.payload;

  switch (event.eventType) {
    case "star": {
      const starPayload = payload as StarEventPayload;
      if (starPayload.action !== "created") {
        return undefined;
      }

      const userLogin = starPayload.sender.login;
      const userUrl = starPayload.sender.html_url;

      const repositoryFullname = starPayload.repository.full_name;
      const repositoryUrl = starPayload.repository.html_url;

      return `🌟 [@${userLogin}](${userUrl}) starred [${repositoryFullname}](${repositoryUrl})`; 
    }
    case "push": {
      const pushPayload = payload as PushEventPayload;
      const pushRef = pushPayload.ref;
      const pushBranch = pushRef.substring(pushRef.lastIndexOf('/')+1);
      const pusherName = pushPayload.pusher.name;

      const repositoryFullname = pushPayload.repository.full_name;
      const repositoryUrl = pushPayload.repository.html_url;

      const commits = pushPayload.commits;
      const commitCount = commits.length;

      if (commitCount < 1) {
        return undefined;
      }

      let message = `*${commitCount}* new commit${commitCount !== 1 ? 's' : ''}`;

      // Leave the name and the branch that the changes were pushed to. 
      message += ` to [${repositoryFullname}:${pushBranch}](${repositoryUrl}/tree/${pushBranch})\n`

      commits.forEach((commit) => {
        const treeId = commit.tree_id;
        const authorName = commit.author.name;
        const commitUrl = commit.url;
        const commitMessage = commit.message.replace(/([_*`{[~|])/g, '\\$1');

        message += `\n[${treeId.slice(0,7)}](${commitUrl}): ${commitMessage} by _${authorName}_`;
      });

      return message + `\n\nPushed by *${pusherName}*`;
    }
    case "fork": {
      const forkPayload = payload as ForkEventPayload;

      const userLogin = forkPayload.sender.login;
      const userUrl = forkPayload.sender.html_url;

      const forkFullname = forkPayload.forkee.full_name;
      const forkUrl = forkPayload.forkee.html_url;

      return `🍴 [@${userLogin}](${userUrl}) forked [${forkFullname}](${forkUrl})`;
    }
    default:
      return undefined;
  }
}
