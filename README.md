# Firebytes

A plain HTML website for https://firebytes.dev.

## Preview on your computer

Open `index.html` in a browser. This previews your local file; it does not publish it.

## One-time hosting setup

1. Create an empty GitHub repository named `firebytes`. GitHub Pages on GitHub Free requires a public repository. Leave the initialization options unchecked because this folder already contains the files.
2. Connect this local Git repository to the GitHub repository and push the `main` branch. Use the repository URL GitHub supplies.
3. In the repository, open Settings > Pages. Set Source to "Deploy from a branch", branch to `main`, and folder to `/ (root)`. Save and wait for the first deployment to finish.
4. Under Custom domain in the same Pages settings, enter `firebytes.dev` and save BEFORE changing the domain's web DNS records. GitHub creates a `CNAME` file for branch publishing. Pull that commit into this folder with `git pull --ff-only` before making your next local change.
5. On Name.com, open My Domains > firebytes.dev > Manage DNS Records. Add four A records for the root domain (leave Host blank):

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   Add a CNAME record with Host `www` and Answer `Shreemahor.github.io` (do not include a repository name or `https://`). Use Name.com's default TTL. Inspect existing records before changing anything: replace conflicting root/www web records, and preserve email and other unrelated records. Keep Name.com's nameservers.
6. Return to GitHub Pages settings. Once the DNS check and certificate are ready, enable Enforce HTTPS. DNS and certificate setup can take up to 24 hours. Use `https://firebytes.dev` when checking the site.

Optional recommended ownership verification: GitHub profile Settings > Pages > Add a domain > `firebytes.dev`. GitHub shows a TXT host and value. Add those to Name.com DNS, then click Verify on GitHub and retain the TXT record. This is separate from the repository's Custom domain setting.

## Publish future edits

After the initial setup, open PowerShell in this folder, edit `index.html`, then run:

```powershell
git add index.html
git commit -m "Update homepage"
git push
```

Pushing to `main` triggers publication. A local commit alone does not. Updates can take up to 10 minutes. Check the repository's Actions tab for deployment progress, then refresh the website.

This site needs no package installation, build command, server, or domain API key.

## Official instructions

- GitHub Pages publishing: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages domain setup: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub domain verification: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- Name.com DNS: https://www.name.com/de-de/support/articles/115004893508-adding-an-a-record
