# Frontend
FROM node:12 AS ui-build
WORKDIR /usr/src/app
COPY frontend ./frontend/

# Arguments
ARG NODE_ENV
ARG PORT
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG TWITTER_API_URL
ARG TWITTER_API_KEY
ARG TWITTER_API_SECRET
ARG TWITTER_BEARER_TOKEN

# Build environment.prod.ts file.
RUN echo $GOOGLE_CLIENT_ID
RUN cd frontend && mkdir environments && touch environment.prod.ts
RUN echo "export const environment = { production: true, apiServer: { url: '', prefix: 'api/v1', }, google: { clientId: ${GOOGLE_CLIENT_ID}, }, userKey: 'user_data', messages: { success: { title: 'Success', message: 'Action was completed successfully' }, error: { title: 'Error...', message: 'Please try again', }},};"
# Build frontend.
RUN cd frontend && npm install && npm run build:prod

# Server
FROM node:12 AS server-build
WORKDIR /usr/src/app
COPY backend/ ./backend/
RUN cd backend && npm install && npm run tsc

FROM node:12
WORKDIR /usr/src/app/
COPY --from=ui-build /usr/src/app/frontend/dist ./wwwroot
COPY --from=server-build /usr/src/app/backend ./

EXPOSE 80

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
