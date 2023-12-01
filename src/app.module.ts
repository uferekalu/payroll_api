import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configSchemaValidation } from './config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementsModule } from './elements/elements.module';
import { LookupsModule } from './lookups/lookups.module';
import { LookupvaluesModule } from './lookupvalues/lookupvalues.module';
import { SuborganizationsModule } from './suborganizations/suborganizations.module';
import { DepartmentModule } from './department/department.module';
import { GradeModule } from './grade/grade.module';
import { GradestepsModule } from './gradesteps/gradesteps.module';
import { ElementlinksModule } from './elementlinks/elementlinks.module';
import { PdfDownloadModule } from './pdf_download/pdf_download.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`stage.${process.env.STAGE}.env`],
      validationSchema: configSchemaValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    ElementsModule,
    LookupsModule,
    LookupvaluesModule,
    SuborganizationsModule,
    DepartmentModule,
    GradeModule,
    GradestepsModule,
    ElementlinksModule,
    PdfDownloadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
