// src/app/blog/oauth2-production-guide/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OAuth 2.0 in Production: Building Secure Integrations with Xero, QuickBooks, and Microsoft - Adam Dugan",
  description:
    "Everyone implements OAuth, but most do it insecurely. Here's how to build production-ready OAuth 2.0 with PKCE, KMS encryption, automatic token refresh, and multi-tenant isolation based on real implementations in BalancingIQ and SOA Assist Pro.",
};

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "OAuth 2.0 in Production: Building Secure Integrations with Xero, QuickBooks, and Microsoft",
    description: "Everyone implements OAuth, but most do it insecurely. Here's how to build production-ready OAuth 2.0 with PKCE, KMS encryption, automatic token refresh, and multi-tenant isolation based on real implementations in BalancingIQ and SOA Assist Pro.",
    author: {
      "@type": "Person",
      name: "Adam Dugan",
      url: "https://adamdugan.com",
      jobTitle: "Software Engineer",
      knowsAbout: ["OAuth", "Security", "AWS", "System Architecture", "API Integration"]
    },
    publisher: {
      "@type": "Person",
      name: "Adam Dugan",
      url: "https://adamdugan.com"
    },
    datePublished: "2026-01-26",
    dateModified: "2026-01-26",
    url: "https://adamdugan.com/blog/oauth2-production-guide",
    keywords: ["OAuth", "Security", "AWS", "API Integration", "Xero", "QuickBooks", "Microsoft", "KMS"],
    articleSection: "Engineering",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://adamdugan.com/blog/oauth2-production-guide"
    }
  };
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://adamdugan.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://adamdugan.com/blog"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "OAuth 2.0 Production Guide",
        item: "https://adamdugan.com/blog/oauth2-production-guide"
      }
    ]
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <main className="mx-auto w-full max-w-3xl px-6 sm:px-8 py-16">
        <nav className="mb-8">
          <Link
            href="/blog"
            className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4"
          >
            ← Back to blog
          </Link>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          OAuth 2.0 in Production: Building Secure Integrations with Xero, QuickBooks, and Microsoft
        </h1>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Most OAuth 2.0 tutorials show you how to get an access token and stop there. That&apos;s 
          maybe 20% of what you need for production. The other 80% is handling token refresh, 
          encrypting secrets, multi-tenant isolation, CSRF protection, and debugging when things go wrong.
        </p>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          I&apos;ve built OAuth integrations for <strong>BalancingIQ</strong> (Xero and QuickBooks 
          financial data) and <strong>SOA Assist Pro</strong> (Microsoft Outlook for appointment 
          scheduling and email) and more. Here&apos;s everything I learned about making OAuth work reliably 
          in production.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">The Problem: OAuth Tutorials Skip the Hard Parts</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          A typical OAuth tutorial teaches you:
        </p>

        <ol className="mt-4 list-decimal list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li>Redirect user to provider&apos;s authorization URL</li>
          <li>User grants permission</li>
          <li>Provider redirects back with an authorization code</li>
          <li>Exchange code for access token</li>
          <li>Make API calls with access token</li>
        </ol>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          But this leaves out critical production concerns:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>CSRF attacks:</strong> How do you verify the callback is legitimate?</li>
          <li><strong>Authorization code interception:</strong> What if someone steals the code?</li>
          <li><strong>Token storage:</strong> Where do you store refresh tokens securely?</li>
          <li><strong>Token refresh:</strong> Access tokens expire in 30-60 minutes. How do you handle refresh automatically?</li>
          <li><strong>Multi-tenancy:</strong> How do you isolate tokens across different users/businesses?</li>
          <li><strong>Error handling:</strong> What happens when refresh fails? When the user revokes access?</li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Let&apos;s solve all of these with a production-ready architecture.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Architecture Overview</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Here&apos;s the full stack for BalancingIQ&apos;s OAuth implementation:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Frontend:</strong> Next.js App Router (React Server Components + API Routes)</li>
          <li><strong>Backend:</strong> AWS Lambda functions (Python)</li>
          <li><strong>Storage:</strong> DynamoDB for token storage</li>
          <li><strong>Encryption:</strong> AWS KMS for encrypting refresh tokens</li>
          <li><strong>Auth:</strong> AWS Cognito for user authentication</li>
          <li><strong>Providers:</strong> Xero, QuickBooks Online, Microsoft Outlook</li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The flow spans across Next.js API routes (for OAuth redirects), Lambda functions (for 
          business logic), DynamoDB (for persistence), and KMS (for security). Let&apos;s walk 
          through each step.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Step 1: Authorization Initiation with PKCE</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          When a user clicks &quot;Connect Xero&quot; in BalancingIQ, we need to redirect them to 
          Xero&apos;s authorization page. But first, we implement <strong>PKCE (Proof Key for Code 
          Exchange)</strong> to prevent authorization code interception attacks.
        </p>

        <h3 className="mt-8 text-xl font-semibold">What is PKCE?</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          PKCE is an extension to OAuth 2.0 that protects against 
          malicious apps intercepting authorization codes. It works by:
        </p>

        <ol className="mt-4 list-decimal list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li>Generating a random <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">code_verifier</code> (a secret)</li>
          <li>Hashing it to create a <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">code_challenge</code></li>
          <li>Sending the challenge (not the verifier) to the authorization server</li>
          <li>Proving you have the verifier when exchanging the code for tokens</li>
        </ol>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          This means even if someone intercepts your authorization code, they can&apos;t exchange 
          it for tokens without the original verifier.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Implementation: Next.js API Route</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Here&apos;s the API route that initiates OAuth:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`import { randomBytes, createHash } from 'crypto';
  import { NextRequest, NextResponse } from 'next/server';

  function base64url(buf: Buffer) {
    return buf.toString('base64')
      .replace(/=/g, '')
      .replace(/\\+/g, '-')
      .replace(/\\//g, '_');
  }

  export async function GET(request: NextRequest) {
    const businessId = request.nextUrl.searchParams.get('businessId');
    
    // Generate PKCE parameters
    const state = base64url(randomBytes(16));          // CSRF protection
    const codeVerifier = base64url(randomBytes(32));   // PKCE secret
    const codeChallenge = base64url(
      createHash('sha256').update(codeVerifier).digest()
    );
    
    // Store PKCE data in httpOnly cookie (expires in 10 minutes)
    const response = NextResponse.redirect(authorizationUrl);
    response.cookies.set({
      name: 'xero_pkce',
      value: JSON.stringify({ state, codeVerifier, businessId }),
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 600,  // 10 minutes
      domain: '.mybalancingiq.com',
    });
    
    // Build authorization URL
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.XERO_CLIENT_ID!,
      redirect_uri: process.env.XERO_REDIRECT_URI!,
      scope: 'openid profile email accounting.transactions',
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });
    
    const authUrl = \`https://login.xero.com/identity/connect/authorize?\${params}\`;
    return NextResponse.redirect(authUrl);
  }`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Key Security Decisions</h3>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>httpOnly cookie:</strong> Prevents JavaScript from accessing PKCE data (XSS protection)</li>
          <li><strong>secure: true:</strong> Only sent over HTTPS</li>
          <li><strong>sameSite: &apos;lax&apos;:</strong> Prevents CSRF while allowing OAuth callbacks</li>
          <li><strong>Short expiry (600s):</strong> Limits attack window</li>
          <li><strong>Random state:</strong> Prevents CSRF attacks by ensuring callbacks are from our initiated flow</li>
        </ul>

        <div className="mt-6 p-4 rounded-2xl border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-900 dark:text-yellow-200">
            <strong>Important:</strong> Don&apos;t use <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">sameSite: &apos;strict&apos;</code>! 
            It will block OAuth callbacks because they come from external domains (Xero, QuickBooks, etc.). 
            Use <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">sameSite: &apos;lax&apos;</code> instead.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Step 2: Authorization Callback and Token Exchange</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          After the user authorizes your app, the provider redirects back to your callback URL with 
          an authorization code. Now you need to:
        </p>

        <ol className="mt-4 list-decimal list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li>Validate the state parameter (CSRF protection)</li>
          <li>Exchange the authorization code for tokens using PKCE</li>
          <li>Retrieve the organization/tenant information</li>
          <li>Store tokens securely</li>
        </ol>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`import { NextRequest, NextResponse } from 'next/server';

  export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code');
    const state = request.nextUrl.searchParams.get('state');
    
    // 1. Retrieve PKCE data from cookie
    const pkceCookie = request.cookies.get('xero_pkce');
    if (!pkceCookie) {
      return NextResponse.redirect(
        \`\${process.env.AMPLIFY_APP_ORIGIN}/error?message=pkce_missing\`
      );
    }
    
    const { state: savedState, codeVerifier, businessId } = 
      JSON.parse(pkceCookie.value);
    
    // 2. Validate state (CSRF protection)
    if (state !== savedState) {
      console.error('State mismatch - possible CSRF attack');
      return NextResponse.redirect(
        \`\${process.env.AMPLIFY_APP_ORIGIN}/error?message=invalid_state\`
      );
    }
    
    // 3. Exchange authorization code for tokens
    const tokenResponse = await fetch(
      'https://identity.xero.com/connect/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': \`Basic \${Buffer.from(
            \`\${XERO_CLIENT_ID}:\${XERO_CLIENT_SECRET}\`
          ).toString('base64')}\`
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code!,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier  // PKCE proof
        })
      }
    );
    
    const tokens = await tokenResponse.json();
    
    // 4. Get tenant/organization info
    const connectionResponse = await fetch(
      'https://api.xero.com/connections',
      {
        headers: {
          'Authorization': \`Bearer \${tokens.access_token}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const connections = await connectionResponse.json();
    const tenant = connections[0];  // First connected organization
    
    // 5. Store tokens securely (invoke Lambda via GraphQL)
    const integrationData = {
      businessId,
      provider: 'xero',
      tenantId: tenant.tenantId,
      orgName: tenant.tenantName,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      scopes: tokens.scope,
    };
    
    await storeTokens(integrationData);
    
    // 6. Clear PKCE cookie
    const response = NextResponse.redirect(
      \`\${process.env.AMPLIFY_APP_ORIGIN}/businessprofile?connected=xero\`
    );
    response.cookies.delete('xero_pkce');
    
    return response;
  }`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Why Basic Auth for Token Exchange?</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Notice the <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">Authorization: Basic</code> header? 
          This is standard OAuth 2.0. You send your client ID and secret as Base64-encoded Basic Auth credentials:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`const credentials = Buffer.from(\`\${clientId}:\${clientSecret}\`)
    .toString('base64');
    
  // Becomes: Authorization: Basic Y2xpZW50X2lkOmNsaWVudF9zZWNyZXQ=`}</pre>
        </div>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          This authenticates your application to the provider. Never expose your client secret in 
          frontend code, always do token exchange server-side.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Step 3: Secure Token Storage with KMS Encryption</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Now we have tokens. Where do we store them? <strong>Never store refresh tokens in plain text. </strong> 
          If your database is compromised, attackers get permanent access to user data.
        </p>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          BalancingIQ uses <strong>AWS KMS (Key Management Service)</strong> to encrypt refresh 
          tokens before storing them in DynamoDB.
        </p>

        <h3 className="mt-8 text-xl font-semibold">Lambda Function: Token Storage</h3>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`import boto3
  import base64
  from datetime import datetime

  kms_client = boto3.client('kms')
  dynamodb = boto3.resource('dynamodb')
  table = dynamodb.Table(os.environ['BOOKKEEPING_INTEGRATIONS_TABLE'])

  def handler(event, context):
      data = json.loads(event['arguments']['data'])
      
      business_id = data['businessId']
      provider = data['provider']
      tenant_id = data['tenantId']
      refresh_token = data['refreshToken']
      
      # Encrypt refresh token with KMS
      encrypted_response = kms_client.encrypt(
          KeyId=os.environ['APP_KMS_KEY_ID'],
          Plaintext=refresh_token.encode('utf-8')
      )
      
      refresh_ciphertext = base64.b64encode(
          encrypted_response['CiphertextBlob']
      ).decode('utf-8')
      
      # Calculate token expiration
      now = int(datetime.utcnow().timestamp())
      expires_at = now + int(data['expiresIn']) - 30  # 30s buffer
      
      # Store in DynamoDB
      sort_key = f"{provider}#{tenant_id}"
      
      table.put_item(Item={
          'businessId': business_id,        # Partition key
          'sortKey': sort_key,               # Sort key: provider#tenantId
          'provider': provider,
          'tenantId': tenant_id,
          'orgName': data['orgName'],
          'scopes': data['scopes'],
          'refreshCiphertext': refresh_ciphertext,  # Encrypted!
          'accessToken': data['accessToken'],        # Short-lived, less sensitive
          'accessTokenExpiresAt': expires_at,
          'createdAt': now,
          'updatedAt': now,
      })
      
      return {'success': True}`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Multi-Tenant Data Model</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The DynamoDB schema uses a composite key for multi-tenant isolation:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Partition key:</strong> <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">businessId</code> 
            (ensures data isolation per business)</li>
          <li><strong>Sort key:</strong> <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">provider#tenantId</code> 
            (supports multiple integrations per business)</li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          This means:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li>Business A can connect to Xero and QuickBooks simultaneously</li>
          <li>Business B&apos;s data is completely isolated from Business A</li>
          <li>Queries are fast (DynamoDB partition-key lookups)</li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold">Why Encrypt Access Tokens Too?</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          In the code above, I store access tokens in plain text. They&apos;re short-lived (30-60 minutes), 
          so the risk is lower. But for maximum security, <strong>encrypt access tokens too</strong>. 
          It&apos;s a small performance cost for defense-in-depth.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Step 4: Automatic Token Refresh</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Access tokens expire quickly. Most providers give you 30-60 minutes. When your Lambda 
          function needs to make API calls, it must check if tokens need refreshing and handle it 
          automatically.
        </p>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Here&apos;s the pattern I use in every Lambda that calls external APIs:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`import boto3
  import base64
  from datetime import datetime

  kms_client = boto3.client('kms')
  dynamodb = boto3.resource('dynamodb')

  def refresh_if_needed_xero(business_id, auth_record):
      """Check if access token needs refresh, refresh if needed"""
      now = int(datetime.utcnow().timestamp())
      expires_at = int(auth_record.get('accessTokenExpiresAt', 0))
      access_token = auth_record.get('accessToken', '')
      
      # If token is valid for >60 seconds, use it
      if now < (expires_at - 60) and access_token:
          print(f"Token valid for {expires_at - now} more seconds")
          return access_token, auth_record['tenantId']
      
      print("Token expired or expiring soon, refreshing...")
      
      # Decrypt refresh token
      cipher_blob = base64.b64decode(auth_record['refreshCiphertext'])
      decrypted = kms_client.decrypt(
          CiphertextBlob=cipher_blob,
          KeyId=os.environ['APP_KMS_KEY_ID']
      )
      refresh_token = decrypted['Plaintext'].decode('utf-8')
      
      # Call token endpoint
      token_response = requests.post(
          'https://identity.xero.com/connect/token',
          headers={
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': f'Basic {get_basic_auth_header()}'
          },
          data={
              'grant_type': 'refresh_token',
              'refresh_token': refresh_token
          }
      )
      
      tokens = token_response.json()
      
      # Update stored tokens
      new_access = tokens['access_token']
      new_refresh = tokens.get('refresh_token', refresh_token)  # Some providers rotate
      new_expires_at = now + int(tokens.get('expires_in', 1800)) - 30
      
      save_refreshed_tokens(
          business_id, 
          auth_record, 
          new_access, 
          new_refresh, 
          new_expires_at
      )
      
      return new_access, auth_record['tenantId']


  def save_refreshed_tokens(business_id, auth_record, access_token, 
                            refresh_token, expires_at):
      """Encrypt and save refreshed tokens"""
      # Encrypt new refresh token
      encrypted = kms_client.encrypt(
          KeyId=os.environ['APP_KMS_KEY_ID'],
          Plaintext=refresh_token.encode('utf-8')
      )
      refresh_ciphertext = base64.b64encode(encrypted['CiphertextBlob']).decode()
      
      # Update DynamoDB
      table.update_item(
          Key={
              'businessId': business_id,
              'sortKey': auth_record['sortKey']
          },
          UpdateExpression="""
              SET accessToken = :atk,
                  accessTokenExpiresAt = :exp,
                  refreshCiphertext = :rc,
                  updatedAt = :upd
          """,
          ExpressionAttributeValues={
              ':atk': access_token,
              ':exp': expires_at,
              ':rc': refresh_ciphertext,
              ':upd': int(datetime.utcnow().timestamp())
          }
      )`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Key Design Decisions</h3>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>60-second buffer:</strong> Refresh 60s before expiration to account for clock skew and request time</li>
          <li><strong>Refresh token rotation:</strong> Some providers (like QuickBooks) return a new refresh token. Always check and update.</li>
          <li><strong>Fallback to stored refresh:</strong> If no new refresh token is returned, keep using the old one</li>
          <li><strong>Atomic updates:</strong> Use DynamoDB&apos;s <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">UpdateExpression</code> 
            to avoid race conditions</li>
        </ul>

        <div className="mt-6 p-4 rounded-2xl border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Pro tip:</strong> Always log token refresh events. When debugging OAuth issues, 
            knowing when tokens were refreshed (and if refresh failed) is invaluable.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Step 5: Making Authenticated API Calls</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Now that we have valid tokens, we can make API calls. Here&apos;s the full flow in a Lambda 
          function that fetches financial data:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`def handler(event, context):
      """Fetch financial data from Xero"""
      business_id = event['arguments']['businessId']
      
      # 1. Get stored auth record
      response = table.get_item(
          Key={
              'businessId': business_id,
              'sortKey': 'xero#'  # Query for Xero integration
          }
      )
      
      if 'Item' not in response:
          return {'error': 'Xero not connected'}
      
      auth_record = response['Item']
      
      # 2. Ensure token is fresh (auto-refresh if needed)
      access_token, tenant_id = refresh_if_needed_xero(business_id, auth_record)
      
      # 3. Make API call
      headers = {
          'Authorization': f'Bearer {access_token}',
          'Xero-Tenant-Id': tenant_id,
          'Accept': 'application/json'
      }
      
      # Fetch balance sheet
      balance_sheet = requests.get(
          'https://api.xero.com/api.xro/2.0/Reports/BalanceSheet',
          headers=headers
      ).json()
      
      # Fetch profit & loss
      profit_loss = requests.get(
          'https://api.xero.com/api.xro/2.0/Reports/ProfitAndLoss',
          headers=headers
      ).json()
      
      return {
          'balanceSheet': balance_sheet,
          'profitLoss': profit_loss
      }`}</pre>
        </div>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Notice how the business logic is clean. All the token refresh complexity is hidden in 
          <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">refresh_if_needed_xero()</code>. 
          Every Lambda that needs OAuth just calls this function first.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Provider-Specific Gotchas</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Each OAuth provider has quirks. Here are the issues I encountered:
        </p>

        <h3 className="mt-8 text-xl font-semibold">Xero</h3>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Tenant ID requirement:</strong> Every API call needs <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">Xero-Tenant-Id</code> header</li>
          <li><strong>Multiple organizations:</strong> A user can have multiple Xero organizations. Always let them choose.</li>
          <li><strong>Scope format:</strong> Use spaces: <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">openid profile email accounting.transactions</code></li>
          <li><strong>Token expiry:</strong> 30 minutes for access tokens, 60 days for refresh tokens</li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold">QuickBooks Online</h3>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Realm ID:</strong> Called <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">realmId</code>, 
            required for all API calls (equivalent to Xero&apos;s tenant ID)</li>
          <li><strong>Refresh token rotation:</strong> <em>Always</em> returns a new refresh token. Must update storage.</li>
          <li><strong>Refresh token expiry:</strong> 100 days, but you get a new one each refresh</li>
          <li><strong>API versioning:</strong> Uses <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">minorversion</code> 
            query param for API versioning</li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold">Microsoft Outlook (SOA Assist Pro)</h3>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Scope format:</strong> Uses full URLs: <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">
            https://graph.microsoft.com/Calendars.ReadWrite</code></li>
          <li><strong>Offline access:</strong> Must request <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">offline_access</code> 
            scope to get refresh tokens</li>
          <li><strong>Token lifetime:</strong> Varies by account type (personal vs. work)</li>
          <li><strong>Admin consent:</strong> Work accounts may require admin approval for certain scopes</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">Error Handling and Edge Cases</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Production OAuth isn&apos;t just about the happy path. Here&apos;s how I handle failures:
        </p>

        <h3 className="mt-8 text-xl font-semibold">Revoked Access</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Users can revoke access in Xero/QuickBooks settings. When refresh fails with 
          <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">invalid_grant</code>, 
          delete the stored integration and notify the user:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`try:
      tokens = token_response.json()
  except:
      if token_response.status_code == 400:
          error = token_response.json()
          if error.get('error') == 'invalid_grant':
              # User revoked access - delete integration
              table.delete_item(
                  Key={
                      'businessId': business_id,
                      'sortKey': auth_record['sortKey']
                  }
              )
              # Notify user via email/notification
              send_notification(business_id, 'xero_disconnected')
              raise Exception('Xero access revoked by user')`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Rate Limits</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Xero and QuickBooks have rate limits. Implement exponential backoff and respect 
          <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">Retry-After</code> headers:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`def api_call_with_retry(url, headers, max_retries=3):
      for attempt in range(max_retries):
          response = requests.get(url, headers=headers)
          
          if response.status_code == 200:
              return response.json()
          
          if response.status_code == 429:  # Rate limited
              retry_after = int(response.headers.get('Retry-After', 60))
              print(f"Rate limited, waiting {retry_after}s")
              time.sleep(retry_after)
              continue
          
          if response.status_code >= 500:  # Server error
              wait = 2 ** attempt  # Exponential backoff
              print(f"Server error, retrying in {wait}s")
              time.sleep(wait)
              continue
          
          raise Exception(f"API call failed: {response.status_code}")`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Concurrent Refresh</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          What if two Lambda invocations try to refresh the same token simultaneously? Use DynamoDB 
          conditional writes or implement a distributed lock with DynamoDB TTL items.
        </p>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          For BalancingIQ, I accept the race condition risk because:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li>Refresh tokens don&apos;t expire on use (both refreshes succeed)</li>
          <li>The last write wins, which is fine</li>
          <li>It&apos;s rare (users don&apos;t trigger multiple parallel API calls)</li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          If your system has high concurrency, implement proper locking.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">IAM Permissions for Lambda</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Your Lambda functions need specific IAM permissions. Here&apos;s the minimal policy:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:Query"
        ],
        "Resource": "arn:aws:dynamodb:region:account:table/BookkeepingIntegrations"
      },
      {
        "Effect": "Allow",
        "Action": [
          "kms:Encrypt",
          "kms:Decrypt"
        ],
        "Resource": "arn:aws:kms:region:account:key/your-key-id"
      }
    ]
  }`}</pre>
        </div>

        {/*<h2 className="mt-10 text-2xl font-semibold">Testing OAuth Flows</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          OAuth is hard to test because it requires real user interaction with external services. 
          Here&apos;s my strategy:
        </p>

        <h3 className="mt-8 text-xl font-semibold">Local Development</h3>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li>Use <strong>ngrok</strong> to expose localhost as HTTPS endpoint</li>
          <li>Register ngrok URL as redirect URI in provider dashboard</li>
          <li>Run through full OAuth flow locally</li>
        </ul>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`# Terminal 1: Start Next.js
  npm run dev

  # Terminal 2: Start ngrok
  ngrok http 3000

  # Use ngrok URL in provider settings:
  # https://abc123.ngrok.io/api/bookkeeping-auth/xero/callback`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Automated Testing</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          For CI/CD, I mock the OAuth flow:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`# tests/test_oauth.py
  import pytest
  from unittest.mock import patch, Mock

  @patch('requests.post')
  def test_token_refresh(mock_post):
      # Mock token endpoint response
      mock_post.return_value = Mock(
          status_code=200,
          json=lambda: {
              'access_token': 'new_access_123',
              'refresh_token': 'new_refresh_456',
              'expires_in': 1800
          }
      )
      
      # Test refresh logic
      access, tenant = refresh_if_needed_xero(
          business_id='biz_123',
          auth_record={
              'accessTokenExpiresAt': 0,  # Expired
              'refreshCiphertext': 'encrypted_token',
              'sortKey': 'xero#tenant_123'
          }
      )
      
      assert access == 'new_access_123'
      assert mock_post.called`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">Sandbox Accounts</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Both Xero and QuickBooks offer sandbox/demo accounts:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Xero:</strong> Demo companies with fake data</li>
          <li><strong>QuickBooks:</strong> Sandbox environment with test companies</li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Use these for integration testing without affecting real customer data.
        </p>*/}

        <h2 className="mt-10 text-2xl font-semibold">Monitoring and Debugging</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          OAuth issues are invisible to users until something breaks. Implement observability:
        </p>

        <h3 className="mt-8 text-xl font-semibold">CloudWatch Logs</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Log every OAuth event with structured data:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`print(json.dumps({
      'event': 'token_refresh',
      'business_id': business_id,
      'provider': 'xero',
      'expires_at': expires_at,
      'time_until_expiry': expires_at - now,
      'success': True
  }))`}</pre>
        </div>

        <h3 className="mt-8 text-xl font-semibold">CloudWatch Alarms</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Set up alarms for:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>Refresh failures:</strong> Alert when refresh_token fails</li>
          <li><strong>Rate limit errors:</strong> Too many 429 responses</li>
          <li><strong>Missing integrations:</strong> API calls with no stored auth</li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold">DynamoDB Metrics</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Track integration health in DynamoDB:
        </p>

        <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur font-mono text-sm overflow-x-auto">
          <pre className="text-black/80 dark:text-white/80">{`# Add metadata to each integration record
  {
    'businessId': 'biz_123',
    'sortKey': 'xero#tenant_456',
    ...
    'lastRefreshAt': 1706112000,
    'lastRefreshSuccess': True,
    'lastApiCallAt': 1706115600,
    'consecutiveFailures': 0
  }`}</pre>
        </div>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Use this to identify stale integrations or recurring failures.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Security Checklist</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Before going to production, verify:
        </p>

        <div className="mt-6 p-4 rounded-2xl border border-black/10 dark:border-white/20 bg-white/40 dark:bg-black/20">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>PKCE implemented for all OAuth flows</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>State parameter validated on callback</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Refresh tokens encrypted with KMS</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Tokens stored with multi-tenant isolation</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>httpOnly cookies for PKCE data</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Short cookie expiry (≤10 minutes)</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Client secrets never exposed to frontend</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Automatic token refresh implemented</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Token expiry buffer (60s) to account for clock skew</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Revoked access handled gracefully</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>Rate limiting with exponential backoff</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>All OAuth events logged</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>CloudWatch alarms for failures</span>
            </li>
            <li className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <span>IAM permissions follow principle of least privilege</span>
            </li>
          </ul>
        </div>

        <h2 className="mt-10 text-2xl font-semibold">Common Mistakes to Avoid</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          After implementing OAuth for three different products, here are the pitfalls I see most often:
        </p>

        <h3 className="mt-8 text-xl font-semibold">1. Storing Tokens in localStorage</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          <strong>Never</strong> store OAuth tokens in localStorage or sessionStorage. Any JavaScript 
          on your page (including third-party scripts) can access them. Use httpOnly cookies or 
          server-side storage only.
        </p>

        <h3 className="mt-8 text-xl font-semibold">2. Not Using PKCE</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          &quot;But I&apos;m using a client secret&quot;, doesn&apos;t matter. PKCE protects against 
          authorization code interception. Always use it, even with confidential clients.
        </p>

        <h3 className="mt-8 text-xl font-semibold">3. Ignoring Token Rotation</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Some providers (QuickBooks, Microsoft) rotate refresh tokens. If you don&apos;t update 
          your stored token, the old one becomes invalid after one use.
        </p>

        <h3 className="mt-8 text-xl font-semibold">4. Hard-Coding Redirect URIs</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Use environment variables for redirect URIs. You&apos;ll need different URIs for localhost, 
          staging, and production.
        </p>

        <h3 className="mt-8 text-xl font-semibold">5. Not Handling Revoked Access</h3>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          Users can revoke access at any time. When refresh fails with <code className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">invalid_grant</code>, 
          delete the integration and notify the user, don&apos;t keep retrying forever.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">Conclusion</h2>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          OAuth 2.0 is deceptively complex. The basic flow is simple, but production-ready 
          implementations require:
        </p>

        <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
          <li><strong>PKCE</strong> for authorization code protection</li>
          <li><strong>State validation</strong> for CSRF prevention</li>
          <li><strong>KMS encryption</strong> for token storage</li>
          <li><strong>Automatic refresh</strong> with proper buffering</li>
          <li><strong>Multi-tenant isolation</strong> with composite keys</li>
          <li><strong>Comprehensive error handling</strong> for revoked access, rate limits, and failures</li>
          <li><strong>Observability</strong> for debugging when things go wrong</li>
        </ul>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          This architecture has been battle-tested in <strong>BalancingIQ</strong> (financial integrations) 
          and <strong>SOA Assist Pro</strong> (Microsoft Outlook), handling thousands of OAuth flows 
          without security incidents.
        </p>

        <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
          The complexity is worth it. Once you have this foundation, adding new OAuth providers is 
          straightforward, just implement the provider-specific endpoints and you&apos;re done.
        </p>

        <div className="mt-10 p-6 rounded-2xl border border-black/10 dark:border-white/20 bg-gradient-to-br from-indigo-50 to-emerald-50 dark:from-indigo-950/30 dark:to-emerald-950/30">
          <p className="text-sm opacity-90">
            <strong>Building OAuth integrations?</strong> I&apos;ve implemented secure OAuth for 
            Xero, QuickBooks, Microsoft Outlook, and other platforms. If you&apos;re building 
            similar integrations or need help with production OAuth, reach out at{' '}
            <a href="mailto:adamdugan6@gmail.com" className="underline underline-offset-2">
              adamdugan6@gmail.com
            </a>
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href="/blog"
            className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4"
          >
            ← Back to blog
          </Link>
        </div>
        <p className="mt-8 text-sm text-black/60 dark:text-white/60 italic text-center">
          I (Adam Dugan) used LLMs while writing this article.
        </p>
      </main>
    </>
  );
}