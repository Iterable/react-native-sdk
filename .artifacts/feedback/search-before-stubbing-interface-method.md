---
kind: decision
applies-to: rules/developer.md
---

# Search for an existing owner before stubbing an interface method

Before writing a body for an interface method the current ticket did not name, search the tracker and branches other than the one you are on, including long-lived feature branches and open pull requests. If a ticket already defines the method, implement that contract or stop and ask. Do not invent a no-op.

A green build of the current branch only proves the stub compiles. It cannot see an implementation that already emits, forwards, or otherwise behaves, sitting on another branch. Record the search in the handoff: the ticket, the branch, and whether the method already has a behaviour or is still absent.
