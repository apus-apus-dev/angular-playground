import { Injectable } from '@angular/core';
import { DataProvider } from './data.provider';
import { forkJoin, map, Observable } from 'rxjs';
import { Developer } from './developer';
import { Project } from './project';
import { ProjectLocation } from './project-location';
import { url } from 'gravatar';

function mapProject(people: any[], project: any): Project {
  const members = people
    .filter((developer) => project.people.includes(developer.id))
    .map((developer) => ({
      id: developer.id,
      name: developer.nickname,
      avatar: url(developer.email, {s: '40', d: 'identicon'}),
    }));
  switch (project.location as ProjectLocation) {
    case ProjectLocation.External:

  }
  return {
    ...project,
    members,
    routerLink: project.location === ProjectLocation.External ? project.externalUrl : '/projects/local/' + project.slug,
  }
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public provider: DataProvider) {
  }

  getDevelopers(): Observable<Developer[]> {
    return forkJoin([this.provider.getPeople(), this.provider.getProjects()]).pipe(
      map(([{people}, {projects}]) => {
        console.log(people)
        return people
          .map((developer) => {
            const developerProjects = projects.filter((project) => project.people.includes(developer.id))
            return {
              ...developer,
              gravatar: url(developer.email, {s: '80', d: 'identicon'}),
              projects: developerProjects,
              projectsCount: developerProjects.length,
            }
          })
          // Most involved guys go first
          .sort((a, b) => b.projectsCount - a.projectsCount);
      }),
    )
  }

  getProjects(): Observable<Project[]> {
    return forkJoin([this.provider.getPeople(), this.provider.getProjects()]).pipe(
      map(([{people}, {projects}]) => {
        return projects.map((project) => mapProject(people, project));
      }),
    )
  }

  getProject(slug: string): Observable<Project> {
    return forkJoin([this.provider.getPeople(), this.provider.getProjects()]).pipe(
      map(([{people}, {projects}]) => {
        return mapProject(people, projects.find((project) => project.slug === slug));
      }),
    );
  }

  getFeaturedProject() {
    return this.getProject('sort-racing');
  }
}
