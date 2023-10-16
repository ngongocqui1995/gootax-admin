import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    // SERVER_API: 'https://apigootax-ngongocqui1995.cloud.okteto.net',
    SERVER_API: 'http://localhost:3333',
    SOCKET_URL: 'https://apigootax-ngongocqui1995.cloud.okteto.net',
    GOOGLE_MAPS_APIKEY: 'AIzaSyDuG_Yw3NrzoN79fIWHnE10-9zSbcNvJK8',
    HOST_NAME: 'http://localhost:8000',
    UPLOAD_FILE_SIZE: 1048576 * 100,
  },
});
