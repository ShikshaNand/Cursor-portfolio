# Deployment & GitHub Guide: Shiksha Nand Portfolio

This guide explains how to push this project to your GitHub account (`https://github.com/ShikshaNand`) and deploy it to Vercel.

---

## 1. Push Project to GitHub

1. Open PowerShell / Terminal inside this project folder:
   ```powershell
   cd "c:\Users\Anand\Desktop\College Codes\S.N.M. NEW Portfolio"
   ```

2. Initialize git and commit all files:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Shiksha Nand cinematic portfolio with all verified credentials"
   ```

3. Create a new repository on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `portfolio` (or `snm-portfolio`)
   - Visibility: **Public** *(Public zaroori hai taaki download script assets download kar sake)*
   - Leave "Initialize with README" unchecked.

4. Link and push to your GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/ShikshaNand/portfolio.git
   git push -u origin main
   ```

---

## 2. Deploy to Vercel (1-Click & Free)

1. Open [vercel.com](https://vercel.com) and login with your GitHub account (`ShikshaNand`).
2. Click **Add New...** → **Project**.
3. Select your `portfolio` repository from the list.
4. Vercel will automatically read `vercel.json` (`npm run build` and output directory `.`).
5. Click **Deploy**.
6. Within 30 seconds, your site is live with a free `*.vercel.app` domain and free SSL!
7. **Custom Domain:** Under project settings → Domains, add `snmofficial.in` or your domain.

---

## 3. How to Recreate This Website on ANY Other PC with 1 Command

Agar aap future me kisi bhi doosre laptop ya PC par hon, ya kisi AI assistant ko website recreate karne ko kahein:

1. Clone or download project files:
   ```bash
   git clone https://github.com/ShikshaNand/portfolio.git
   cd portfolio
   ```

2. Run 2 commands:
   ```bash
   npm install
   npm run build
   ```

3. **Or if using the AI `.md` Blueprint Prompt (`BLUEPRINT.md`):**
   - Just give `BLUEPRINT.md` to any AI agent.
   - Run:
     ```bash
     npm install
     npm run download     # Automatically downloads all 11 certificates, portrait, and SVGs from your GitHub!
     npm run build        # Compiles static site in 100ms
     ```
