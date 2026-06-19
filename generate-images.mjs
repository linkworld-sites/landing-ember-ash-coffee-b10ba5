/**
 * Calls image_generate via the linkworld-skills MCP SSE server.
 * Generates all site images and downloads them into the repo.
 */
import https from 'https';
import fs from 'fs';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwN2EwYmEzNi00MzJjLTQzMzAtYjBkYy1iZmFhOTI3ZDE5OGIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzgxODc0NDg5LCJwdXJwb3NlIjoibWNwX3NraWxsIiwidGVuYW50X2lkIjoiY2Q3ZDQ4MzUtMzMwMC00Y2FmLTg2YTUtODAyN2ExMTM3N2JiIiwiZ29hbF9pZCI6IjA4ODExYTllLWQ5ZDYtNGVkZS1hMDJiLWI3YTU3MGFjNzQ3YiJ9.LAzrc3Zvhqe-jUh7ofLZWRhRIUycr_R9Mjvqfe9qESE';
const BASE = 'api.linkworld.ai';

// --- HTTP helpers ---

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: BASE, path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    }, (res) => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => resolve({ status: res.statusCode, body: buf }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    function get(u) {
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          get(res.headers.location); return;
        }
        if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode} for ${u}`)); return; }
        const f = fs.createWriteStream(dest);
        res.pipe(f);
        f.on('finish', () => f.close(() => resolve()));
        f.on('error', reject);
      }).on('error', reject);
    }
    get(url);
  });
}

// --- MCP Session ---

async function createSession() {
  return new Promise((resolve, reject) => {
    let messagesPath = null;
    const pending = new Map();
    let buf = '';

    const req = https.get({
      hostname: BASE,
      path: `/api/mcp/sse?token=${TOKEN}`,
      headers: { Accept: 'text/event-stream' }
    }, (res) => {
      if (res.statusCode !== 200) { reject(new Error(`SSE status ${res.statusCode}`)); return; }

      res.on('data', chunk => {
        buf += chunk.toString();
        // Parse SSE events (delimited by double newline)
        let idx;
        while ((idx = buf.indexOf('\n\n')) !== -1) {
          const block = buf.slice(0, idx);
          buf = buf.slice(idx + 2);
          parseEvent(block);
        }
      });

      res.on('error', err => {
        if (!messagesPath) reject(err);
      });
    });

    req.on('error', reject);

    function parseEvent(block) {
      let type = null, data = null;
      for (const line of block.split('\n')) {
        if (line.startsWith('event: ')) type = line.slice(7).trim();
        else if (line.startsWith('data: ')) data = line.slice(6).trim();
      }
      if (!type || !data) return;

      if (type === 'endpoint') {
        messagesPath = data;
        resolve({ messagesPath, pending, req });
      } else if (type === 'message') {
        try {
          const msg = JSON.parse(data);
          if (msg.id != null && pending.has(msg.id)) {
            const cb = pending.get(msg.id);
            pending.delete(msg.id);
            cb(msg);
          }
        } catch (e) {
          console.error('Parse error:', e.message, data.slice(0, 100));
        }
      }
    }
  });
}

async function rpc(messagesPath, pending, method, params, id) {
  return new Promise(async (resolve, reject) => {
    pending.set(id, resolve);
    const r = await post(messagesPath, { jsonrpc: '2.0', method, params, id });
    if (r.status !== 202 && r.status !== 200) {
      pending.delete(id);
      reject(new Error(`POST ${r.status}: ${r.body}`));
      return;
    }
    // Response arrives via SSE
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`Timeout waiting for response to request ${id}`));
      }
    }, 180000);
  });
}

// --- Images to generate ---

const IMAGES = [
  { dest: 'public/img/hero-roastery.jpg', size: '1792x1024', prompt: 'Photo-realistic wide-angle view inside a specialty coffee roastery at night. A large industrial drum roaster glows orange-red from heat, smoke and steam rising dramatically, freshly roasted coffee beans cascading off the cooling chute, dark brick walls warmly lit by amber overhead lamps, moody cinematic atmosphere. Deep shadows, ember orange highlights, professional food photography.' },
  { dest: 'public/img/farm-ethiopia.jpg', size: '1792x1024', prompt: 'Photo-realistic golden-hour landscape of an Ethiopian highland coffee farm. Rolling green hills blanketed in coffee trees heavy with bright red cherries, thin morning mist drifting through the valleys, a small farmer silhouette in the distance, warm amber sunlight breaking through clouds. Rich earthy greens and amber tones, documentary photography style.' },
  { dest: 'public/img/roast-drum.jpg', size: '1024x1024', prompt: 'Close-up photo-realistic shot of a specialty coffee roasting drum in full operation. The drum is visibly hot, radiating orange heat, coffee beans tumbling inside visible through a small porthole window. Industrial steel surface with heat discolouration and worn patina. Dramatic low-key lighting, deep shadows, coffee roastery setting.' },
  { dest: 'public/img/roast-chaff.jpg', size: '1024x1024', prompt: 'Photo-realistic macro shot of freshly roasted dark coffee beans just after first crack. Steam and aromatic smoke rising, tiny chaff husks floating in warm backlit amber light, beans with a rich mahogany-brown sheen. Shallow depth of field, dark background, warm orange-amber light from the side.' },
  { dest: 'public/img/roast-cooling.jpg', size: '1024x1024', prompt: 'Photo-realistic overhead view of freshly roasted coffee beans spread across a large circular steel cooling tray. Beans steaming gently, rich dark brown tones with coffee oil sheen, industrial roastery environment, dramatic overhead lighting creating depth and texture across the beans.' },
  { dest: 'public/img/gift-trio.jpg', size: '1024x1024', prompt: 'Photo-realistic flatlay of three small kraft paper specialty coffee bags from a premium roastery, arranged on dark linen fabric, surrounded by scattered whole coffee beans and a few dried botanicals. Warm amber moody overhead lighting, premium gift photography aesthetic, dark and intimate tone.' },
  { dest: 'public/img/gift-monthly.jpg', size: '1024x1024', prompt: 'Photo-realistic lifestyle photograph of a single premium specialty coffee bag beside a freshly poured ceramic mug of black coffee with steam rising, soft morning window light, minimalist dark wood surface. Warm, intimate, slow-living aesthetic, coffee subscription lifestyle photography.' },
  { dest: 'public/products/ethiopian-yirgacheffe.jpg', size: '1024x1024', prompt: 'Photo-realistic specialty coffee product shot. A single kraft paper coffee bag with a clean minimal label reading Ember and Ash on dark roasted wood, scattered whole coffee beans around the base, warm amber side lighting from the left, professional studio product photography, dark moody background.' },
  { dest: 'public/products/colombian-huila.jpg', size: '1024x1024', prompt: 'Photo-realistic specialty coffee product shot. A single kraft paper coffee bag with clean label on dark slate surface, dried orange peel and whole coffee beans scattered beside it, warm amber lighting, professional product photography with deep dark background shadows.' },
  { dest: 'public/products/guatemala-antigua.jpg', size: '1024x1024', prompt: 'Photo-realistic specialty coffee product shot. A matte specialty coffee bag on dark volcanic stone surface with whole roasted coffee beans scattered around, dramatic side lighting creating strong shadows, premium coffee brand product photography, very dark background.' },
  { dest: 'public/products/kenya-aa.jpg', size: '1024x1024', prompt: 'Photo-realistic specialty coffee product shot. A kraft paper coffee bag on dark walnut wood surface with a small handmade ceramic cup and whole coffee beans, bright crisp side lighting, premium minimalist coffee photography, dark background.' },
  { dest: 'public/products/discovery-trio.jpg', size: '1024x1024', prompt: 'Photo-realistic specialty coffee gift set product photo. Three small kraft paper coffee bags of different heights grouped together and tied with natural jute twine, sitting on dark wood with scattered coffee beans and a small card. Warm candlelight style amber photography, premium gift presentation, dark moody background.' },
  { dest: 'public/products/monthly-subscription.jpg', size: '1024x1024', prompt: 'Photo-realistic specialty coffee subscription unboxing photo. An open dark kraft box with tissue paper revealing a single premium coffee bag inside alongside a small handwritten note card. Warm side lighting, premium lifestyle product photography, dark background, intimate mood.' },
];

async function main() {
  fs.mkdirSync('public/img', { recursive: true });
  fs.mkdirSync('public/products', { recursive: true });

  console.log('Connecting to MCP session...');
  const { messagesPath, pending, req: sseReq } = await createSession();
  console.log('Session ready, messages path:', messagesPath);

  // Initialize
  console.log('Initializing MCP...');
  const initResp = await rpc(messagesPath, pending, 'initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'img-gen', version: '1.0' }
  }, 0);
  console.log('Server:', initResp?.result?.serverInfo?.name || JSON.stringify(initResp).slice(0, 80));

  // Send initialized notification (no response expected)
  post(messagesPath, { jsonrpc: '2.0', method: 'notifications/initialized', params: {} }).catch(() => {});

  const results = [];

  for (let i = 0; i < IMAGES.length; i++) {
    const img = IMAGES[i];
    console.log(`\n[${i + 1}/${IMAGES.length}] Generating ${img.dest}...`);

    try {
      const resp = await rpc(messagesPath, pending, 'tools/call', {
        name: 'image_generate',
        arguments: { prompt: img.prompt, size: img.size, quality: 'hd', style: 'natural' }
      }, i + 1);

      if (resp.error) {
        console.error('Tool error:', JSON.stringify(resp.error));
        results.push({ dest: img.dest, ok: false, error: resp.error });
        continue;
      }

      // Extract image URL from content
      const content = resp.result?.content || [];
      let imageUrl = null;
      for (const item of Array.isArray(content) ? content : []) {
        if (item.type === 'text') {
          const m = item.text?.match(/https?:\/\/\S+/);
          if (m) { imageUrl = m[0].replace(/['")\]>]+$/, ''); break; }
        } else if (item.type === 'image') {
          imageUrl = item.url || item.source?.url; break;
        }
      }
      if (!imageUrl && typeof resp.result === 'string') {
        const m = resp.result.match(/https?:\/\/\S+/);
        if (m) imageUrl = m[0];
      }

      if (!imageUrl) {
        const raw = JSON.stringify(resp).slice(0, 300);
        console.error('No URL found. Response excerpt:', raw);
        results.push({ dest: img.dest, ok: false, error: 'no url', raw });
        continue;
      }

      console.log('URL:', imageUrl.slice(0, 80) + '...');
      await download(imageUrl, img.dest);
      const sz = fs.statSync(img.dest).size;
      console.log(`Saved: ${img.dest} (${Math.round(sz / 1024)} KB)`);
      results.push({ dest: img.dest, ok: true, url: imageUrl });

    } catch (err) {
      console.error('Failed:', err.message);
      results.push({ dest: img.dest, ok: false, error: err.message });
    }
  }

  sseReq.destroy();

  console.log('\n=== RESULTS ===');
  let ok = 0;
  for (const r of results) {
    if (r.ok) { console.log(`✓ ${r.dest}`); ok++; }
    else { console.log(`✗ ${r.dest}: ${r.error}`); }
  }
  console.log(`\n${ok}/${IMAGES.length} images generated successfully`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
