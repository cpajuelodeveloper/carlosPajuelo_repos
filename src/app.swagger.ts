import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as pjson from '../package.json';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(pjson['name'])
    .setDescription(pjson['description'])
    .setVersion(pjson['version'])
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const options = {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('api/swagger', app, document, options);
};
