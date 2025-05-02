# Step 1: Build Angular
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production

# Step 2: Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist/task-board.app.ng/browser /usr/share/nginx/html
COPY ./config/nginx/taskboard.conf /etc/nginx/conf.d/default.conf

# Step 3: Inject environment variables on app
COPY ./src/assets/env.template.js /usr/share/nginx/html/assets/env.template.js
COPY ./config/docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
