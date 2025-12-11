import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    description: 'Токен в формате JWT',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODZiZmFhMi0wYTk5LTQ3YzYtYTUyZi04OGU0YWY4OTk4NzkiLCJ1c2VybmFtZSI6ImEiLCJpYXQiOjE3NjU0MzUyMzMsImV4cCI6MTc2ODAyNzIzM30.zMd15we6HYSZSmibXjr7BEXUPgZ5M22SaDlvYEvYlgY',
  })
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
