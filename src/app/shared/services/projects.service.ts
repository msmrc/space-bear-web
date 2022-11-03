import { RateInterface, CommentInterface, AcceptToTeamInterface, OutgoingTeamInterface, IncomeToTeamInterface } from './../interfaces/project.interface';
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

  getProjectsByMemberId(memberId: string): Observable<ProjectInterface[]> {
    return this.httpClient.get<ProjectInterface[]>(`${environment.apiUrl}projects/get-projects-by-member-id/${memberId}`)
  }

  createProject(project: ProjectInterface): Observable<ProjectInterface> {
    return this.httpClient.post<ProjectInterface>(`${environment.apiUrl}projects/create`, project);
  }

  getProjectsForMe(profileId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrlML}search_projects_for_specialist/${profileId}`)
  }

  // in progress
  incomeToTeam(income: IncomeToTeamInterface): Observable<any> {
    return this.httpClient.post<ProjectInterface>(`${environment.apiUrl}projects/income-to-team`, income);
  }
  outgoingToTeam(outgoing: OutgoingTeamInterface): Observable<any> {
    return this.httpClient.post<ProjectInterface>(`${environment.apiUrl}projects/outgoing-to-team`, outgoing);
  }
  acceptToTeam(accept: AcceptToTeamInterface): Observable<any> {
    return this.httpClient.post<ProjectInterface>(`${environment.apiUrl}projects/accept-to-team`, accept);
  }

  rate(rate: RateInterface): Observable<any> {
    return this.httpClient.post<ProjectInterface>(`${environment.apiUrl}projects/update-rate`, rate);
  }

  comment(comment: CommentInterface): Observable<any> {
    return this.httpClient.post<ProjectInterface>(`${environment.apiUrl}projects/comment`, comment);
  }
}
