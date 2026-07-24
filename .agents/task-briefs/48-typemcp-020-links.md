# Task brief: TypeMCP 0.2.0 public links

- **Issue:** #48
- **Scope:** Change the TypeMCP website's npm links and release-boundary copy to the public `@theorvane/type-mcp@0.2.0` release, and pin docs sync to the exact TypeMCP release main SHA.
- **Evidence:** npm public metadata and downloaded tarball verify version 0.2.0, scoped public identity, and root/HTTP/LangChain exports. Release SHA is `2b5f05438509c8be1e43e3372c614d7a86e2272d`.
- **Non-goals:** Package implementation, domains, and unrelated UX changes.
- **Verification:** focused tests first; then `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, production audit high gate, and `git diff --check`.
