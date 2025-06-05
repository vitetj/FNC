<?php
$host = getenv('CLOUDRON_MYSQL_HOST') ?: getenv('MYSQL_HOST') ?: 'localhost';
$port = getenv('CLOUDRON_MYSQL_PORT') ?: getenv('MYSQL_PORT') ?: '3306';
$database = getenv('CLOUDRON_MYSQL_DATABASE') ?: getenv('MYSQL_DATABASE') ?: 'fnc_db';
$user = getenv('CLOUDRON_MYSQL_USERNAME') ?: getenv('MYSQL_USERNAME') ?: 'root';
$password = getenv('CLOUDRON_MYSQL_PASSWORD') ?: getenv('MYSQL_PASSWORD') ?: '';

$dsn = "mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $password, $options);
} catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}
?>
