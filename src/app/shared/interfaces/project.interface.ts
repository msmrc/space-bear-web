import { UserProfileInterface } from "./user-profile.interface";

export interface ProjectInterface {
  _id?: string;
  type: string; // Выбирается на фронте из списка (Академия инноваторов, Хакатоны и цифровые конкурсы и тд)
  projectName: string; // название
  projectDescription: string; // описание
  // Для всех проектов
  isPublished?: boolean; // опубликован (доступен всем пользователям)
  projectTags: string[], // теги проекта
  projectOwnerId: string; // основатель проекта
  existTeam: MemberInterface[];
  lookingForTeam: MemberInterface[];
  incomingTeam?: MemberInterface[]; // Входящие заявки на вступление
  outgoingTeam?: MemberInterface[]; // Приглашения на вступление
  projectCostByAdmin?: CostByAdminInterface[]; // массив, чтобы отслеживать динамику проекта / сохранять историю
  isInnovated?: boolean; // идея инновационная? да / нет

  innovator: { // академия инноваторов
    projectLink: string; // ссылка на проект, если есть
    presentationFileId?: string; // id на файл с презентацией
    supportExperience?: string[]; // опыт в мерах поддержки (гранты, инкубаторы и тд)
  },
  hackathon?: any// потребуется для масштабирования (тип проекта)
  novatorOfMoscow?: any // потребуется  для масштабирования (тип проекта)
  // Социальные элементы
  views?: number; // просмотры
  rate?: RateInterface[]; // рейтинг
  comments?: CommentInterface[] // комментарии

  // ml only
  semantic?: number;
}

export interface CostByAdminInterface {
  rate: string; // хорошо / плохо
  solution: string;// готово к продвижению / нужны доработки
  publishDate: string; // дата публикации оценки
}

export interface CommentInterface {
  fullProfileId: any;
  projectId: string;
  comment: string;
}

export interface RateInterface {
  fullProfileId: any;
  projectId: string;
  count: number;
}

export interface MemberInterface {
  fullProfileId?: string | UserProfileInterface;
  category: string;
  skills: string[];
}

export interface IncomeToTeamInterface {
  fullProfileId: any;
  projectId: string;
  category: string;
  skills: string[];
}
export interface OutgoingTeamInterface {
  fullProfileId: any;
  projectId: string;
  category: string;
  skills: string[];
}
export interface AcceptToTeamInterface {
  type: string; // outgoing / income
  fullProfileId: any;
  projectId: string;
  category: string;
  skills: string[];
}
