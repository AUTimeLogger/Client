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
    isAdmin: true,
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

function createCsv() {
  return Array.from({ length: 50 }, (v, i) =>
    i % 5 === 0 && i !== 0 ? "\n" : c.word() + ";"
  ).join("");
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const handlers = [
  rest.get(`${baseUrl}/me`, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(createMe()));
  }),
  rest.post(`${baseUrl}/access/login`, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(createToken()));
  }),
  rest.post(`${baseUrl}/access/logout`, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(204));
  }),
  rest.get(
    `${baseUrl}/projects`,
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; json: (arg0: Project[]) => any }
    ) => {
      return res(ctx.delay(1000), ctx.json(createProjectList(15)));
    }
  ),
  rest.get(
    `${baseUrl}/projects/:id`,
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; json: (arg0: Project) => any }
    ) => {
      return res(ctx.delay(1000), ctx.json(createProject()));
    }
  ),
  rest.get(
    `${baseUrl}/projects/:id/users`,
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; json: (arg0: User[]) => any }
    ) => {
      return res(ctx.delay(1000), ctx.json(createUserList(3)));
    }
  ),
  rest.post(
    `${baseUrl}/projects/:id/users`,
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; json: (arg0: User) => any }
    ) => {
      return res(ctx.delay(1000), ctx.json(createUser()));
    }
  ),
  rest.get(
    `${baseUrl}/users`,
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; json: (arg0: User[]) => any }
    ) => {
      return res(ctx.delay(1000), ctx.json(createUserList(200)));
    }
  ),
  rest.post(`${baseUrl}/users`, async (req, res, ctx) => {
    const user = await req.json();
    if (user.username === "error") {
      return res(ctx.delay(1000), ctx.status(403));
    }

    return res(ctx.delay(1000), ctx.json(createUser()));
  }),
  rest.delete(
    `${baseUrl}/users/:id`,
    (
      req: any,
      res: (arg0: any, arg1: any) => any,
      ctx: { delay: (arg0: number) => any; status: (arg0: number) => any }
    ) => {
      return res(ctx.delay(1000), ctx.status(200));
    }
  ),
  rest.post(`${baseUrl}/work-hours`, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(201));
  }),
  rest.get(`${baseUrl}/report/:id`, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(createCsv()));
  }),
];
