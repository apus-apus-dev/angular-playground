export interface Developer {
  id: string;
  nickname: string;
  realName: string;
  email: string;
  githubUsername: string;
  gravatar: string;
  projects: any[];
  projectsCount: number;
  colors?: {
    primary: string,
    secondary: string,
    color: string,
  }
}
