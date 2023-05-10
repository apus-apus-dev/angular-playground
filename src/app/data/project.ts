import { ProjectLocation } from './project-location';

export interface Project {
  description: string;
  name: string,
  location: ProjectLocation,
  slug: string,
  routerLink: string,
  members: { id: string, name: string, avatar: string }[]
}
