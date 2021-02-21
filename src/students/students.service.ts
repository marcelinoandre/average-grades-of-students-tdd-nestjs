import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentAverageDto } from './dtos/student-average.dto';

export interface Student {
  name: string;
  grades: number[];
  average: number;
}

@Injectable()
export class StudentsService {
  students = [{ name: 'Andre Marcelino', grades: [8.5, 9.0, 7.5, 10] }];

  getStudentGradeAverage(fullName: string): Student {
    const student: StudentAverageDto = this.students.find(
      (item) => item.name === fullName,
    );

    if (!student) throw new NotFoundException('Student not found.');

    const avg = this.gradeAverage(student.grades);

    return { name: student.name, grades: student.grades, average: avg };
  }

  private gradeAverage(grades: number[]): number {
    let gpa = 0;
    for (const grade of grades) {
      gpa += grade / grades.length;
    }
    return gpa;
  }
}
