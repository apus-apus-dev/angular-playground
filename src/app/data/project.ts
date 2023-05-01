import { ProjectLocation } from './project-location';

export interface Project {
  name: string,
  location: ProjectLocation,
  slug: string,
  routerLink: string,
  members: { id: string, name: string, avatar: string }[]
}
