import {TodoDto} from '../dtos/todo.dto';

export class Todo {
  id: number | undefined;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;

  constructor(id: number | undefined, title: string, description: string,
              isCompleted: boolean, dueDate: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
  }

  get isOverdue(): boolean {
    return !this.isCompleted && this.dueDate < new Date();
  }

  static fromDto(dto: TodoDto): Todo {
    return new Todo(
      dto.Id,
      dto.Title,
      dto.Description,
      dto.IsCompleted,
      dto.DueDate,
    );
  }

  toDto(): TodoDto {
    let newDto: any = {
      Title: this.title,
      Description: this.description,
      IsCompleted: this.isCompleted,
      DueDate: this.dueDate
    }
    if (this.id) {
      newDto.Id = this.id;
    }

    return newDto;
  }

  static readonly EMPTY: Todo = new Todo(undefined, '', '', false, new Date())
}
