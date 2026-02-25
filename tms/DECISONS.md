# Architecture Decision: Authentication & Database Access

## Question

**Should we use Supabase Edge Functions or Direct Public/Anon Access for User Management?**

## Analysis

### 1. Cost (Free Tier Limits)

- **Edge Functions**: Supabase Free Tier allows **500,000 invocations per month**.
  - This is approx. **16,000 requests per day**.
  - For a Tuition Management System, this is **more than enough** and will likely never cost $0.00.
- **Database**: Free Tier includes 500MB storage.
- **Conclusion**: Using Edge Functions does **NOT** incur extra costs for this project scope.

### 2. Security & Functionality

- **The Problem**: A standard user (e.g., Admin) cannot create _other_ users (e.g., Teachers) and set their passwords using the standard client-side API (`anon` key). This is a security restriction to prevent unauthorized account creation.
- **Approach A: Edge Functions (Recommended)**
  - **Pros**: Secure (runs on server), Clean (Admin sends data -> Server creates user), Scalable.
  - **Cons**: Requires deployment (already done).
- **Approach B: Public/Anon API**
  - **Pros**: Pure client-side.
  - **Cons**: **Cannot set passwords for others**. You would have to use an "Invite via Email" flow where the new user sets their own password. Admin loses control over immediate account setup.

## Recommendation

**Stick with Edge Functions.**

- It is **Free** (within limits).
- It provides the Professional "Admin creates User" experience you wanted.
- It is fully secure.

## Status

- Edge Function `users-admin` is deployed.
- User Management Module is **Complete** and **Verified**.
- Profile Settings is **Complete** and **Verified**.
