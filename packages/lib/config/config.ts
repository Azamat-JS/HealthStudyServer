import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

@Configuration()
export class AppConfig {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @Value('PORT')
  port!: number;

  @IsString()
  @IsNotEmpty()
  @Value('DB_NAME')
  dbName!: string;

    @IsString()
  @IsNotEmpty()
  @Value('DB_PASSWORD')
  dbPassword!: string;

  @IsString()
  @IsNotEmpty()
  @Value('DB_HOST')
  dbHost!: string;

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @Value('DB_PORT')
  dbPort!: number;

  @IsString()
  @IsNotEmpty()
  @Value('DB_USERNAME')
  dbUsername!: string;

  @IsString()
  @IsNotEmpty()
  @Value('DATABASE_URL')
  databaseUrl!: string;

  @IsString()
  @IsNotEmpty()
  @Value('JWT_SECRET')
  jwtSecret: string;

  @IsString()
  @Value('JWT_EXPIRE')
  jwtExpire: string;

  @IsString()
  @IsNotEmpty()
  @Value('JWT_REFRESH_TIME')
  jwtRefresh!: string;

  @IsString()
  @IsNotEmpty()
  @Value('JWT_SECURE')
  jwtSecure!: string;
}