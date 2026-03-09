# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Multi-line commit message support with subject, body, and footer sections
- AI intelligently chooses between single-line and multi-line formats based on change significance
- Comprehensive documentation in docs/ directory
- Unit testing infrastructure with Vitest
- Test coverage reporting
- Configuration validation and empty value handling

### Fixed
- Import errors in main entry point
- Configuration module now properly deletes empty values instead of setting them
- AI responses now strip markdown code blocks
- Duplicate heading in README

### Changed
- Updated AI prompt to be more concise and avoid markdown formatting
- Improved commit message display for multi-line messages
- Enhanced editing tips for multi-line message support

## [0.1.0] - Initial Development

### Added
- Initial project setup
- Google Gemini AI integration for commit message generation
- Conventional Commits format compliance
- Jira ticket prefix integration
- Interactive CLI with edit, regenerate, and cancel options
- Configuration management for user preferences
- Git operations integration
- Error handling and validation
- Basic documentation
