FROM node:20-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
RUN npm install -g @nestjs/cli
RUN ls

FROM base as dev-deps
WORKDIR /app
COPY package.json package.json
RUN pnpm install

FROM base as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM base as prod-deps
WORKDIR /app
COPY package.json package.json
RUN pnpm install --prod

FROM base as prod
WORKDIR /app
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD ["pnpm", "start"]