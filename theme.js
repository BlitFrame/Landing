(function() {
    // Apply saved theme immediately to prevent flash
    var saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.documentElement.classList.add('light');
    } else if (saved === 'system') {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.classList.add('light');
        }
    }
    // Default (no saved or 'dark') = dark mode, no class needed

    window.toggleTheme = function() {
        var isLight = document.documentElement.classList.toggle('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        // Update meta theme-color
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute('content', isLight ? '#1d9e80' : '#26c6a0');
        }
    };

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(e) {
        var saved = localStorage.getItem('theme');
        if (!saved || saved === 'system') {
            if (e.matches) {
                document.documentElement.classList.add('light');
            } else {
                document.documentElement.classList.remove('light');
            }
        }
    });
})();
