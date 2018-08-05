const path = require('path');
const bootstrap = require('wix-bootstrap-ng');

const rootDir = process.env.SRC_PATH || './dist/src';
const getPath = filename => path.join(rootDir, filename);
const hadronOpts = {
  staticArtifacts: [{
    artifactId: 'com.wixpress.{%projectName%}'
  }]
};

bootstrap()
  .use(require('wix-bootstrap-greynode'))
  .use(require('wix-bootstrap-hadron'), hadronOpts)
  .express(getPath('server'))
  .start({ disableCluster: process.env.NODE_ENV === 'development' });
