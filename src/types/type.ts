
export interface JWTpayload{
   id: number
  email: string
  role: "contributor" | "maintainer";
}

export interface CreateIssuePayload {
  title: string;
  description: string;
  type: string;
  reporter_id: number;
}


export interface signupPayload{
    name: string;
  email: string;
  password: string;
  role: string;
}
export type UserRole = "contributor" | "maintainer";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export type IssueType = "bug" | "feature_request";

export type IssueStatus = "open" | "in_progress" | "resolved";

export interface Issue {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}


// xcvxckvlxkvxv
// asdfsfsdfsf