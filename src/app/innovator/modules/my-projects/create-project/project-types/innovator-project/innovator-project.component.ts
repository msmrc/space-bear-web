import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, BehaviorSubject, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DictionariesService } from 'src/app/shared/services/dictionaries.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { AppStore } from 'src/app/store/app.store';
import { SkillsAndCategory } from 'src/app/shared/interfaces/skills-and-category.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectInterface } from 'src/app/shared/interfaces/project.interface';

@Component({
  selector: 'app-innovator-project',
  templateUrl: 'innovator-project.component.html',
  styleUrls: ['./innovator-project.component.scss']
})
export class InnovatorProjectComponent implements OnInit {

  public form!: FormGroup;
  public isLoadingForm$ = new BehaviorSubject<boolean>(true);

  // data from API
  public skillsAndCategories: SkillsAndCategory[] = [];
  public tags: string[] = [];

  public currentTab: number = 1;

  private fullProfileId!: string;

  constructor(
    private appStore: AppStore,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dictionariesService: DictionariesService,
    private projectService: ProjectsService,
  ) { }

  ngOnInit() {
    this.appStore.setPageSubtitle('Заполните все необходимые данные');
    this.appStore.user$.pipe(tap((user) => {
      if (user) {
        const fullProfile = user.fullUser;
        if (fullProfile?._id) {
          this.fullProfileId = fullProfile._id;
        }
      }
    })).subscribe();

    this.dictionariesService.getSkillsAndCategories().pipe(
      tap((skillsAndCategories) => this.skillsAndCategories = skillsAndCategories),
      switchMap(() => this.dictionariesService.getTags()),
      tap((tags) => this.tags = tags),
      tap(() => this.isLoadingForm$.next(false))
    ).subscribe();

    this.initializeForm();
  }

  public createProject(): void {
    const form = this.form.value;

    const project: ProjectInterface = {
      existTeam: [{
        fullProfileId: this.fullProfileId,
        category: form.ownerCategory,
        skills: form.ownerSkills
      }],
      innovator: {
        projectLink: form.projectLink
      },
      projectDescription: form.projectDescription,
      projectName: form.projectName,
      type: 'innovator',
      lookingForTeam: form.lookingForTeam,
      projectOwnerId: this.fullProfileId,
      projectTags: form.projectTags
    };

    this.projectService.createProject(project).pipe(
      tap(() => {
        this.snackBar.open('Успешно! Ваш проект обновлен', 'Отлично');
      })
    ).subscribe();
  }


  get lookingForTeam(): FormArray {
    return this.form.controls['lookingForTeam'] as FormArray;
  }

  public getAvailbleSkillsOwner(): string[] {
    const selectedCategory = this.form.value.ownerCategory;
    if (selectedCategory) {
      const filteredSkills = this.skillsAndCategories.filter(x => x.category === selectedCategory)[0].skills;
      return filteredSkills;
    }
    return [];
  }

  public getAvailbleSkills(i: number): string[] {
    const selectedCategory = this.lookingForTeam.controls[i].value.category;
    if (selectedCategory) {
      const filteredSkills = this.skillsAndCategories.filter(x => x.category === selectedCategory)[0].skills;
      return filteredSkills;
    }
    return [];
  }

  public addLookingForMember(): void {
    this.lookingForTeam.push(
      this.fb.group({
        category: ['', Validators.required],
        skills: [[], Validators.required]
      })
    );
  }

  public removeLookingForMember(i: number) {
    this.lookingForTeam.removeAt(i);
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectTags: [[], Validators.required],
      lookingForTeam: this.fb.array([]), // form array

      ownerCategory: ['', Validators.required],
      ownerSkills: [[], Validators.required],
      projectLink: ['', Validators.required],
    });
  }
}
