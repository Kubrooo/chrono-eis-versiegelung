# Configuration Guide

## Overview

Chrono uses two configuration mechanisms:

1. Environment variables (`.env` file) for sensitive data
2. Persistent configuration storage for user preferences

## Environment Variables

Environment variables are stored in a `.env` file in your project root directory.

### Required Variables

#### GEMINI_API_KEY

The Google Gemini API key for AI-powered commit message generation.

**Format:**
```env
GEMINI_API_KEY=your_api_key_here
```

**Obtaining the Key:**

1. Visit Google AI Studio: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Select or create a Google Cloud project
5. Copy the generated key

**Security Considerations:**

- Never commit the `.env` file to version control
- Add `.env` to your `.gitignore` file
- Do not share your API key in public repositories
- Rotate your key immediately if compromised
- Use separate keys for different environments (development, production)

**API Key Limits:**

The Gemini API free tier includes:
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute

For most individual users, these limits are sufficient. Monitor your usage at Google AI Studio.

### Environment File Location

Chrono looks for the `.env` file in the following order:

1. Current working directory
2. Project root (where `.git` directory exists)

**Best Practice:** Place the `.env` file in your project root directory.

### Multiple Projects

Each project should have its own `.env` file. This allows:

- Different API keys per project
- Project-specific configurations
- Team-specific settings

### Environment File Template

Create a `.env.example` file in your repository as a template:

```env
# Google Gemini API Key
# Get your key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here
```

Commit `.env.example` to version control, but never commit `.env`.

## User Preferences

User preferences are stored persistently using the `conf` package.

### Storage Location

Preferences are stored in platform-specific directories:

**Linux:**
```
~/.config/chrono-cli/config.json
```

**macOS:**
```
~/Library/Preferences/chrono-cli/config.json
```

**Windows:**
```
%APPDATA%\chrono-cli\config.json
```

### Available Preferences

#### Jira Project Key

Prefix for Jira ticket integration in commit messages.

**Configuration:**
```bash
chrono --setup
```

**Prompt:**
```
Enter your Jira Project Key (leave empty to skip): PROJ
```

**Effect:**

When configured, all generated commit messages will include the Jira prefix:

```
[PROJ-X] feat(auth): add JWT token validation
```

The `X` serves as a placeholder for the actual ticket number.

**Removing the Prefix:**

Run setup again and leave the field empty:

```bash
chrono --setup
# Press Enter without typing anything
```

**Use Cases:**

- Teams using Jira for issue tracking
- Projects requiring ticket references in commits
- Organizations with commit message policies

**Format Requirements:**

- Alphanumeric characters only
- Typically 2-10 characters
- Common examples: PROJ, DEV, FEAT, BUG

### Manual Configuration

Advanced users can manually edit the configuration file.

**Location:** See "Storage Location" above

**Format:**
```json
{
  "jiraPrefix": "PROJ",
  "commitStyle": "conventional"
}
```

**Available Options:**

- `jiraPrefix` (string): Jira project key or empty string
- `commitStyle` (string): Currently only "conventional" is supported

**Caution:** Manual editing may cause issues if the JSON format is invalid.

## Configuration Precedence

When multiple configuration sources exist, chrono uses the following precedence:

1. Environment variables (`.env` file)
2. User preferences (config file)
3. Default values

## Advanced Configuration

### Custom AI Model

Currently, chrono uses the `gemini-2.5-flash` model. This is hardcoded but may become configurable in future versions.

**Current Model Characteristics:**

- Fast response times
- Good balance of quality and speed
- Suitable for commit message generation
- Cost-effective for high-volume usage

### Commit Message Length

Chrono instructs the AI to keep messages under 72 characters when possible, following git best practices.

**Rationale:**

- 72 characters fit in standard terminal widths
- Improves readability in git logs
- Follows conventional commits guidelines

**Override:**

If you need longer messages, use the edit option after generation.

### Conventional Commits Format

Chrono follows the Conventional Commits specification v1.0.0.

**Format:**
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Current Implementation:**

Chrono generates only the first line (type, scope, description). Body and footer are not currently generated but can be added manually using the edit option.

## Configuration Best Practices

### 1. Separate Keys per Environment

Use different API keys for:
- Development
- Testing
- Production
- CI/CD pipelines

### 2. Team Configuration

For teams:
- Share `.env.example` in the repository
- Document required environment variables
- Use consistent Jira prefixes across the team
- Establish commit message conventions

### 3. Security

- Add `.env` to `.gitignore` immediately
- Use environment variable management tools for production
- Rotate API keys periodically
- Monitor API usage for anomalies

### 4. Backup Configuration

Preferences are stored locally. To backup:

```bash
# Linux/macOS
cp ~/.config/chrono-cli/config.json ~/backup/

# Windows
copy %APPDATA%\chrono-cli\config.json C:\backup\
```

### 5. Reset Configuration

To reset all preferences to defaults:

```bash
# Linux/macOS
rm -rf ~/.config/chrono-cli/

# Windows
rmdir /s %APPDATA%\chrono-cli
```

Then run `chrono --setup` to reconfigure.

## Troubleshooting Configuration

### API Key Not Detected

**Symptoms:**
- Error: "GEMINI_API_KEY not found"
- Chrono fails to generate messages

**Solutions:**

1. Verify `.env` file exists in project root
2. Check file name is exactly `.env` (not `.env.txt`)
3. Ensure format is: `GEMINI_API_KEY=your_key`
4. Check for extra spaces or quotes
5. Verify file encoding is UTF-8
6. Restart terminal after creating `.env`

### Invalid API Key

**Symptoms:**
- API errors when generating messages
- Authentication failures

**Solutions:**

1. Verify the key is correct (copy-paste from Google AI Studio)
2. Check if the key has been revoked
3. Ensure the key has necessary permissions
4. Generate a new key if needed

### Configuration Not Persisting

**Symptoms:**
- Jira prefix resets after restart
- Setup changes don't save

**Solutions:**

1. Check write permissions on config directory
2. Verify disk space is available
3. Check for filesystem errors
4. Try running with elevated permissions (not recommended long-term)

### Configuration File Corrupted

**Symptoms:**
- Chrono crashes on startup
- Setup command fails

**Solutions:**

1. Delete the configuration file (see "Reset Configuration")
2. Run `chrono --setup` to recreate
3. Manually verify JSON syntax if editing directly

## Environment-Specific Configuration

### Development

```env
# .env.development
GEMINI_API_KEY=dev_key_here
```

### Production

```env
# .env.production
GEMINI_API_KEY=prod_key_here
```

**Note:** Chrono currently only reads `.env`. Environment-specific files require manual switching or build tool integration.

### CI/CD Integration

For continuous integration:

```yaml
# Example GitHub Actions
env:
  GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

Store the API key in your CI/CD platform's secret management system.

## Future Configuration Options

Planned configuration options for future releases:

- Custom AI models
- Commit message templates
- Language preferences for messages
- Custom conventional commit types
- Message length preferences
- Multi-line message support
- Custom prompt templates

Check the project roadmap and changelog for updates.
