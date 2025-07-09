#!/usr/bin/env node

/**
 * AI Assistant Framework Validation Script
 * 
 * This script validates the framework setup to ensure all components
 * are properly configured and ready for use.
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

// Configuration
const config = {
    rootDir: process.cwd(),
    requiredFiles: [
        'package.json',
        'README.md',
        '.env.example',
        '.gitignore',
        '.cursorignore',
        'lib/browser-helper.js'
    ],
    requiredDirs: [
        'lib',
        'skills',
        'repos',
        'docs',
        'scripts',
        'tmp',
        '.cursor'
    ],
    skillDirs: [
        'skills/gusto-slack',
        'skills/gusto-jira',
        'skills/google-docs',
        'skills/code-review',
        'skills/feature-development'
    ],
    repoScripts: [
        'repos/setup-branch.sh',
        'repos/setup-pr.sh',
        'repos/update-repo.sh',
        'repos/list-repos.sh'
    ],
    docFiles: [
        'docs/README.md',
        'docs/getting-started.md',
        'docs/architecture.md',
        'docs/creating-skills.md',
        'docs/repository-management.md'
    ]
};

// Validation results
let validationResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    errors: []
};

// Utility functions
function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
    log(`✅ ${message}`, colors.green);
    validationResults.passed++;
}

function logError(message) {
    log(`❌ ${message}`, colors.red);
    validationResults.failed++;
    validationResults.errors.push(message);
}

function logWarning(message) {
    log(`⚠️  ${message}`, colors.yellow);
    validationResults.warnings++;
}

function logInfo(message) {
    log(`ℹ️  ${message}`, colors.blue);
}

function fileExists(filePath) {
    return fs.existsSync(path.join(config.rootDir, filePath));
}

function dirExists(dirPath) {
    const fullPath = path.join(config.rootDir, dirPath);
    return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
}

function isExecutable(filePath) {
    try {
        const fullPath = path.join(config.rootDir, filePath);
        const stats = fs.statSync(fullPath);
        return (stats.mode & parseInt('111', 8)) !== 0;
    } catch (error) {
        return false;
    }
}

function validateNodeVersion() {
    const requiredVersion = '18.0.0';
    const currentVersion = process.version;
    
    log(`\n${colors.bold}🔍 Validating Node.js Version${colors.reset}`);
    
    if (currentVersion >= `v${requiredVersion}`) {
        logSuccess(`Node.js version ${currentVersion} meets requirement (>= ${requiredVersion})`);
    } else {
        logError(`Node.js version ${currentVersion} is below required ${requiredVersion}`);
    }
}

function validatePackageJson() {
    log(`\n${colors.bold}📦 Validating Package Configuration${colors.reset}`);
    
    if (!fileExists('package.json')) {
        logError('package.json not found');
        return;
    }
    
    logSuccess('package.json exists');
    
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(config.rootDir, 'package.json'), 'utf8'));
        
        // Check required fields
        const requiredFields = ['name', 'version', 'description', 'scripts', 'dependencies'];
        requiredFields.forEach(field => {
            if (packageJson[field]) {
                logSuccess(`package.json has ${field}`);
            } else {
                logError(`package.json missing ${field}`);
            }
        });
        
        // Check for required dependencies
        const requiredDeps = ['playwright', 'dotenv'];
        requiredDeps.forEach(dep => {
            if (packageJson.dependencies && packageJson.dependencies[dep]) {
                logSuccess(`Required dependency ${dep} found`);
            } else {
                logError(`Required dependency ${dep} missing`);
            }
        });
        
        // Check for useful scripts
        const expectedScripts = ['setup', 'validate', 'health-check', 'test-all-skills'];
        expectedScripts.forEach(script => {
            if (packageJson.scripts && packageJson.scripts[script]) {
                logSuccess(`Script ${script} configured`);
            } else {
                logWarning(`Script ${script} not found (optional)`);
            }
        });
        
    } catch (error) {
        logError(`Failed to parse package.json: ${error.message}`);
    }
}

function validateDirectoryStructure() {
    log(`\n${colors.bold}📁 Validating Directory Structure${colors.reset}`);
    
    // Check required directories
    config.requiredDirs.forEach(dir => {
        if (dirExists(dir)) {
            logSuccess(`Directory ${dir}/ exists`);
        } else {
            logError(`Directory ${dir}/ missing`);
        }
    });
    
    // Check required files
    config.requiredFiles.forEach(file => {
        if (fileExists(file)) {
            logSuccess(`File ${file} exists`);
        } else {
            logError(`File ${file} missing`);
        }
    });
}

function validateSkills() {
    log(`\n${colors.bold}🎯 Validating Skills${colors.reset}`);
    
    config.skillDirs.forEach(skillDir => {
        if (dirExists(skillDir)) {
            logSuccess(`Skill directory ${skillDir}/ exists`);
            
            // Check for required skill files
            const requiredSkillFiles = [
                'README.md',
                'config.js',
                'test-connection.js',
                '.cursor/learnings.md',
                '.cursor/automation-rules.md',
                '.cursor/best-practices.md',
                '.cursor/prompts.md'
            ];
            
            requiredSkillFiles.forEach(file => {
                const filePath = path.join(skillDir, file);
                if (fileExists(filePath)) {
                    logSuccess(`  ${skillDir}/${file} exists`);
                } else {
                    logWarning(`  ${skillDir}/${file} missing`);
                }
            });
        } else {
            logError(`Skill directory ${skillDir}/ missing`);
        }
    });
}

function validateRepositoryScripts() {
    log(`\n${colors.bold}🔧 Validating Repository Scripts${colors.reset}`);
    
    config.repoScripts.forEach(script => {
        if (fileExists(script)) {
            logSuccess(`Repository script ${script} exists`);
            
            if (isExecutable(script)) {
                logSuccess(`  ${script} is executable`);
            } else {
                logWarning(`  ${script} is not executable`);
            }
        } else {
            logError(`Repository script ${script} missing`);
        }
    });
}

function validateDocumentation() {
    log(`\n${colors.bold}📚 Validating Documentation${colors.reset}`);
    
    config.docFiles.forEach(docFile => {
        if (fileExists(docFile)) {
            logSuccess(`Documentation file ${docFile} exists`);
            
            // Check file size to ensure it's not empty
            const stats = fs.statSync(path.join(config.rootDir, docFile));
            if (stats.size > 100) {
                logSuccess(`  ${docFile} has content (${stats.size} bytes)`);
            } else {
                logWarning(`  ${docFile} appears to be empty or very small`);
            }
        } else {
            logError(`Documentation file ${docFile} missing`);
        }
    });
}

function validateEnvironmentSetup() {
    log(`\n${colors.bold}🔐 Validating Environment Setup${colors.reset}`);
    
    // Check for .env.example
    if (fileExists('.env.example')) {
        logSuccess('.env.example template exists');
        
        // Read .env.example and check for key sections
        const envExample = fs.readFileSync(path.join(config.rootDir, '.env.example'), 'utf8');
        const expectedSections = [
            'JIRA Integration',
            'Slack Integration',
            'Google Services',
            'Browser Automation',
            'Development & Debugging'
        ];
        
        expectedSections.forEach(section => {
            if (envExample.includes(section)) {
                logSuccess(`  .env.example contains ${section} section`);
            } else {
                logWarning(`  .env.example missing ${section} section`);
            }
        });
    } else {
        logError('.env.example template missing');
    }
    
    // Check if .env exists (should exist for actual usage)
    if (fileExists('.env')) {
        logInfo('.env file exists (good for local development)');
    } else {
        logInfo('.env file not found (create from .env.example for local development)');
    }
}

function validateNodeModules() {
    log(`\n${colors.bold}🔗 Validating Dependencies${colors.reset}`);
    
    if (dirExists('node_modules')) {
        logSuccess('node_modules directory exists');
        
        // Check for key dependencies
        const keyDependencies = ['playwright', 'dotenv'];
        keyDependencies.forEach(dep => {
            if (dirExists(`node_modules/${dep}`)) {
                logSuccess(`  ${dep} installed`);
            } else {
                logError(`  ${dep} not installed`);
            }
        });
    } else {
        logError('node_modules directory missing - run "npm install"');
    }
}

function validatePlaywrightBrowsers() {
    log(`\n${colors.bold}🌐 Validating Playwright Browsers${colors.reset}`);
    
    try {
        // Check if playwright is installed
        const playwright = require('playwright');
        logSuccess('Playwright package is available');
        
        // Try to check browser installation
        try {
            execSync('npx playwright --version', { stdio: 'pipe' });
            logSuccess('Playwright CLI is functional');
        } catch (error) {
            logWarning('Playwright CLI check failed - may need browser installation');
        }
        
    } catch (error) {
        logError('Playwright package not available - run "npm install"');
    }
}

function validateGitConfiguration() {
    log(`\n${colors.bold}🔄 Validating Git Configuration${colors.reset}`);
    
    // Check .gitignore
    if (fileExists('.gitignore')) {
        logSuccess('.gitignore exists');
        
        const gitignore = fs.readFileSync(path.join(config.rootDir, '.gitignore'), 'utf8');
        const expectedPatterns = ['.env', 'node_modules/', 'tmp/', 'repos/*/code/'];
        
        expectedPatterns.forEach(pattern => {
            if (gitignore.includes(pattern)) {
                logSuccess(`  .gitignore includes ${pattern}`);
            } else {
                logWarning(`  .gitignore missing ${pattern}`);
            }
        });
    } else {
        logError('.gitignore missing');
    }
    
    // Check .cursorignore
    if (fileExists('.cursorignore')) {
        logSuccess('.cursorignore exists');
    } else {
        logWarning('.cursorignore missing');
    }
}

