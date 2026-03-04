"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
let app;
async function bootstrap() {
    if (!app) {
        app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }));
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: 'Content-Type, Authorization',
            credentials: true,
        });
        app.setGlobalPrefix('api');
        app.use(cookieParser());
        await app.init();
    }
    return app;
}
exports.default = async (req, res) => {
    const nestApp = await bootstrap();
    return nestApp.getHttpAdapter().getInstance()(req, res);
};
//# sourceMappingURL=index.js.map