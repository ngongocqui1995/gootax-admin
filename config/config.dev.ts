import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    SERVER_API: 'http://localhost:3333',
    SOCKET_URL: 'http://localhost:3333',
    HOST_NAME: 'http://localhost:8000',
    UPLOAD_FILE_SIZE: 1048576 * 100,
  },
});
