import { useEffect } from 'react';

const MAZE_API_KEY = 'accbd2a5-715c-4ec3-b470-f278943ff4b9';

const MazeScript = () => {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('maze-universal-script') || window.mazeUniversalSnippetApiKey) {
      return;
    }

    // Maze Universal Snippet
    (function (m, a, z, e) {
      var s, t, u, v;
      try {
        t = m.sessionStorage.getItem('maze-us');
      } catch (err) {}
      if (!t) {
        t = new Date().getTime();
        try {
          m.sessionStorage.setItem('maze-us', t);
        } catch (err) {}
      }
      u = document.currentScript || (function () {
        var w = document.getElementsByTagName('script');
        return w[w.length - 1];
      })();
      v = u && u.nonce;
      s = a.createElement('script');
      s.id = 'maze-universal-script';
      s.src = z + '?apiKey=' + e;
      s.async = true;
      if (v) s.setAttribute('nonce', v);
      a.getElementsByTagName('head')[0].appendChild(s);
      m.mazeUniversalSnippetApiKey = e;
    })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', MAZE_API_KEY);
  }, []);

  return null;
};

export default MazeScript;

