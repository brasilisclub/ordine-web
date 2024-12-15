# Ordine
Ordine Web is a NextJS application developed and maintained by Brasilis Club.

## Getting Started
First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Continuous Integration
We implemented a CI workflow to quickly view if the incoming changes allows us to build the application.

### pre-commit
You can partially reproduce our current CI configuration using Git's pre-commit hook.

First, create a file named pre-commit under `.git/hooks`:
```
nvim .git/hooks/pre-commit
```

And insert the following piece of code:
```
# .git/hooks/pre-commit
#!/bin/bash

set -e

echo "Running linting..."
bun run lint
if [ $? -ne 0 ]; then
  echo "Linting failed. Please fix the issues before committing."
  exit 1
fi

echo "Running type check..."
bun tsc --noEmit
if [ $? -ne 0 ]; then
  echo "Type check failed. Please fix the issues before committing."
  exit 1
fi

echo "All checks passed."
exit 0
```

Then, add execution permissions to the file:
```
chmod +x .git/hooks/pre-commit
```

## License
All Ordine repositories (Web, Api, iOS and Android) are protected by the MIT License, unless explicitly stated otherwise.
