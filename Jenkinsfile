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
          docker compose build --no-cache app
          docker compose up -d app
          docker image prune -f || true
        '''
      }
    }
  }
  post {
    success { echo '✅ FE deployed' }
    failure { echo '❌ FE failed' }
  }
}
