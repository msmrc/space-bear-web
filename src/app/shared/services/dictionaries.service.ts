import { SkillsAndCategory } from 'src/app/shared/interfaces/skills-and-category.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DictionariesService {
  constructor(private httpClient: HttpClient) { }

  getTags(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}projects/ml-get-all-tags`)
  }

  getSkillsAndCategories(): Observable<SkillsAndCategory[]> {
    return this.httpClient.get<SkillsAndCategory[]>(`${environment.apiUrl}projects/ml-get-all-skills-and-categories`)
  }
}
