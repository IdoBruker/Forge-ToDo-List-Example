import Resolver from "@forge/resolver";
import { registerTodoRoutes } from "./routers/todo.router";

const resolver = new Resolver();

registerTodoRoutes(resolver, "/api/todos");

export const handler = resolver.getDefinitions();
