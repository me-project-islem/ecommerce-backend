const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');
const { ValidationPipe } = require('@nestjs/common');
const cookieParser = require('cookie-parser');
const { ClassSerializerInterceptor } = require('@nestjs/common');
const { Reflector } = require('@nestjs/core');

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    });

    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.use(cookieParser());

    await app.init();
  }

  return app;
}

module.exports = async (req, res) => {
  const nestApp = await bootstrap();
  return nestApp.getHttpAdapter().getInstance()(req, res);
};
