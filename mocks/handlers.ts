import Chance from "chance";
import { rest } from "msw";
import { Project, User } from "./types";

const c = new Chance();

function createToken() {
  return { token: c.guid() };
}

function createMe() {
  return {
    userName: c.word(),
    firstName: c.first(),
    lastName: c.last(),
    email: c.email(),
    isAdmin: c.bool(),
  };
}

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
  rest.get("/me", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(createMe()));
  }),
  rest.post("/Access/login", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(createToken()));
  }),
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
  rest.post("/users", async (req, res, ctx) => {
    const user = await req.json();
    if (user.username === "error") {
      return res(ctx.delay(1000), ctx.status(403));
    }

    return res(ctx.delay(1000), ctx.json(createUser()));
  }),
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
  rest.post("/work-hours", (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(201));
  }),
];
