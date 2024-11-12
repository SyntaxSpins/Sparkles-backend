export interface EventPayload {
  action: string;
  sender: {
    login: string;
    html_url: string;
  };
}

export interface StarEventPayload extends EventPayload {
  starred_at?: string;
  repository: {
    full_name: string;
    html_url: string;
  };
}

export interface ForkEventPayload extends EventPayload {
  forkee: {
    full_name: string;
    html_url: string;
  };
}

export interface PushEventPayload extends EventPayload {
  ref: string;
  after: string;
  repository: {
    full_name: string;
    name: string;
    html_url: string;
  };
  pusher: {
    name: string;
  };
  commits: Commit[];
}

export interface Commit {
  tree_id: string;
  message: string;
  url: string;
  author: {
    name: string;
  };
}
