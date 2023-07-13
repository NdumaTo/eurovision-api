const postDeployCommands = [
  '~/.npm-global/bin/yarn install --production --ignore-engines',
  'NODE_ENV=production ~/.npm-global/bin/yarn workspace api build'
].join(' && ')

const scriptPath = './node_modules/.bin/yarn'
const workingDirectory = '/home/ubuntu/apps/eurovision-api/current'

module.exports = {
  apps: [
    {
      name: 'Eurovision API',
      script: scriptPath,
      args: 'start',
      cwd: workingDirectory,
      autorestart: true,
      env_production: {
        NODE_ENV: 'production',
        CONFIG_FILE_PATH: '/home/ubuntu/app-configs/eurovision-api.env'
      }
    }
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'cult.nfgreading.com',
      ref: 'origin/master',
      repo: 'git@github.com:NdumaTo/eurovision-api.git',
      path: '/home/ubuntu/apps/eurovision-api/source/',
      'post-deploy': postDeployCommands,
      ssh_options: ['Port=1338', 'ForwardAgent=yes']
    }
  }
}
