# Frontend
FROM node:16 AS ui-build
WORKDIR /usr/src/app
COPY frontend ./frontend/

# Arguments
ARG GOOGLE_CLIENT_ID

# Build environment.prod.ts file.
RUN cd frontend && mkdir environments && touch environment.prod.ts
RUN cd frontend && echo "export const environment = { production: true, apiServer: { url: '', prefix: 'api/v1', }, google: { clientId: '${GOOGLE_CLIENT_ID}', }, userKey: 'user_data', messages: { success: { title: 'Success', message: 'Action was completed successfully' }, error: { title: 'Error...', message: 'Please try again', }},};" > environments/environment.prod.ts
# Install Angular Cli
RUN cd frontend && npm install @angular/cli@10.2.3 -g
RUN cd frontend && ng --version
# Build frontend.
RUN cd frontend && npm install --verbose --force 
RUN cd frontend && ng build --prod --aot

# Server
FROM node:16 AS server-build
WORKDIR /usr/src/app
COPY backend/ ./backend/
RUN cd backend && npm install --verbose && npm run tsc

FROM node:16
WORKDIR /usr/src/app/
COPY --from=ui-build /usr/src/app/frontend/dist ./wwwroot
COPY --from=server-build /usr/src/app/backend ./

EXPOSE 80

# Arguments
ARG NODE_ENV
ARG PORT
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG TWITTER_API_URL
ARG TWITTER_API_KEY
ARG TWITTER_API_SECRET
ARG TWITTER_BEARER_TOKEN

# Set environment variables
ENV NODE_ENV = $NODE_ENV
ENV PORT = $PORT
ENV GOOGLE_CLIENT_ID = $GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET = $GOOGLE_CLIENT_SECRET
ENV TWITTER_API_URL = $TWITTER_API_URL
ENV TWITTER_API_KEY = $TWITTER_API_KEY
ENV TWITTER_API_SECRET = $TWITTER_API_SECRET
ENV TWITTER_BEARER_TOKEN = $TWITTER_BEARER_TOKEN

CMD ["node", "./build/server.js"]
