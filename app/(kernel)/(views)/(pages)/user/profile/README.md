# Profile module

## Included behavior

- `/user/profile/personal-info`, `/account-info`, and `/bank-info` show the signed-in user's own profile.
- The same routes with an appended `[id]` show the requested user's profile only when the visitor is that user or has the admin role.
- Unauthorized users receive Next.js `notFound()` (404).
- Unauthenticated users are redirected to `/sign-in`.
- The sidebar loads the authorized profile data through a Server Action and preserves the viewed user's id in its links.
- Profile reads use a server-only module and a Prisma `select` to avoid returning unrelated user fields.

## Project assumptions to verify

This module follows the project details present in the supplied files and earlier RBAC setup:

- Better Auth: `@/lib/authentication/auth`
- Prisma client: `@/lib/prisma/prismaDB`
- User relation: `userRoles -> role`
- Role fields: `name`, `title`, `isSuperAdmin`
- Admin role name: `admin`
- User fields: `id`, `name`, `email`, `image`, `status`, `createdAt`
- User status enum: `UserStatus.ACTIVE`

If the actual project uses a different route prefix, update `PROFILE_BASE_PATH` in `components/profile-layout-client.jsx` and the redirect in `page.jsx`.

## Notes

- `bank-info` currently renders an explanatory placeholder because the supplied ZIP did not include a bank-account Prisma model or its field names.
- Personal information currently displays the known `name` and `email` fields. Add phone/national-code fields only after confirming their exact Prisma field names.
- The existing logout button is visual only; connect it to the project's Better Auth sign-out action.
- `editUser` is restricted to the signed-in user's own id. Add a specific RBAC permission check before allowing administrators to edit another user's data.
- The default profile image path is `/media/images/default-profile.jpg`; add that asset to `public/media/images/` or change the fallback path.
