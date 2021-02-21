import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { StudentsService, Student } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get('grade-average')
  async getStudentGradeAverage(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
  ): Promise<Student> {
    if (!firstName || !lastName)
      throw new BadRequestException('Incomplete student information');

    const fullName = `${firstName} ${lastName}`;

    return await this.studentService.getStudentGradeAverage(fullName);
  }
}
