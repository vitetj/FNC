<?php
$config = require __DIR__ . '/db_config.php';

$dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $config['user'], $config['password'], $options);
} catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}
?>


