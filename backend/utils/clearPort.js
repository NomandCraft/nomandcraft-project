import { execSync } from 'child_process';

const clearPort = (port) => {
  if (process.platform === 'win32') {
    try {
      execSync(
        `netstat -ano | findstr :${port} | findstr LISTENING | for /f "tokens=5" %a in ('more') do taskkill /PID %a /F`,
        { stdio: 'ignore' }
      );
      console.log(`✅ Port ${port} freed on Windows`);
      // eslint-disable-next-line no-unused-vars
    } catch (_) {
      console.log(`⚠️ Port ${port} was not occupied on Windows`);
    }
  } else {
    try {
      execSync(`fuser -k ${port}/tcp`, { stdio: 'ignore' });
      console.log(`✅ Port ${port} freed on Linux/macOS`);
      // eslint-disable-next-line no-unused-vars
    } catch (_) {
      console.log(`⚠️ Port ${port} was not occupied on Linux/macOS`);
    }
  }
};

export default clearPort;
