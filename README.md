# Formulaire FNC - IXAPACK

Ce formulaire web remplace la macro Outlook pour l'envoi des formulaires de non-conformité (FNC) directement à l'adresse fnc@ixapack.com.


## Fonctionnalités

- Interface de formulaire professionnelle avec design responsive
- Collecte complète des données correspondant à tous les champs de la macro d'origine
- Validation côté client pour assurer la saisie correcte des données
- Fonctionnalité d'envoi d'e-mail PHP avec formatage approprié
- Notifications de succès/erreur pour l'état de soumission du formulaire
- Sélection par bouton radio pour les options "Retouche" ou "Rebut"
- Tous les champs de données de la macro d'origine correctement implémentés

## Installation

1. Téléchargez les fichiers sur votre serveur web PHP
2. Importez le fichier `db.sql` dans votre base de données MySQL (via phpMyAdmin par exemple)
3. Assurez-vous que la fonction mail() de PHP est correctement configurée sur votre serveur
4. Configurez les variables d'environnement de LAMP (Cloudron renseigne automatiquement `CLOUDRON_MYSQL_*`)
5. Accédez au formulaire via votre navigateur web

## Configuration requise

- Serveur web avec PHP 7.0 ou supérieur
- Configuration mail() fonctionnelle sur le serveur

## Utilisation

1. Remplissez le formulaire avec les informations requises
2. Sélectionnez "Retouche" ou "Rebut" selon le cas
3. Complétez les champs obligatoires (marqués d'un astérisque *)
4. Cliquez sur "Envoyer" pour soumettre le formulaire

Le formulaire enverra automatiquement un e-mail à fnc@ixapack.com avec toutes les informations saisies.

## Variables d'environnement Cloudron

L'application exploite les variables `CLOUDRON_MYSQL_*` fournies par Cloudron pour se connecter à la base de données MySQL. Aucun paramètre supplémentaire n'est nécessaire :

```
CLOUDRON_MYSQL_HOST
CLOUDRON_MYSQL_PORT
CLOUDRON_MYSQL_USERNAME
CLOUDRON_MYSQL_PASSWORD
CLOUDRON_MYSQL_DATABASE
```

Assurez-vous simplement que ces variables sont définies dans l'environnement (elles le sont automatiquement sur Cloudron).
