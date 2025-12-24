// index.js (debug-safe)
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// require things but don't mount them yet
let authRoutes;
let userRoutes;
let subscriptionRoutes;
let errorHandler;

try { authRoutes = require('./routes/authRoutes'); } catch (e) { console.error('Failed to require ./routes/authRoutes ->', e.message); }
try { userRoutes = require('./routes/userRoutes'); } catch (e) { console.error('Failed to require ./routes/userRoutes ->', e.message); }
try { subscriptionRoutes = require('./routes/subscriptionRoutes'); } catch (e) { console.error('Failed to require ./routes/subscriptionRoutes ->', e.message); }
try { ({ errorHandler } = require('./middlewares/errorMiddleware')); } catch (e) {
  // try fallback if module.exports = function
  try { errorHandler = require('./middlewares/errorMiddleware'); } catch (e2) {
    console.error('Failed to require ./middlewares/errorMiddleware ->', e.message);
  }
}

const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

/**
 * Helper to print what's inside a module and validate it before mounting.
 */
function inspectAndMount(path, moduleExport, mountPath) {
  console.log(`\n[inspect] ${mountPath} -> typeof:`, typeof moduleExport);
  console.log(`[inspect] ${mountPath} -> constructor/name:`, moduleExport && moduleExport.constructor ? moduleExport.constructor.name : 'N/A');
  // print a short representation to help debug (avoid huge dumps)
  if (moduleExport && typeof moduleExport === 'object') {
    const keys = Object.keys(moduleExport).slice(0, 10);
    console.log(`[inspect] ${mountPath} keys:`, keys);
  } else {
    console.log(`[inspect] ${mountPath} value:`, moduleExport);
  }

  const looksLikeRouter = (r) =>
    typeof r === 'function' || (r && typeof r === 'object' && typeof r.use === 'function');

  if (!moduleExport) {
    throw new Error(`${mountPath} is undefined or null. Did you export it correctly?`);
  }
  if (!looksLikeRouter(moduleExport)) {
    throw new Error(`${mountPath} does not look like an Express Router or middleware function. Received typeof=${typeof moduleExport}. Check your export in the file required for ${mountPath}.`);
  }

  // safe to mount
  app.use(mountPath, moduleExport);
}

// Mount routers with validation
try { inspectAndMount('/api/auth', authRoutes, 'authRoutes'); } catch (e) { console.error(e.message); process.exit(1); }
try { inspectAndMount('/api/users', userRoutes, 'userRoutes'); } catch (e) { console.error(e.message); process.exit(1); }
try { inspectAndMount('/api/subscriptions', subscriptionRoutes, 'subscriptionRoutes'); } catch (e) { console.error(e.message); process.exit(1); }

/** error handler must be function (4-args) OR a function in general */
console.log('\n[inspect] errorHandler typeof:', typeof errorHandler);
if (!errorHandler || typeof errorHandler !== 'function') {
  console.error('errorHandler is not a function. Make sure you export a function from ./middlewares/errorMiddleware.js');
  process.exit(1);
}
app.use(errorHandler);

app.get('/', (req, res) => res.send('Node backend is running... (debug mode)'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on tetteePORT ${PORT}`));
