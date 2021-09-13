# setup docker container structure test tool
[![LICENSE](https://img.shields.io/github/license/md-actions/setup-container-structure-test)](https://github.com/md-actions/setup-container-structure-test/blob/main/LICENSE)

GitHub CLI is the command line tool of used to test the structure of Docker Container ([see the manual](https://github.com/GoogleContainerTools/container-structure-test)).

This action sets up GitHub CLI tool. It downloads GitHub CLI binaries from https://github.com/cli/cli/releases and adds path to PATH

   
# Usage
## Set up default container structure test version (1.10.0)
```yaml
- uses: md-actions/setup-container-structure-test@v1
```
## Set up specific GitHub CLI version
```yaml
- uses: md-actions/setup-setup-container-structure-test@v1
  with:
    version: 1.10.0
```
