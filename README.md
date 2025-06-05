# Formulaire FNC - IXAPACK

Ce projet remplace la macro Outlook pour l'envoi des formulaires de non-conformité (FNC). Il propose une interface moderne réalisée avec React et un backend Node.js pour l'envoi des e‑mails. Une implémentation PHP de référence est également fournie.


## Fonctionnalités

- Interface React moderne (Vite + Boosted/Tailwind) et design responsive
- Collecte complète des données correspondant à tous les champs de la macro d'origine
- Validation côté client pour assurer la saisie correcte des données
- Envoi d'e‑mail via PHP ou via Node.js (nodemailer) avec prise en charge du SMTP Cloudron
- Paramétrage de l'adresse de réception via l'onglet "E‑mail"
- Pages "Statistiques" et "Rapports" avec export CSV
- Notifications de succès/erreur pour l'état de soumission du formulaire
- Sélection par bouton radio pour les options "Retouche" ou "Rebut"
- Tous les champs de données de la macro d'origine correctement implémentés

## Installation

1. Clonez le dépôt ou téléchargez les fichiers sur votre serveur
2. (Facultatif) importez `db.sql` dans MySQL si vous utilisez la version PHP
3. Installez les dépendances Node.js avec `npm install`

4. Pour une version de développement, lancez `npm run dev` puis `npm start`
5. Pour générer les fichiers de production, exécutez `npm run build`
6. Configurez les variables d'environnement Cloudron (`CLOUDRON_MYSQL_*` et `CLOUDRON_MAIL_*`)
7. Accédez à l'application via `http://localhost:5173` en développement

## Configuration requise

- Serveur web avec PHP 7.0 ou supérieur
- Node.js 18 ou supérieur
- Configuration mail() ou accès SMTP fonctionnel sur le serveur

## Utilisation

1. Remplissez le formulaire avec les informations requises
2. Sélectionnez "Retouche" ou "Rebut" selon le cas
3. Complétez les champs obligatoires (marqués d'un astérisque *)
4. Cliquez sur "Envoyer" pour soumettre le formulaire
5. Consultez la page "Statistiques" pour un aperçu des envois
6. Utilisez la page "Rapports" pour filtrer les données et exporter un CSV

## Déploiement en production (LAMP)

1. Clonez ou copiez le projet sur votre serveur LAMP.
2. Dans le dossier du projet, exécutez :

```bash
npm install
npm run build
```

   Les fichiers statiques générés dans `dist/` contiennent l'interface prête à déployer.
3. Copiez ce dossier `dist` dans `public_html` ou `www` de votre serveur Apache.
4. Configurez un VirtualHost pointant vers ce répertoire.
5. Ajoutez un fichier `.htaccess` afin de rediriger toutes les requêtes vers `index.php` :

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [L]
```

6. Lancez `node server.js` en tâche de fond (ou via pm2) si vous utilisez l'envoi d'e-mails via Node.

Votre formulaire sera alors accessible directement sur votre domaine.


Le formulaire enverra automatiquement un e-mail à l'adresse configurée via l'onglet "E‑mail".

## Variables d'environnement Cloudron

Le projet exploite les variables `CLOUDRON_MYSQL_*` et `CLOUDRON_MAIL_*` fournies par Cloudron. Elles permettent la connexion à MySQL côté PHP et la configuration SMTP pour le backend Node.js :

```
CLOUDRON_MYSQL_HOST
CLOUDRON_MYSQL_PORT
CLOUDRON_MYSQL_USERNAME
CLOUDRON_MYSQL_PASSWORD
CLOUDRON_MYSQL_DATABASE
CLOUDRON_MAIL_SMTP_SERVER
CLOUDRON_MAIL_SMTP_PORT
CLOUDRON_MAIL_SMTPS_PORT
CLOUDRON_MAIL_SMTP_USERNAME
CLOUDRON_MAIL_SMTP_PASSWORD
CLOUDRON_MAIL_FROM
```

Assurez-vous simplement que ces variables sont définies dans l'environnement (elles le sont automatiquement sur Cloudron).
