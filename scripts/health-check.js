#!/usr/bin/env node

/**
 * AI Assistant Framework Health Check Script
 * 
 * This script tests the connectivity and functionality of all skills
 * and repositories to ensure they are working properly.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

// Health check results
let healthResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    errors: [],
    skillResults: {},
    repositoryResults: {}
};

// Configuration
const config = {
    rootDir: process.cwd(),
    skills: [
        {
            name: 'Gusto Slack',
            dir: 'skills/gusto-slack',
            testCommand: 'node test-connection.js',
            type: 'browser'
        },
        {
            name: 'Gusto JIRA',
            dir: 'skills/gusto-jira',
            testCommand: 'node test-connection.js',
            type: 'api'
        },
        {
            name: 'Google Docs',
            dir: 'skills/google-docs',
            testCommand: 'node test-connection.js',
            type: 'browser'
        }
    ],
    timeout: 30000 // 30 seconds timeout for each test
};

// Utility functions
function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
    log(`✅ ${message}`, colors.green);
    healthResults.passed++;
}

function logError(message) {
    log(`❌ ${message}`, colors.red);
    healthResults.failed++;
    healthResults.errors.push(message);
}

function logWarning(message) {
    log(`⚠️  ${message}`, colors.yellow);
    healthResults.warnings++;
}

function logInfo(message) {
    log(`ℹ️  ${message}`, colors.blue);
}

function dirExists(dirPath) {
    const fullPath = path.join(config.rootDir, dirPath);
    return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
}

function fileExists(filePath) {
    return fs.existsSync(path.join(config.rootDir, filePath));
}

function runWithTimeout(command, cwd, timeout = config.timeout) {
    try {
        const result = execSync(command, {
            cwd: cwd,
            timeout: timeout,
            stdio: 'pipe',
            encoding: 'utf8'
        });
        return { success: true, output: result };
    } catch (error) {
        return { 
            success: false, 
            error: error.message,
            output: error.stdout || error.stderr || '',
            timedOut: error.killed && error.signal === 'SIGTERM'
        };
    }
}

function checkEnvironmentVariables() {
    log(`\n${colors.bold}🔐 Checking Environment Variables${colors.reset}`);
    
    const requiredEnvVars = {
        'JIRA': ['ATLASSIAN_API_TOKEN', 'JIRA_BASE_URL', 'JIRA_EMAIL'],
        'Slack': ['SLACK_WORKSPACE_URL'],
        'Google': ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
        'Browser': ['EDGE_DEBUGGING_PORT']
    };
    
    let envCheckPassed = true;
    
    // Check if .env file exists
    if (fileExists('.env')) {
        logSuccess('.env file exists');
        
        // Load environment variables
        require('dotenv').config();
        
        // Check each category
        Object.keys(requiredEnvVars).forEach(category => {
            const vars = requiredEnvVars[category];
            let categoryPassed = true;
            
            vars.forEach(envVar => {
                if (process.env[envVar]) {
                    logSuccess(`  ${envVar} is set`);
                } else {
                    logWarning(`  ${envVar} not set (${category} skill may not work)`);
                    categoryPassed = false;
                }
            });
            
            if (categoryPassed) {
                logSuccess(`${category} environment variables configured`);
            } else {
                logWarning(`${category} environment variables incomplete`);
            }
        });
    } else {
        logWarning('.env file not found - skills may not work without configuration');
        logInfo('Create .env from .env.example template');
        envCheckPassed = false;
    }
    
    return envCheckPassed;
}

function checkBrowserSetup() {
    log(`\n${colors.bold}🌐 Checking Browser Setup${colors.reset}`);
    
    // Check if Edge debugging port is available
    const port = process.env.EDGE_DEBUGGING_PORT || 9222;
    
    try {
        const http = require('http');
        const request = http.request({
            hostname: 'localhost',
            port: port,
            path: '/json/version',
            method: 'GET',
            timeout: 5000
        }, (res) => {
            if (res.statusCode === 200) {
                logSuccess(`Edge browser debugging available on port ${port}`);
                return true;
            } else {
                logWarning(`Edge browser debugging not responding properly (status: ${res.statusCode})`);
                return false;
            }
        });
        
        request.on('error', (error) => {
            logWarning(`Edge browser debugging not available on port ${port}`);
            logInfo('Browser automation skills may need manual Edge launch');
            return false;
        });
        
        request.end();
    } catch (error) {
        logWarning(`Unable to check Edge browser debugging: ${error.message}`);
        return false;
    }
}

function testSkillHealth(skill) {
    log(`\n${colors.bold}🎯 Testing ${skill.name} Skill${colors.reset}`);
    
    const skillPath = path.join(config.rootDir, skill.dir);
    
    // Check if skill directory exists
    if (!dirExists(skill.dir)) {
        logError(`${skill.name} directory not found: ${skill.dir}`);
        healthResults.skillResults[skill.name] = { 
            status: 'error', 
            message: 'Directory not found' 
        };
        return false;
    }
    
    logSuccess(`${skill.name} directory exists`);
    
    // Check if test connection script exists
    const testScript = path.join(skillPath, 'test-connection.js');
    if (!fs.existsSync(testScript)) {
        logError(`${skill.name} test script not found: test-connection.js`);
        healthResults.skillResults[skill.name] = { 
            status: 'error', 
            message: 'Test script not found' 
        };
        return false;
    }
    
    logSuccess(`${skill.name} test script exists`);
    
    // Run the test connection script
    logInfo(`Running ${skill.name} connectivity test...`);
    
    const result = runWithTimeout(skill.testCommand, skillPath);
    
    if (result.success) {
        logSuccess(`${skill.name} connectivity test passed`);
        healthResults.skillResults[skill.name] = { 
            status: 'healthy', 
            message: 'Connectivity test passed' 
        };
        return true;
    } else {
        if (result.timedOut) {
            logError(`${skill.name} connectivity test timed out`);
            healthResults.skillResults[skill.name] = { 
                status: 'timeout', 
                message: 'Test timed out' 
            };
        } else {
            logError(`${skill.name} connectivity test failed`);
            logInfo(`Error: ${result.error}`);
            if (result.output) {
                logInfo(`Output: ${result.output.substring(0, 200)}...`);
            }
            healthResults.skillResults[skill.name] = { 
                status: 'failed', 
                message: result.error,
                output: result.output
            };
        }
        return false;
    }
}

function checkRepositorySetup() {
    log(`\n${colors.bold}📁 Checking Repository Setup${colors.reset}`);
    
    const repoScripts = [
        'repos/setup-branch.sh',
        'repos/setup-pr.sh',
        'repos/update-repo.sh',
        'repos/list-repos.sh'
    ];
    
    let repoSetupHealthy = true;
    
    // Check if repos directory exists
    if (!dirExists('repos')) {
        logError('repos/ directory not found');
        repoSetupHealthy = false;
    } else {
        logSuccess('repos/ directory exists');
    }
    
    // Check repository scripts
    repoScripts.forEach(script => {
        if (fileExists(script)) {
            logSuccess(`Repository script ${script} exists`);
            
            // Check if script is executable
            try {
                const stats = fs.statSync(path.join(config.rootDir, script));
                if (stats.mode & parseInt('111', 8)) {
                    logSuccess(`  ${script} is executable`);
                } else {
                    logWarning(`  ${script} is not executable`);
                }
            } catch (error) {
                logWarning(`  Unable to check ${script} permissions`);
            }
        } else {
            logError(`Repository script ${script} missing`);
            repoSetupHealthy = false;
        }
    });
    
    // Check for existing repositories
    if (dirExists('repos')) {
        try {
            const repoEntries = fs.readdirSync(path.join(config.rootDir, 'repos'))
                .filter(entry => {
                    const entryPath = path.join(config.rootDir, 'repos', entry);
                    return fs.statSync(entryPath).isDirectory() && entry !== '.';
                });
            
            if (repoEntries.length > 0) {
                logSuccess(`Found ${repoEntries.length} configured repositories`);
                repoEntries.forEach(repo => {
                    logInfo(`  Repository: ${repo}`);
                });
            } else {
                logInfo('No repositories configured yet');
                logInfo('Use ./repos/setup-branch.sh to add repositories');
            }
        } catch (error) {
            logWarning(`Unable to check repositories: ${error.message}`);
        }
    }
    
    return repoSetupHealthy;
}

function checkGitSetup() {
    log(`\n${colors.bold}🔄 Checking Git Setup${colors.reset}`);
    
    try {
        // Check if git is available
        const gitVersion = execSync('git --version', { stdio: 'pipe', encoding: 'utf8' });
        logSuccess(`Git is available: ${gitVersion.trim()}`);
        
        // Check git configuration
        try {
            const gitUser = execSync('git config user.name', { stdio: 'pipe', encoding: 'utf8' });
            const gitEmail = execSync('git config user.email', { stdio: 'pipe', encoding: 'utf8' });
            
            logSuccess(`Git user configured: ${gitUser.trim()}`);
            logSuccess(`Git email configured: ${gitEmail.trim()}`);
        } catch (error) {
            logWarning('Git user/email not configured globally');
            logInfo('Configure with: git config --global user.name "Your Name"');
            logInfo('Configure with: git config --global user.email "your@email.com"');
        }
        
        // Check SSH key availability
        try {
            const sshTest = execSync('ssh -T git@github.com 2>&1', { stdio: 'pipe', encoding: 'utf8' });
            if (sshTest.includes('successfully authenticated')) {
                logSuccess('SSH key authentication with GitHub working');
            } else {
                logWarning('SSH key authentication may not be working');
                logInfo('Test with: ssh -T git@github.com');
            }
        } catch (error) {
            logWarning('Unable to test SSH key authentication');
        }
        
        return true;
    } catch (error) {
        logError(`Git not available: ${error.message}`);
        return false;
    }
}

function checkNodeModules() {
    log(`\n${colors.bold}📦 Checking Node.js Dependencies${colors.reset}`);
    
    if (!dirExists('node_modules')) {
        logError('node_modules directory not found');
        logInfo('Run: npm install');
        return false;
    }
    
    logSuccess('node_modules directory exists');
    
    // Check key dependencies
    const keyDependencies = ['playwright', 'dotenv'];
    let depsHealthy = true;
    
    keyDependencies.forEach(dep => {
        if (dirExists(`node_modules/${dep}`)) {
            logSuccess(`  ${dep} installed`);
        } else {
            logError(`  ${dep} not installed`);
            depsHealthy = false;
        }
    });
    
    // Check if playwright browsers are installed
    try {
        const playwrightVersion = execSync('npx playwright --version', { stdio: 'pipe', encoding: 'utf8' });
        logSuccess(`Playwright CLI available: ${playwrightVersion.trim()}`);
    } catch (error) {
        logWarning('Playwright CLI not working - browsers may not be installed');
        logInfo('Run: npm run install-browsers');
    }
    
    return depsHealthy;
}

function generateHealthReport() {
    log(`\n${colors.bold}📊 Health Check Summary${colors.reset}`);
    
    const total = healthResults.passed + healthResults.failed + healthResults.warnings;
    
    log(`\n${colors.green}✅ Passed: ${healthResults.passed}${colors.reset}`);
    log(`${colors.red}❌ Failed: ${healthResults.failed}${colors.reset}`);
    log(`${colors.yellow}⚠️  Warnings: ${healthResults.warnings}${colors.reset}`);
    log(`${colors.blue}📊 Total Checks: ${total}${colors.reset}`);
    
    // Skill health summary
    log(`\n${colors.bold}🎯 Skill Health Status:${colors.reset}`);
    Object.keys(healthResults.skillResults).forEach(skillName => {
        const result = healthResults.skillResults[skillName];
        const statusColor = result.status === 'healthy' ? colors.green : 
                          result.status === 'timeout' ? colors.yellow : colors.red;
        log(`  ${skillName}: ${statusColor}${result.status}${colors.reset} - ${result.message}`);
    });
    
    // Overall health assessment
    if (healthResults.failed === 0) {
        log(`\n${colors.green}${colors.bold}🎉 Framework health check passed!${colors.reset}`);
        if (healthResults.warnings > 0) {
            log(`${colors.yellow}Note: ${healthResults.warnings} warnings found - some features may be limited.${colors.reset}`);
        }
    } else {
        log(`\n${colors.red}${colors.bold}❌ Framework health check failed!${colors.reset}`);
        log(`${colors.red}Issues found that may affect functionality:${colors.reset}`);
        healthResults.errors.forEach(error => {
            log(`  • ${error}`, colors.red);
        });
    }
    
    // Provide recommendations
    log(`\n${colors.bold}🚀 Recommendations:${colors.reset}`);
    
    if (healthResults.failed === 0) {
        log(`${colors.green}• Framework is healthy and ready for use${colors.reset}`);
        log(`${colors.blue}• All skills are functioning properly${colors.reset}`);
    } else {
        log(`${colors.red}• Address the failed health checks above${colors.reset}`);
        log(`${colors.blue}• Check .env configuration for missing variables${colors.reset}`);
        log(`${colors.blue}• Ensure all dependencies are installed${colors.reset}`);
    }
    
    // Skills-specific recommendations
    const failedSkills = Object.keys(healthResults.skillResults).filter(
        skill => healthResults.skillResults[skill].status !== 'healthy'
    );
    
    if (failedSkills.length > 0) {
        log(`\n${colors.bold}🔧 Skill-Specific Recommendations:${colors.reset}`);
        failedSkills.forEach(skillName => {
            const result = healthResults.skillResults[skillName];
            log(`${colors.yellow}${skillName}:${colors.reset}`);
            
            if (result.status === 'timeout') {
                log(`  • Check network connectivity`);
                log(`  • Verify service availability`);
                log(`  • Review authentication credentials`);
            } else if (result.status === 'failed') {
                log(`  • Check configuration in .env file`);
                log(`  • Verify API tokens and credentials`);
                log(`  • Review skill-specific documentation`);
            }
        });
    }
}

// Main health check function
function main() {
    log(`${colors.bold}${colors.cyan}AI Assistant Framework Health Check${colors.reset}`);
    log(`${colors.cyan}Testing framework components and connectivity...${colors.reset}`);
    
    // Run all health checks
    checkEnvironmentVariables();
    checkNodeModules();
    checkBrowserSetup();
    checkGitSetup();
    checkRepositorySetup();
    
    // Test all skills
    config.skills.forEach(skill => {
        testSkillHealth(skill);
    });
    
    // Generate summary report
    generateHealthReport();
    
    // Exit with appropriate code
    process.exit(healthResults.failed === 0 ? 0 : 1);
}

// Run health check
if (require.main === module) {
    main();
}

module.exports = {
    main,
    healthResults
}; 