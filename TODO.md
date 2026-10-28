# Sylla — open items

## Blocking nothing, but worth doing
- [ ] **Buy a domain.** `getsylla.com` and `sylla.com` were both free as of 2026-10-28.
      Once bought: attach in Vercel, update `ALLOWED_ORIGIN` on snapcal-backend, and
      update the absolute `og:url` / `og:image` in `index.html` or previews keep
      pulling from the vercel.app host.
- [ ] **Rotate the Google OAuth client secret.** It was pasted into a chat transcript
      on 2026-10-28. Add a new secret in Google Cloud, update `GOOGLE_CLIENT_SECRET`
      on snapcal-backend, redeploy, then delete the old one.
- [ ] **Deploy the AWS events backend.** Code is written and syntax-checked in the
      `aws/` folder of the package (API Gateway + Lambda + DynamoDB, single-table
      userId/eventId, Google ID-token verification, conditional-write dedup,
      least-privilege IAM). Needs `sam build && sam deploy --guided`, then set
      `VITE_EVENTS_URL` on the web project. Until then the app is device-only storage.
- [ ] **Google OAuth is in Testing mode**, so only accounts on the test-user list can
      sign in. Publishing needs Google verification: privacy policy URL (already
      bundled at `/privacy.html`) plus a demo video.

## Pricing — revisit once there is real repeat usage
Decided 2026-10-28 to not build any of this yet. Notes for when it matters:
- Costs are per-scan and recurring, so a one-time lifetime unlock inverts the unit
  economics. If low friction matters, use ~$15/year rather than a lifetime fee.
- Paywall scan **volume** (e.g. 5/day free), not Google Calendar sync. Sync is the
  differentiator against the existing syllabus-scanner apps.
- A real per-user daily cap needs the signed-in account path, i.e. the AWS piece
  above. The current 25/hour limit is per device id and resets if storage is cleared.
- B2B (universities, orientation programs) is where real money is, but it is a
  6-12 month procurement sale. Not before usage numbers exist.

## Known limitations
- `$5` of prepaid Anthropic credit with no card on file is the hard spend ceiling.
- CORS is locked to the web origin, which stops other sites but not direct curl.
- Device id is the identity for rate limiting and can be reset by clearing storage.
