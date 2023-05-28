document.addEventListener('DOMContentLoaded', function() {
        var params = new URLSearchParams(window.location.search);
        var scriptElement = document.createElement('script');
        let level = params.get('map');
        let fileUrl = 'cards_' + level + '.js';

        if (level) {
                var request = new XMLHttpRequest();
                request.open('HEAD', fileUrl, true);
                
                request.onreadystatechange = function() {
                        if (request.readyState === 4) {
                                if (request.status === 200) {
                                        scriptElement.src = 'cards_' + level + '.js';
                                        document.querySelector('.level').textContent = "Nível " + level;
                                } else {
                                        window.location.href = 'https://hack-proof-ispgaya.web.app';
                                }
                        }
                };
                request.send();
        } else {
                window.location.href = 'https://hack-proof-ispgaya.web.app';
        }
        scriptElement.type = "text/javascript";

        // Adiciona o elemento ao elemento pai desejado no DOM, por exemplo, o body
        document.body.appendChild(scriptElement);



        function existFile(fileUrl) {
                var request = new XMLHttpRequest();
                request.open('HEAD', fileUrl, true);
                
                request.onreadystatechange = function() {
                        if (request.readyState === 4) {
                                if (request.status === 200) {
                                        return true;
                                } else {
                                        return false;
                                }
                        }
                };
                request.send();
        }
});

