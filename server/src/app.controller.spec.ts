import { ForbiddenException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should not be accessible", (done) => {
      try {
        appController.root();
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        done();
      }
    });
  });
});
