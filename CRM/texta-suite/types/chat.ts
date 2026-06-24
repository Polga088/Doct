export interface User {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
}

export interface EmbeddedWidget {
  id: string;
  type: "jira" | "crm" | "github";
  title: string;
  status: string;
  budget?: string;
  issueId?: string;
  assignee?: string;
  icon?: string;
}

export interface Message {
  id: string;
  authorId: string;
  author: User;
  content: string;
  createdAt: string;
  widgets?: EmbeddedWidget[];
}
