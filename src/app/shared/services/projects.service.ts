import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectInterface } from '../interfaces/project.interface';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(private httpClient: HttpClient) { }

  getAllProjects(): Observable<ProjectInterface[]> {
    return this.httpClient.get<ProjectInterface[]>(`${environment.apiUrl}projects/get-all-projects`)
  }

  getProjectById(id: string): Observable<ProjectInterface> {
    return this.httpClient.get<ProjectInterface>(`${environment.apiUrl}projects/get-project-by-id/${id}`)
  }

  createProject(project: ProjectInterface): Observable<ProjectInterface> {
    return this.httpClient.post<ProjectInterface>(`${environment.apiUrl}projects/create`, project);
  }
}