function validateLearningSystem() {
    log(`\n${colors.bold}🧠 Validating Learning System${colors.reset}`);
    
    // Check root .cursor directory
    if (dirExists('.cursor')) {
        logSuccess('Root .cursor directory exists');
        
        const rootCursorFiles = ['learnings.md'];
        rootCursorFiles.forEach(file => {
            if (fileExists(`.cursor/${file}`)) {
                logSuccess(`  .cursor/${file} exists`);
            } else {
                logWarning(`  .cursor/${file} missing`);
            }
        });
    } else {
        logError('Root .cursor directory missing');
    }
}

function generateSummary() {
    log(`\n${colors.bold}📊 Validation Summary${colors.reset}`);
    
    const total = validationResults.passed + validationResults.failed + validationResults.warnings;
    
    log(`\n${colors.green}✅ Passed: ${validationResults.passed}${colors.reset}`);
    log(`${colors.red}❌ Failed: ${validationResults.failed}${colors.reset}`);
    log(`${colors.yellow}⚠️  Warnings: ${validationResults.warnings}${colors.reset}`);
    log(`${colors.blue}📊 Total Checks: ${total}${colors.reset}`);
    
    if (validationResults.failed === 0) {
        log(`\n${colors.green}${colors.bold}🎉 Framework validation passed!${colors.reset}`);
        if (validationResults.warnings > 0) {
            log(`${colors.yellow}Note: ${validationResults.warnings} warnings found - consider addressing them.${colors.reset}`);
        }
    } else {
        log(`\n${colors.red}${colors.bold}❌ Framework validation failed!${colors.reset}`);
        log(`${colors.red}Please address the following issues:${colors.reset}`);
        validationResults.errors.forEach(error => {
            log(`  • ${error}`, colors.red);
        });
    }
    
    // Provide next steps
    log(`\n${colors.bold}🚀 Next Steps:${colors.reset}`);
    if (validationResults.failed === 0) {
        log(`${colors.green}• Framework is ready for use!${colors.reset}`);
        log(`${colors.blue}• Run "npm run health-check" to test skill connectivity${colors.reset}`);
        log(`${colors.blue}• See docs/getting-started.md for usage instructions${colors.reset}`);
    } else {
        log(`${colors.red}• Fix the failed validation items above${colors.reset}`);
        log(`${colors.blue}• Run "npm run validate" again after fixes${colors.reset}`);
        log(`${colors.blue}• See docs/getting-started.md for setup help${colors.reset}`);
    }
}

// Main validation function
function main() {
    log(`${colors.bold}${colors.cyan}AI Assistant Framework Validation${colors.reset}`);
    log(`${colors.cyan}Validating framework setup and configuration...${colors.reset}`);
    
    validateNodeVersion();
    validatePackageJson();
    validateDirectoryStructure();
    validateSkills();
    validateRepositoryScripts();
    validateDocumentation();
    validateEnvironmentSetup();
    validateNodeModules();
    validatePlaywrightBrowsers();
    validateGitConfiguration();
    validateLearningSystem();
    
    generateSummary();
    
    // Exit with appropriate code
    process.exit(validationResults.failed === 0 ? 0 : 1);
}

// Run validation
if (require.main === module) {
    main();
}

module.exports = {
    main,
    validationResults
}; 