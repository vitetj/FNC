<?php
// Initialize variables to store form data and error messages
$formSubmitted = false;
$errorMessage = '';
$successMessage = '';

// Include database configuration
require_once __DIR__ . '/config.php';

// Configure SMTP server
ini_set('SMTP', 'ixapack.mail.protection.outlook.com');
ini_set('smtp_port', '25');

// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $typeAction = isset($_POST['typeAction']) ? $_POST['typeAction'] : '';
    $of = isset($_POST['of']) ? $_POST['of'] : '';
    $origine = isset($_POST['origine']) ? $_POST['origine'] : '';
    $numeroDossier = isset($_POST['numeroDossier']) ? $_POST['numeroDossier'] : '';
    $referencePieces = isset($_POST['referencePieces']) ? $_POST['referencePieces'] : '';
    $quantiteLancees = isset($_POST['quantiteLancees']) ? $_POST['quantiteLancees'] : '';
    $quantiteRebutees = isset($_POST['quantiteRebutees']) ? $_POST['quantiteRebutees'] : '';
    $quantiteRetouchees = isset($_POST['quantiteRetouchees']) ? $_POST['quantiteRetouchees'] : '';
    $numeroFNC = isset($_POST['numeroFNC']) ? $_POST['numeroFNC'] : '';
    $erreurService = isset($_POST['erreurService']) ? $_POST['erreurService'] : '';
    $cause = isset($_POST['cause']) ? $_POST['cause'] : '';
    $retouche = isset($_POST['retouche']) ? $_POST['retouche'] : '';
    $phase = isset($_POST['phase']) ? $_POST['phase'] : '';
    $temps = isset($_POST['temps']) ? $_POST['temps'] : '';
    
    // Validate required fields
    if (empty($typeAction) || empty($of) || empty($numeroDossier) || empty($numeroFNC)) {
        $errorMessage = 'Veuillez remplir tous les champs obligatoires.';
    } else {
        // Set email subject
        $subject = "$typeAction : $numeroFNC Numéro de FNC : $numeroFNC Numéro du dossier : $numeroDossier";
        
        // Set email recipient
        $to = "christelle.bertrand@ixapack.com, informatique@ixapack.com";
        
        // Create email body in HTML format
        $message = "
        <html>
        <head>
            <title>$subject</title>
        </head>
        <body>
            <p><strong>$typeAction</strong></p>
            <p><strong>OF :</strong> $of</p>
            <p><strong>Origine :</strong> $origine</p>
            <p><strong>Numéro du dossier :</strong> $numeroDossier</p>
            <p><strong>Référence pièces :</strong> $referencePieces</p>
            <p><strong>Quantité lancées :</strong> $quantiteLancees</p>
            <p><strong>Quantité rebutées :</strong> $quantiteRebutees</p>
            <p><strong>Quantité retouchées :</strong> $quantiteRetouchees</p>
            <p><strong>Numéro de FNC :</strong> $numeroFNC</p>
            <p><strong>Erreur Service :</strong> $erreurService</p>
            <p><strong>Cause :</strong> $cause</p>
            <p><strong>Retouche :</strong> $retouche</p>
            <p><strong>Phase :</strong> $phase</p>
            <p><strong>Temps :</strong> $temps</p>
        </body>
        </html>
        ";
        
        // Insert form data into the database
        try {
            $stmt = $pdo->prepare("INSERT INTO fnc_forms (type_action, of, origine, numero_dossier, reference_pieces, quantite_lancees, quantite_rebutees, quantite_retouchees, numero_fnc, erreur_service, cause, retouche, phase, temps) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $typeAction,
                $of,
                $origine,
                $numeroDossier,
                $referencePieces,
                $quantiteLancees ?: null,
                $quantiteRebutees ?: null,
                $quantiteRetouchees ?: null,
                $numeroFNC,
                $erreurService,
                $cause,
                $retouche,
                $phase,
                $temps ?: null
            ]);

            // Set content-type header for sending HTML email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
              $headers .= "From: christelle.bertrand@ixapack.com" . "\r\n";

            if (mail($to, $subject, $message, $headers)) {
                $successMessage = "Formulaire envoyé avec succès à $to.";
                $formSubmitted = true;
            } else {
                $errorMessage = "Une erreur est survenue lors de l'envoi du formulaire.";
            }
        } catch (PDOException $e) {
            $errorMessage = 'Erreur base de données : ' . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire FNC - IXAPACK</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <style>
        .form-appear {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .input-focus:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
            transition: all 0.2s ease;
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 py-10">
        <!-- Header -->
        <header class="mb-8">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl font-bold text-blue-800">Formulaire FNC</h1>
                <div class="text-right">
                    <p class="text-sm text-gray-600">IXAPACK</p>
                </div>
            </div>
            <div class="h-1 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full"></div>
        </header>

        <?php if ($formSubmitted && !empty($successMessage)): ?>
        <!-- Success Message -->
        <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded form-appear" role="alert">
            <p class="font-medium">Succès!</p>
            <p><?php echo $successMessage; ?></p>
            <button class="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-200" onclick="window.location.href='index.php'">Nouveau formulaire</button>
        </div>
        <?php else: ?>
        <!-- Form -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-8 form-appear">
            <?php if (!empty($errorMessage)): ?>
                <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p class="font-medium">Erreur!</p>
                    <p><?php echo $errorMessage; ?></p>
                </div>
            <?php endif; ?>

            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" x-data="{ typeAction: 'Retouche' }">
                <!-- Type d'action (Retouche ou Rebut) -->
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Type d'action *</label>
                    <div class="flex space-x-4">
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio text-blue-600" name="typeAction" value="Retouche" x-model="typeAction" checked>
                            <span class="ml-2">Retouche</span>
                        </label>
                        <label class="inline-flex items-center">
                            <input type="radio" class="form-radio text-blue-600" name="typeAction" value="Rebut" x-model="typeAction">
                            <span class="ml-2">Rebut</span>
                        </label>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- OF -->
                    <div>
                        <label for="of" class="block text-gray-700 font-semibold mb-2">OF *</label>
                        <input type="text" id="of" name="of" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    
                    <!-- Origine -->
                    <div>
                        <label for="origine" class="block text-gray-700 font-semibold mb-2">Origine</label>
                        <input type="text" id="origine" name="origine" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <!-- Numéro du dossier -->
                    <div>
                        <label for="numeroDossier" class="block text-gray-700 font-semibold mb-2">Numéro du dossier *</label>
                        <input type="text" id="numeroDossier" name="numeroDossier" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    
                    <!-- Référence pièces -->
                    <div>
                        <label for="referencePieces" class="block text-gray-700 font-semibold mb-2">Référence pièces</label>
                        <input type="text" id="referencePieces" name="referencePieces" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <!-- Quantité lancées -->
                    <div>
                        <label for="quantiteLancees" class="block text-gray-700 font-semibold mb-2">Quantité lancées</label>
                        <input type="number" id="quantiteLancees" name="quantiteLancees" min="0" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <!-- Quantité rebutées -->
                    <div>
                        <label for="quantiteRebutees" class="block text-gray-700 font-semibold mb-2">Quantité rebutées</label>
                        <input type="number" id="quantiteRebutees" name="quantiteRebutees" min="0" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <!-- Quantité retouchées -->
                    <div>
                        <label for="quantiteRetouchees" class="block text-gray-700 font-semibold mb-2">Quantité retouchées</label>
                        <input type="number" id="quantiteRetouchees" name="quantiteRetouchees" min="0" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <!-- Numéro de FNC -->
                    <div>
                        <label for="numeroFNC" class="block text-gray-700 font-semibold mb-2">Numéro de FNC *</label>
                        <input type="text" id="numeroFNC" name="numeroFNC" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    </div>
                    
                    <!-- Erreur Service -->
                    <div>
                        <label for="erreurService" class="block text-gray-700 font-semibold mb-2">Erreur Service</label>
                        <input type="text" id="erreurService" name="erreurService" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <!-- Cause -->
                <div class="mt-6">
                    <label for="cause" class="block text-gray-700 font-semibold mb-2">Cause</label>
                    <textarea id="cause" name="cause" rows="3" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <div x-show="typeAction === 'Retouche'" class="mt-6 space-y-6 border-t pt-6 form-appear">
                    <h3 class="text-lg font-semibold text-gray-800">Informations de retouche</h3>
                    
                    <!-- Retouche -->
                    <div>
                        <label for="retouche" class="block text-gray-700 font-semibold mb-2">Retouche</label>
                        <textarea id="retouche" name="retouche" rows="3" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Phase -->
                        <div>
                            <label for="phase" class="block text-gray-700 font-semibold mb-2">Phase</label>
                            <input type="text" id="phase" name="phase" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        
                        <!-- Temps -->
                        <div>
                            <label for="temps" class="block text-gray-700 font-semibold mb-2">Temps (minutes)</label>
                            <input type="number" id="temps" name="temps" min="0" class="w-full px-4 py-2 border rounded-md input-focus focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                </div>

                <div class="mt-8 flex justify-between items-center">
                    <p class="text-sm text-gray-600">* Champs obligatoires</p>
                    <div class="space-x-4">
                        <button type="reset" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200">Réinitialiser</button>
                        <button type="submit" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">Envoyer</button>
                    </div>
                </div>
            </form>
        </div>
        <?php endif; ?>

        <!-- Footer -->
        <footer class="text-center text-gray-500 text-sm">
            <p>&copy; <?php echo date("Y"); ?> IXAPACK - Tous droits réservés</p>
        </footer>
    </div>
</body>
</html>