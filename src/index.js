import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { createDirIfNotExists } from "./utils/createDirIfNotExists.js";

import { TEMP_UPLOAD_DIR } from "./constans/index.js";

const boostrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  setupServer();
};

boostrap();
