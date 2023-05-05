import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './utils/setupSwagger';
import * as config from 'config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const serverConfig = config.get('server');
  setupSwagger(app);
  const port = serverConfig.port;
  await app.listen(port);

  Logger.log(`Application running on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
    Logger.log(`Application webpack-hmr running`);
  }
}
bootstrap();
