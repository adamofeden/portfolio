// src/app/blog/xero-quickbooks-integration-guide/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integrating with Xero and QuickBooks: A Developer's Guide to Accounting APIs — Adam Dugan",
  description:
    "Building BalancingIQ taught me that accounting APIs are deceptively complex. Here's everything I learned about OAuth flows, data models, rate limits, and making Xero and QuickBooks integrations production-ready.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 sm:px-8 py-16">
      <nav className="mb-8">
        <Link
          href="/"
          className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4"
        >
          ← Back to home
        </Link>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        Integrating with Xero and QuickBooks: A Developer's Guide to Accounting APIs
      </h1>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        When I started building <em>BalancingIQ</em>, I thought integrating with accounting 
        software would be straightforward. "Just hit their REST API," I told myself. "OAuth, 
        grab some data, done in a week."
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Three weeks later, I was still debugging OAuth token refresh loops, figuring out why 
        invoice line items didn't match between Xero and QuickBooks, and learning the hard way 
        that "accounting data" is far messier than it looks in a demo.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Here's what I wish someone had told me before I started: <strong>accounting APIs are 
        deceptively complex.</strong> They're not like Stripe or Twilio where the data model 
        is clean and the docs are excellent. They're built on decades of accounting principles, 
        with edge cases you've never heard of, and they assume you already know how double-entry 
        bookkeeping works.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        This guide is what I wish I'd read before integrating Xero and QuickBooks into production. 
        It covers the real challenges, the gotchas nobody tells you, and the patterns that actually 
        work at scale.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Why Accounting APIs Are Harder Than They Look</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        If you've integrated with Stripe or Shopify, you might think accounting APIs will be similar. 
        They're not. Here's why:
      </p>

      <h3 className="mt-8 text-xl font-semibold">1. The Data Models Are Complex and Domain-Specific</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Accounting isn't just "revenue in, expenses out." It's:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Invoices</strong> with line items, tax rates, discounts, partial payments</li>
        <li><strong>Bills</strong> (accounts payable) that track what you owe</li>
        <li><strong>Bank transactions</strong> that need to be reconciled against invoices/bills</li>
        <li><strong>Chart of Accounts</strong> (COA) — the backbone of all financial data</li>
        <li><strong>Tracking categories</strong> (departments, projects, locations)</li>
        <li><strong>Journal entries</strong> for manual adjustments</li>
        <li><strong>Multi-currency</strong> with exchange rates and gains/losses</li>
      </ul>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        And that's just the basics. Every business organizes their chart of accounts differently, 
        uses different tax codes, and has custom workflows.
      </p>

      <h3 className="mt-8 text-xl font-semibold">2. Xero and QuickBooks Have Different Philosophies</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        You can't just write one integration layer and expect it to work for both:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Xero</strong> is more flexible, developer-friendly, and "modern" in API design</li>
        <li><strong>QuickBooks Online (QBO)</strong> is more rigid, enterprise-focused, and has quirks from legacy desktop versions</li>
        <li>Field names differ: Xero uses <code>LineAmount</code>, QBO uses <code>Amount</code></li>
        <li>Date formats differ: Xero uses ISO strings, QBO uses YYYY-MM-DD</li>
        <li>IDs differ: Xero uses GUIDs, QBO uses numeric IDs</li>
      </ul>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        You need an abstraction layer, or you'll end up with spaghetti code full of if/else branches.
      </p>

      <h3 className="mt-8 text-xl font-semibold">3. OAuth Is Just the Beginning of Your Pain</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Both platforms use OAuth 2.0, but the implementations differ:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>Xero tokens expire in <strong>30 minutes</strong>; refresh tokens last 60 days</li>
        <li>QBO tokens expire in <strong>1 hour</strong>; refresh tokens last 100 days</li>
        <li>Both require you to refresh tokens <em>before</em> they expire, or users have to re-auth</li>
        <li>Refresh token rotation: each refresh gives you a <em>new</em> refresh token; the old one is invalidated</li>
      </ul>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        If you don't handle token refresh correctly, users will randomly get logged out, and you'll 
        spend days debugging why.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">OAuth Implementation: The Right Way</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Let's start with OAuth, because if you get this wrong, nothing else matters.
      </p>

      <h3 className="mt-8 text-xl font-semibold">The OAuth Flow (High Level)</h3>
      <ol className="mt-4 list-decimal list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>User clicks "Connect Xero" or "Connect QuickBooks" in your app</li>
        <li>You redirect them to the provider's OAuth consent screen</li>
        <li>User authorizes your app and is redirected back with an authorization code</li>
        <li>You exchange the code for an access token and refresh token</li>
        <li>You store both tokens <strong>encrypted</strong> in your database</li>
        <li>You use the access token to make API calls</li>
        <li>Before the access token expires, you refresh it using the refresh token</li>
        <li>Repeat step 7 forever (or until user revokes access)</li>
      </ol>

      <h3 className="mt-8 text-xl font-semibold">Critical Implementation Details</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>1. Encrypt tokens before storing them</strong>
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        These tokens give full access to financial data. If your database is compromised, encrypted 
        tokens are useless to attackers.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        In <em>BalancingIQ</em>, we use AWS KMS with unique encryption contexts per organization:
      </p>

      <div className="mt-4 p-4 rounded-lg bg-black/5 dark:bg-white/5 font-mono text-sm overflow-x-auto">
        <pre>{`// Encrypt before storing
const encrypted = await kms.encrypt({
  KeyId: process.env.KMS_KEY_ID,
  Plaintext: Buffer.from(JSON.stringify(tokens)),
  EncryptionContext: { orgId: organization.id }
});

await db.put({
  orgId: organization.id,
  encryptedTokens: encrypted.CiphertextBlob,
  provider: 'xero', // or 'quickbooks'
  expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 min
});`}</pre>
      </div>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>2. Refresh tokens proactively, not reactively</strong>
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Don't wait until you get a 401 error to refresh. Set up a scheduled job (e.g., Lambda cron) 
        that runs every 15 minutes and refreshes any tokens expiring in the next 10 minutes.
      </p>

      <div className="mt-4 p-4 rounded-lg bg-black/5 dark:bg-white/5 font-mono text-sm overflow-x-auto">
        <pre>{`// Scheduled Lambda that runs every 15 minutes
const tokensExpiringSoon = await db.query({
  IndexName: 'expiresAt-index',
  KeyConditionExpression: 'expiresAt < :soon',
  ExpressionAttributeValues: {
    ':soon': Date.now() + 10 * 60 * 1000 // 10 min buffer
  }
});

for (const record of tokensExpiringSoon) {
  await refreshTokens(record.orgId, record.provider);
}`}</pre>
      </div>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>3. Handle refresh token rotation correctly</strong>
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        When you refresh, you get a <em>new</em> refresh token. The old one is invalidated immediately. 
        If two processes try to refresh at the same time, one will fail and you'll lose access.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Solution: Use a lock (DynamoDB conditional writes, Redis lock, etc.) to ensure only one 
        refresh happens at a time per organization.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Data Models: Abstracting Xero and QuickBooks</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        You need an abstraction layer that normalizes the differences between Xero and QuickBooks. 
        Here's the pattern that worked for us:
      </p>

      <h3 className="mt-8 text-xl font-semibold">Define a Common Interface</h3>

      <div className="mt-4 p-4 rounded-lg bg-black/5 dark:bg-white/5 font-mono text-sm overflow-x-auto">
        <pre>{`// Common interface for invoices
interface Invoice {
  id: string;
  number: string;
  date: Date;
  dueDate: Date;
  customer: {
    id: string;
    name: string;
  };
  lineItems: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    accountCode: string;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  amountDue: number;
  status: 'draft' | 'submitted' | 'paid' | 'voided';
}`}</pre>
      </div>

      <h3 className="mt-8 text-xl font-semibold">Implement Provider-Specific Adapters</h3>

      <div className="mt-4 p-4 rounded-lg bg-black/5 dark:bg-white/5 font-mono text-sm overflow-x-auto">
        <pre>{`class XeroAdapter {
  async getInvoices(orgId: string): Promise<Invoice[]> {
    const raw = await xeroClient.invoices.list();
    return raw.map(this.normalizeInvoice);
  }

  private normalizeInvoice(xeroInvoice): Invoice {
    return {
      id: xeroInvoice.InvoiceID,
      number: xeroInvoice.InvoiceNumber,
      date: new Date(xeroInvoice.Date),
      dueDate: new Date(xeroInvoice.DueDate),
      customer: {
        id: xeroInvoice.Contact.ContactID,
        name: xeroInvoice.Contact.Name
      },
      // ... map other fields
      status: this.normalizeStatus(xeroInvoice.Status)
    };
  }
}

class QuickBooksAdapter {
  async getInvoices(orgId: string): Promise<Invoice[]> {
    const raw = await qboClient.query('SELECT * FROM Invoice');
    return raw.map(this.normalizeInvoice);
  }

  private normalizeInvoice(qboInvoice): Invoice {
    return {
      id: qboInvoice.Id,
      number: qboInvoice.DocNumber,
      date: new Date(qboInvoice.TxnDate),
      dueDate: new Date(qboInvoice.DueDate),
      customer: {
        id: qboInvoice.CustomerRef.value,
        name: qboInvoice.CustomerRef.name
      },
      // ... map other fields
      status: this.normalizeStatus(qboInvoice.Status)
    };
  }
}`}</pre>
      </div>

      <h3 className="mt-8 text-xl font-semibold">Use a Factory Pattern</h3>

      <div className="mt-4 p-4 rounded-lg bg-black/5 dark:bg-white/5 font-mono text-sm overflow-x-auto">
        <pre>{`function getAccountingAdapter(provider: 'xero' | 'quickbooks') {
  switch (provider) {
    case 'xero':
      return new XeroAdapter();
    case 'quickbooks':
      return new QuickBooksAdapter();
    default:
      throw new Error(\`Unknown provider: \${provider}\`);
  }
}

// Usage
const adapter = getAccountingAdapter(org.provider);
const invoices = await adapter.getInvoices(org.id);`}</pre>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Rate Limits and Pagination</h2>

      <h3 className="mt-8 text-xl font-semibold">Rate Limits</h3>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Xero:</strong> 60 requests per minute per tenant, 5,000 per day</li>
        <li><strong>QuickBooks:</strong> 500 requests per minute per app (shared across all users)</li>
      </ul>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Both return <code>429 Too Many Requests</code> when you exceed limits. Implement exponential 
        backoff with jitter:
      </p>

      <div className="mt-4 p-4 rounded-lg bg-black/5 dark:bg-white/5 font-mono text-sm overflow-x-auto">
        <pre>{`async function fetchWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.statusCode === 429 && i < maxRetries - 1) {
        const delay = Math.min(1000 * 2 ** i + Math.random() * 1000, 10000);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}`}</pre>
      </div>

      <h3 className="mt-8 text-xl font-semibold">Pagination</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Both APIs paginate results, but differently:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Xero:</strong> Uses <code>page</code> parameter (1-indexed)</li>
        <li><strong>QuickBooks:</strong> Uses <code>startPosition</code> and <code>maxResults</code></li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Real-World Gotchas and Solutions</h2>

      <h3 className="mt-8 text-xl font-semibold">1. Modified Data Detection</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Don't re-fetch all invoices every time. Use the <code>If-Modified-Since</code> header (Xero) 
        or <code>ModifiedAfter</code> query param (QBO) to only fetch changes since your last sync.
      </p>

      <h3 className="mt-8 text-xl font-semibold">2. Handling Deleted Records</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Neither API tells you when records are deleted. You need to periodically do a full sync and 
        mark missing records as deleted in your system.
      </p>

      <h3 className="mt-8 text-xl font-semibold">3. Multi-Currency Complications</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        If a business uses multiple currencies, every amount needs a currency code. Exchange rates 
        change daily. Don't try to convert everything to USD — store amounts in their original currency.
      </p>

      <h3 className="mt-8 text-xl font-semibold">4. Chart of Accounts Variations</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Every business structures their COA differently. You can't hardcode "Revenue" is account 
        code 4000. Instead, let users map their accounts to your categories, or use heuristics based 
        on account types.
      </p>

      <h3 className="mt-8 text-xl font-semibold">5. Webhooks Are Unreliable</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Both platforms support webhooks, but they're not 100% reliable. Use them for real-time updates, 
        but always have a background job that syncs periodically (hourly or daily) to catch missed events.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Testing Strategy</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Testing accounting integrations is hard because:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>You need real Xero/QBO accounts to test against</li>
        <li>Test data needs to be realistic (invoices with line items, tax, discounts, etc.)</li>
        <li>Both platforms have sandbox environments, but they're limited</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Our approach:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>Create a test Xero organization and QBO sandbox with realistic data</li>
        <li>Mock the API responses for unit tests using fixtures</li>
        <li>Run integration tests nightly against the test accounts</li>
        <li>Use feature flags to test new sync logic in production with opt-in customers</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Performance and Cost Optimization</h2>

      <h3 className="mt-8 text-xl font-semibold">1. Cache Aggressively</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        API calls are slow and count against rate limits. Cache everything you can:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>Chart of Accounts (changes rarely)</li>
        <li>Tax rates (changes rarely)</li>
        <li>Customer/vendor lists (cache for 1 hour, refresh on demand)</li>
        <li>Invoices (cache for 15 minutes, invalidate when webhook fires)</li>
      </ul>

      <h3 className="mt-8 text-xl font-semibold">2. Batch Operations</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Instead of fetching data on-demand when a user loads a page, sync data in the background and 
        serve from your database. This is faster and more reliable.
      </p>

      <h3 className="mt-8 text-xl font-semibold">3. Incremental Syncing</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Only fetch data that's changed since the last sync. Store <code>lastSyncedAt</code> per 
        organization and use it to filter queries.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Security Best Practices</h2>

      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Encrypt tokens at rest</strong> using AWS KMS or equivalent</li>
        <li><strong>Use HTTPS everywhere</strong> — never send tokens over HTTP</li>
        <li><strong>Implement PKCE</strong> for OAuth to prevent authorization code interception</li>
        <li><strong>Scope tokens appropriately</strong> — request only the permissions you need</li>
        <li><strong>Log access</strong> — who accessed what data when (for audit trails)</li>
        <li><strong>Monitor for revoked tokens</strong> — handle 401s gracefully and notify users</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Key Takeaways</h2>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70">
        <li>
          Accounting APIs are <strong>far more complex</strong> than they initially appear. Budget 
          2-3x the time you think you'll need.
        </li>
        <li>
          <strong>OAuth token management</strong> is critical. Encrypt tokens, refresh proactively, 
          handle rotation correctly.
        </li>
        <li>
          Build an <strong>abstraction layer</strong> to normalize differences between Xero and 
          QuickBooks. Don't scatter if/else logic throughout your codebase.
        </li>
        <li>
          <strong>Rate limits</strong> are real. Implement exponential backoff, cache aggressively, 
          and batch operations.
        </li>
        <li>
          <strong>Test with real data</strong> in sandbox environments. Edge cases (multi-currency, 
          tax, tracking categories) will break your assumptions.
        </li>
        <li>
          <strong>Sync in the background</strong>, cache results, and serve from your database. 
          Don't make users wait for API calls.
        </li>
      </ul>

      <div className="mt-12 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <p className="text-sm text-black/70 dark:text-white/70">
          <strong>Building a FinTech product?</strong> I've built production integrations with Xero 
          and QuickBooks for <em>BalancingIQ</em> and would love to share more detailed patterns and 
          code. Reach out at{" "}
          <a href="mailto:adamdugan6@gmail.com" className="underline hover:opacity-80">
            adamdugan6@gmail.com
          </a>{" "}
          or connect with me on{" "}
          <a 
            href="https://www.linkedin.com/in/adam-dugan-918722217/" 
            target="_blank" 
            rel="noreferrer noopener"
            className="underline hover:opacity-80"
          >
            LinkedIn
          </a>.
        </p>
      </div>
    </main>
  );
}