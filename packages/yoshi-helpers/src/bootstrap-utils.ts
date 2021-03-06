import fs from 'fs';
import { join } from 'path';
import { NODE_PLATFORM_DEFAULT_CONFIGS_DIR } from 'yoshi-config/build/paths';

export const getEnvVars = ({
  port,
  appConfDir,
  appLogDir,
  appPersistentDir,
  appTmplDir = './templates',
}: {
  port: number;
  appConfDir: string;
  appLogDir: string;
  appPersistentDir: string;
  appTmplDir: string;
}) => {
  const PORT = Number(port) || 3000;
  const GRPC_PORT = PORT + 1;
  const MANAGEMENT_PORT = PORT + 4;
  const WNP_TEST_RPC_PORT = PORT + 2;
  const WNP_TEST_PETRI_PORT = PORT + 3;
  const WIX_BOOT_LABORATORY_URL = `http://localhost:${WNP_TEST_PETRI_PORT}`;

  return {
    PORT,
    GRPC_PORT,
    MANAGEMENT_PORT,
    WNP_TEST_RPC_PORT,
    WNP_TEST_PETRI_PORT,
    WIX_BOOT_LABORATORY_URL,
    APP_CONF_DIR: appConfDir,
    APP_LOG_DIR: appLogDir,
    APP_PERSISTENT_DIR: appPersistentDir,
    APP_TEMPL_DIR: appTmplDir,
    NEW_RELIC_LOG_LEVEL: 'warn',
  };
};

export const getDevelopmentEnvVars = ({
  port,
  cwd = process.cwd(),
}: {
  port: number;
  cwd?: string;
}) => {
  // Check if the project has the default directory for loading node platform
  // configs. If it exists, the project is not using the `index-dev.js` pattern and we
  // keep the defaults. Otherwise, we inject our own defaults to keep boilerplate to a minimum.
  if (fs.existsSync(join(cwd, NODE_PLATFORM_DEFAULT_CONFIGS_DIR))) {
    return {};
  }

  const envVars = getEnvVars({
    port,
    appConfDir:
      process.env.APP_CONF_DIR || join(cwd, 'target', 'dev', 'configs'),
    appLogDir: join(cwd, 'target', 'dev', 'logs'),
    appPersistentDir: join(cwd, 'target', 'dev', 'persistent'),
    appTmplDir: join(cwd, 'templates'),
  });

  return envVars;
};
