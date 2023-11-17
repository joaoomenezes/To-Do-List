<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bdorganizador";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $taskName = $_POST["taskName"];

    $stmt = $conn->prepare("INSERT INTO tasks (task_name) VALUES (?)");
    $stmt->bind_param("s", $taskName);

    if ($stmt->execute()) {
        echo "Tarefa adicionada com sucesso!";
    } else {
        echo "Erro ao adicionar tarefa: " . $stmt->error;
    }
    $stmt->close();
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $tasks = [];
    $result = $conn->query("SELECT * FROM tasks");

    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }

    echo json_encode($tasks);
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE" && isset($_GET["id"])) {
    $taskId = $_GET["id"];

    $stmt = $conn->prepare("DELETE FROM tasks WHERE id=?");
    $stmt->bind_param("i", $taskId);

    if ($stmt->execute()) {
        echo "Tarefa excluída com sucesso!";
    } else {
        echo "Erro ao excluir tarefa: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>
