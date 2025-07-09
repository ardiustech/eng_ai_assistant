# General Tool Usage Learnings

This file documents tool usage patterns, failures, and successful workarounds that apply across all projects and repositories.

## Git & Repository Access

### SAML-Protected Organizations
**Issue**: When working with repositories from SAML-protected GitHub organizations (like ardiustech), standard HTTPS cloning fails with "GraphQL: Resource protected by organization SAML enforcement" errors.

**Solution**: Use SSH cloning instead of HTTPS
```bash
# ❌ This fails with SAML-protected repos
git clone https://github.com/ardiustech/mithrin.git

# ✅ This works
git clone git@github.com:ardiustech/mithrin.git

# For setup scripts, use SSH URL format
./setup-branch.sh git@github.com:ardiustech/mithrin.git master
```

**Commands that fail with SAML**: 
- `gh pr list --repo ardiustech/mithrin` 
- `gh repo clone ardiustech/mithrin`
- `git clone https://github.com/ardiustech/mithrin.git`

**Workaround**: Always use SSH for git operations with SAML-protected repos.

## GitHub CLI

### SAML Authentication Issues
**Issue**: GitHub CLI (`gh`) commands fail with SAML-protected organizations even when SSH keys are properly configured.

**Error Message**: "GraphQL: Resource protected by organization SAML enforcement. You must grant your OAuth token access to an organization within this enterprise."

**Workaround**: 
1. Use direct git commands with SSH instead of `gh` commands
2. For PR information, use `fetch_pull_request` tool instead of `gh pr list`
3. Fetch PR refs manually: `git fetch origin 'refs/pull/*/head:refs/remotes/origin/pr/*'`

## API Rate Limits

*Document rate limit patterns and handling strategies here as they are discovered*

## Environment-Specific Issues

*Document OS-specific, shell-specific, or environment-specific tool behaviors here as they are discovered*

## Temporary File Management

### Debugging File Cleanup
**Issue**: Debugging and iteration processes generate significant temporary files (screenshots, test scripts, logs) that accumulate in `tmp/` directory.

**Best Practice**: Clean up temporary files after completing tasks, but preserve valuable patterns as learnings.

**Cleanup Strategy**:
```bash
# Before cleanup - preserve valuable patterns in .cursor/learnings.md
# Extract useful techniques from debugging scripts
# Document debugging workflows and patterns

# After documentation - clean up temporary files
rm -f tmp/*.png tmp/*.js tmp/*.log tmp/*.txt

# Verify cleanup
du -sh tmp/  # Should show minimal size
```

**Preservation Guidelines**:
- Extract automation patterns (selectors, timing, error handling)
- Document debugging workflows and techniques
- Preserve configuration examples and working code snippets
- Save error patterns and their solutions to relevant skill learnings
- Clean up once patterns are documented in appropriate `.cursor/` directories

**File Size Impact**: 
- Debugging sessions can generate 5-10MB of temporary files
- Screenshots alone can be 200-400KB each
- Regular cleanup prevents repository bloat and improves performance 