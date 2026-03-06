# PawGuard Web

PawGuard Web is the companion web application for the PawGuard mobile app. It serves as the fallback interface for users scanning a pet's unique QR code.

## Architecture & Deep Linking

1. **QR Code Scanning:** The PawGuard mobile app generates QR codes that point to URLs formatted as `https://pawguard.app/pet/{petId}`.
2. **Web Fallback:** When a user scans the QR code, they are directed to this Next.js web application.
3. **Data Fetching:** The web app fetches the pet's profile securely from Supabase using the `petId`.
4. **Deep Link Attempt:** The web app automatically attempts to open the PawGuard mobile app using the deep link URI: `pawguard://pet/{petId}`.
5. **Graceful Degradation:** If the application is installed, it handles the URI and opens the pet's profile natively. If not, the user remains on the web profile page where they can view the pet's name, breed, photo, and blockchain verification status.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **Database:** Supabase
- **Package Manager:** Bun

## Setup & Local Development

This project uses [Bun](https://bun.sh/) for ultra-fast dependency management and execution.

1. **Install Bun** (if not already installed):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Environment Setup:**
   Copy the `.env.example` file to `.env.local` and add your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```
   *Note: Ensure you populate `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.*

4. **Run the development server:**
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

The easiest way to deploy this application is using the Vercel Platform.

1. Push your code to a Git repository (GitHub, GitLab, or BitBucket).
2. Import the project into Vercel.
3. In the Vercel project settings, go to **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Set the **Install Command** to `bun install` if not automatically detected.
5. Set the **Build Command** to `bun run build`.
6. Click **Deploy**. Vercel will automatically configure the build pipeline and deploy your application to a global edge network.
