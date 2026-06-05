pipeline {
  agent any
  options { timestamps() }
  environment { APP_DIR = '/srv/fe-app' }
  stages {
    stage('Check Workspace') {
      steps {
        sh 'ls -al'
      }
    }
    stage('Sync to deploy dir') {
      steps {
        sh '''
          set -e
          rsync -rvl --no-p --no-o --no-g --delete --exclude '.env' --exclude '.git' "$WORKSPACE"/ "${APP_DIR}/"
        '''
      }
    }
    stage('Build & Restart') {
      steps {
        sh '''
          set -e
          cd "${APP_DIR}"
          npm ci --prefer-offline
          npm run build
          pm2 restart fe-portofolio || pm2 start "node .output/server/index.mjs" --name fe-portofolio
        '''
      }
    }
  }
  post {
    success { echo '✅ FE deployed' }
    failure { echo '❌ FE failed' }
  }
}
