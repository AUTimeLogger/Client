#!/bin/sh

echo "Checking that we have NEXT_PUBLIC_ vars..."
test -n "$NEXT_PUBLIC_MOCKING"
test -n "$NEXT_PUBLIC_API_URL"
test -n "$NEXT_PUBLIC_NEXTAUTH_URL"
test -n "$NEXT_PUBLIC_NEXTAUTH_SECRET"
test -n "$NEXTAUTH_URL"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_MOCKING#$NEXT_PUBLIC_MOCKING#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_API_URL#$NEXT_PUBLIC_API_URL#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_NEXTAUTH_URL#$NEXT_PUBLIC_NEXTAUTH_URL#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_NEXTAUTH_SECRET#$NEXT_PUBLIC_NEXTAUTH_SECRET#g"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXTAUTH_URL#$NEXTAUTH_URL#g"


echo "Substituted all NEXT_PUBLIC_ vars with new values."
echo "Starting Nextjs"
exec "$@"