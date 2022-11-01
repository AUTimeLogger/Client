import { rest } from "msw";
import { Project, User } from "./types";
import Chance from "chance";

const c = new Chance();

function createUser(): User {
  return {
    userId: c.guid(),
    username: c.word(),
    firstName: c.first(),
    lastName: c.last(),
    email: c.email(),
    department: c.company(),
  };
}

function createUserList(number: number): User[] {
  return Array.from({ length: number }, createUser);
}

function createProject(): Project {
  return {
    projectId: c.guid(),
    projectName: c.word(),
  };
}

function createProjectList(number: number): Project[] {
  return Array.from({ length: number }, createProject);
}

export const handlers = [
  rest.get(
    "/projects",
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; json: (arg0: Project[]) => any }
    ) => {
      return res(ctx.delay(1000), ctx.json(createProjectList(15)));
    }
  ),
  rest.get(
    "/projects/:id",
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; json: (arg0: Project) => any }
    ) => {
      return res(ctx.delay(1000), ctx.json(createProject()));
    }
  ),
  rest.get(
    "/projects/:id/users",
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; json: (arg0: User[]) => any }
    ) => {
      return res(ctx.delay(1000), ctx.json(createUserList(3)));
    }
  ),
  rest.post(
    "/projects/:id/users",
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; json: (arg0: User) => any }
    ) => {
      return res(ctx.delay(1000), ctx.json(createUser()));
    }
  ),
  rest.get(
    "/users",
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; json: (arg0: User[]) => any }
    ) => {
      return res(ctx.delay(1000), ctx.json(createUserList(200)));
    }
  ),
  rest.post(
    "/users",
    (
      req: { body: string },
      res: (arg0: any, arg1: undefined) => any,
      ctx: {
        status: (arg0: number) => any;
        delay: (arg0: number) => any;
        json: (arg0: User) => any;
      }
    ) => {
      const user = JSON.parse(req.body);
      if (user.username === "error") {
        return res(ctx.delay(1000), ctx.status(403));
      }

      return res(ctx.delay(1000), ctx.json(createUser()));
    }
  ),
  rest.delete(
    "/users/:id",
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; status: (arg0: number) => any }
    ) => {
      return res(ctx.delay(1000), ctx.status(200));
    }
  ),
];