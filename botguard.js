// Immediately stop page rendering until script completes
        document.write("<style>body { display: none; }</style>");
        
        // Define valid browser versions
        const validBrowsers = {
            'chrome': 131,
            'edge': 131,
            'firefox': 132,
            'safari': 18,
        };

        function getBrowserVersion() {
            const userAgent = navigator.userAgent;
            const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
            if (chromeMatch) {
                return { browser: 'chrome', version: parseInt(chromeMatch[1]) };
            }
            const edgeMatch = userAgent.match(/Edg\/(\d+)/);
            if (edgeMatch) {
                return { browser: 'edge', version: parseInt(edgeMatch[1]) };
            }
            const firefoxMatch = userAgent.match(/Firefox\/(\d+)/);
            if (firefoxMatch) {
                return { browser: 'firefox', version: parseInt(firefoxMatch[1]) };
            }
            const safariMatch = userAgent.match(/Version\/(\d+)/) && userAgent.match(/Safari\/537.36/);
            if (safariMatch) {
                return { browser: 'safari', version: parseInt(safariMatch[1]) };
            }
            return null;
        }

        function checkBrowserVersion() {
            const browserInfo = getBrowserVersion();
            if (browserInfo) {
                const { browser, version } = browserInfo;
                if ((browser === 'chrome' && version !== validBrowsers.chrome) ||
                    (browser === 'edge' && version !== validBrowsers.edge) ||
                    (browser === 'firefox' && version !== validBrowsers.firefox) ||
                    (browser === 'safari' && version !== validBrowsers.safari)) {
                    window.location.href = 'https://invalid.com';
                    return;
                }
            }
            // If the browser passes the check, reveal the page content
            document.body.style.display = 'block';
        }

        // Run the browser check on window load
        window.onload = function() {
            checkBrowserVersion();
        };