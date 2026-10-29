---
kind: decision
applies-to: rules/specifier.md
---

# Search for an existing owner before specifying a method body

Before a spec is finalized, search the tracker and open pull requests for every interface method this change must implement. Include long-lived branches, not only the default branch. If a ticket already defines that method, the spec depends on it and keeps that behaviour. A no-op is allowed only when the search finds no owner.

A compile stub is not "too small for a spec" when the class already implements the interface and the pinned SDK requires a new method body. That body is a bridge contract another ticket may already own. Specifying an empty override on the default branch will overwrite the real behaviour when the branches meet.
