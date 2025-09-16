# Guide d'intégration Calendar et Contact

## 🗓️ Intégration Calendly

### Étapes pour configurer Calendly :

1. **Créer un compte Calendly** :
   - Aller sur [calendly.com](https://calendly.com)
   - Créer un compte gratuit ou payant

2. **Configurer vos créneaux** :
   - Définir vos heures de disponibilité
   - Créer des types de rendez-vous (30min, 1h, etc.)
   - Configurer les questions préalables

3. **Intégrer dans le site** :
   ```javascript
   // Dans script.js, remplacer la fonction openCalendly() par :
   function openCalendly() {
       // Option 1: Popup Calendly
       Calendly.initPopupWidget({url: 'https://calendly.com/VOTRE_USERNAME'});

       // Option 2: Inline widget
       const modal = document.getElementById('calendly-modal');
       const embedDiv = modal.querySelector('.calendly-placeholder');
       embedDiv.innerHTML = '<div class="calendly-inline-widget" data-url="https://calendly.com/VOTRE_USERNAME" style="min-width:320px;height:630px;"></div>';

       // Charger le script Calendly
       if (!document.querySelector('script[src*="calendly"]')) {
           const script = document.createElement('script');
           script.src = 'https://assets.calendly.com/assets/external/widget.js';
           document.head.appendChild(script);
       }

       modal.classList.add('active');
   }
   ```

4. **Ajouter le script Calendly** dans `index.html` :
   ```html
   <!-- Avant la fermeture de </body> -->
   <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
   ```

## 📅 Intégration Google Calendar

### Option 1: API Google Calendar

1. **Créer un projet Google Cloud** :
   - Aller sur [Google Cloud Console](https://console.cloud.google.com)
   - Créer un nouveau projet
   - Activer l'API Google Calendar

2. **Obtenir les clés API** :
   - Créer des identifiants (API Key + OAuth 2.0)
   - Configurer les domaines autorisés

3. **Code d'intégration** :
   ```javascript
   // Ajouter dans script.js
   function initGoogleCalendar() {
       gapi.load('client:auth2', () => {
           gapi.client.init({
               apiKey: 'VOTRE_API_KEY',
               clientId: 'VOTRE_CLIENT_ID',
               discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
               scope: 'https://www.googleapis.com/auth/calendar.readonly'
           });
       });
   }

   function createEvent(eventDetails) {
       const event = {
           'summary': 'Rendez-vous avec Prince Noukounwoui',
           'start': {
               'dateTime': eventDetails.startTime,
               'timeZone': 'Europe/Paris'
           },
           'end': {
               'dateTime': eventDetails.endTime,
               'timeZone': 'Europe/Paris'
           }
       };

       gapi.client.calendar.events.insert({
           'calendarId': 'primary',
           'resource': event
       }).then(response => {
           console.log('Événement créé:', response);
       });
   }
   ```

### Option 2: Calendrier public Google

1. **Créer un calendrier public** :
   - Dans Google Calendar, créer un nouveau calendrier
   - Le rendre public en lecture seule
   - Copier l'ID du calendrier

2. **Afficher le calendrier** :
   ```html
   <!-- Remplacer le contenu de .calendly-placeholder -->
   <iframe
       src="https://calendar.google.com/calendar/embed?src=VOTRE_CALENDAR_ID"
       style="border: 0"
       width="100%"
       height="400">
   </iframe>
   ```

## 💬 Intégration système de messagerie avancé

### Option 1: Intégration avec un service tiers

**Intercom** :
```html
<script>
  window.intercomSettings = {
    app_id: "VOTRE_APP_ID"
  };
</script>
<script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/VOTRE_APP_ID';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();</script>
```

**Crisp Chat** :
```html
<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="VOTRE_WEBSITE_ID";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>
```

### Option 2: WebSocket pour chat temps réel

```javascript
// Exemple basique WebSocket
const socket = new WebSocket('wss://votre-serveur.com/chat');

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    addMessageToChat(message);
};

function sendMessage(text) {
    socket.send(JSON.stringify({
        type: 'message',
        content: text,
        timestamp: new Date().toISOString()
    }));
}
```

## 📧 Intégration email direct

### Modifier le bouton LinkedIn pour ouvrir l'inbox :

```javascript
// Dans script.js, modifier populateContent()
const linkedinLink = document.getElementById('linkedin-contact');
linkedinLink.href = cvData.coordonnees.linkedin;
linkedinLink.onclick = function(e) {
    e.preventDefault();
    openInbox('linkedin');
    // Optionnel: ouvrir aussi LinkedIn dans un nouvel onglet
    window.open(cvData.coordonnees.linkedin, '_blank');
};
```

## 🔔 Notifications push

```javascript
// Demander permission pour les notifications
if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notifications autorisées');
        }
    });
}

// Envoyer une notification
function sendNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: '/path/to/icon.png'
        });
    }
}
```

## 🎯 Conseils d'utilisation

1. **Calendly** est la solution la plus simple pour commencer
2. **Google Calendar API** offre plus de contrôle mais demande plus de configuration
3. **Services de chat tiers** sont recommandés pour un chat temps réel professionnel
4. **Testez toujours** les intégrations sur différents appareils et navigateurs

## 🚀 Prochaines étapes

1. Choisir votre solution de calendrier
2. Configurer les clés API nécessaires
3. Tester l'intégration
4. Personnaliser selon vos besoins
5. Ajouter des analytics pour suivre les interactions

---

*Ce guide vous aidera à rendre votre portfolio encore plus interactif et professionnel !*